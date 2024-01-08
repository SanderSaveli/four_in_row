<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Game;
use Illuminate\Support\Facades\Auth;
use App\Models\Board;
class TurnManager extends Model
{
    use HasFactory;

    public function MakeMove($data){
        $data = json_decode(json_encode($data));
        $circle = $data->move->circle;
        $field = $data->field;
        $board = new Board();
        $movesNumber = $data->movesNumber;
        $playerID = $data->playerID;
        if($field[$circle->x][$circle->y]->owner=="None" && $board->isCellBelowOccupied($field, $circle->x, $circle->y)){
            $field[$circle->x][$circle->y]->owner = $data->move->actor;
            $movesNumber++;
            if($board->isWinningPosition($field)){
                $this->saveGame($movesNumber, $playerID);
                return $this->generateAnswer("PlayerWin", $field, $movesNumber);
            }
            return $this->generateAnswer("TurnComplete", $field, $movesNumber);
        }
        return $this->generateAnswer("TurnComplete", $field, $movesNumber);
    }

    private function generateAnswer($type, $board, $movesNumber){
        return [
            'type'=> $type,
            'movesNumber' => $movesNumber,
            'field' => $board,
            'evaluate' => "no eval" //$this->evaluatePosition($board, $player)
        ];
    }
    function saveGame($movesNumber, $winnerId) {
        $user = Auth::user();
        $finishedGame = new Game([
            'MovesNumber' => $movesNumber,
            'Player1ID' => $user->UserID,
            'Player2ID' => 1,
            'WinnerID' => $winnerId
        ]);

        $finishedGame->save();
    }
}
