<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TurnManager;

class Bot extends Model
{
    use HasFactory;
    private $turnManager;

    function __construct()
    {
        $this->turnManager = new TurnManager();
    } 
    public function MakeAIMove($data){
        $data = json_decode(json_encode($data));
        $board = $data->board;
        $player = $data->player;
        $pos = $this->make_AIMove($board, $player);
        if($this->turnManager->isWinningPosition($pos)){
            return $this->generateAIAnswer("PlayerWin", $pos, $player);
        }
        return $this->generateAIAnswer("TurnComplete", $pos, $player);
    }

    private function make_AIMove($board, $player){
        $maxEval = -INF;
        $bestPos = 0;
        foreach($this->turnManager->getAllMoves($board, $player) as $position){
            $eval =$this->minimax($position, 3, $player, true);
            if($eval> $maxEval){
                $bestPos = $position;
                $maxEval = $eval;
            }
        }
        return $bestPos;
    }

    private function generateAiAnswer($type, $board, $player){
        return [
            'type'=> $type,
            'field' => $board,
            'evaluate' => $this->evaluatePosition($board, $player),
        ];
    }

    private function minimax($board, $dept, $isMaximizing, $player){
        if($dept ==0 || $this->turnManager->isWinningPosition($board, $player)){
            return $this->evaluatePosition($board, $player);
        }

        if($isMaximizing){
            $maxEval= -INF;
            foreach($this->turnManager->getAllMoves($board, $player) as $position){
                $eval =$this->minimax($position, $dept-1, false, $player);
                $maxEval= max($maxEval, $eval);
            }
            return $maxEval;
        }
        else{
            $minEval= INF;
            foreach($this->turnManager->getAllMoves($board, 'Player2') as $position){
                $eval =$this->minimax($position, $dept-1, true, $player);
                $minEval= min($minEval, $eval);
            }
            return $minEval;
        }
    }

        private function evaluatePosition($board, $player) {
        $opponent = ($player === 'Player1') ? 'Player2' : 'Player1';
        $playerScore = 0;
        $opponentScore= 0;

        $playerCount = $this->turnManager->countAllDir($board, $player);
        $playerScore += isset($playerCount[2])? $playerCount[2] *10 :0;
        $playerScore += isset($playerCount[3])? $playerCount[3] *100 :0;
        $playerScore += isset($playerCount[4])? $playerCount[4] *1000 :0;

        $opponentCount = $this->turnManager->countAllDir($board, $opponent);
        $opponentScore += isset($opponentCount[2])? $opponentCount[2] *10 :0;
        $opponentScore += isset($opponentCount[3])? $opponentCount[3] *120 :0;
        $opponentScore += isset($opponentCount[4])? $opponentCount[4] *1500 :0;

        return  ($playerScore - $opponentScore);
    }
}
