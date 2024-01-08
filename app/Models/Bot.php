<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TurnManager;
use App\Models\Board;

class Bot extends Model
{
    use HasFactory;
    private $turnManager;
    private $board;
    private $myWinNum = 0;
    private $enemyWinNum = 0;

    function __construct()
    {
        $this->turnManager = new TurnManager();
        $this->board = new Board();
    } 
    public function MakeAIMove($data){
        $data = json_decode(json_encode($data));
        $board = $data->board;
        $player = $data->player;
        $movesNumber = $data->movesNumber;
        $pos = $this->getBestMove($board, $player);
        $data->movesNumber++;
        if($this->board->isWinningPosition($pos)){
           $this->turnManager->saveGame($data->movesNumber, 1);
            return $this->generateAIAnswer("PlayerWin", $pos, $player, $movesNumber);
        }
        return $this->generateAIAnswer("TurnComplete", $pos, $player, $movesNumber);
    }

    private function getBestMove($board, $player){
        $maxEval = -INF;
        $bestPos = 0;
        foreach($this->board->getAllMoves($board, $player) as $position){
            $eval =$this->minimax($position, 3, $player, true);
            if($eval> $maxEval){
                $bestPos = $position;
                $maxEval = $eval;
            }
        }
        return $bestPos;
    }

    private function generateAiAnswer($type, $board, $player, $movesNumber){
        return [
            'type'=> $type,
            'field' => $board,
            'evaluate' => $this->evaluatePosition($board, $player),
            'MyWin' => $this->myWinNum, 
            'EnemyWin' => $this->enemyWinNum, 
            'movesNumber' => $movesNumber
        ];
    }

    private function minimax($board, $dept, $isMaximizing, $player){
        if($this->board->isWinningPosition($board)){
            if($isMaximizing){
                return -100000;
            }
            else{
                return 100000;
            }
        }
        if($dept === 0){
            return $this->evaluatePosition($board, $player);
        }
        $opponent = ($player === 'Player1') ? 'Player2' : 'Player1';
        if($isMaximizing){
            $maxEval= -INF;
            foreach($this->board->getAllMoves($board, $player) as $position){
                $eval =$this->minimax($position, $dept-1, false, $player);
                $maxEval= max($maxEval, $eval);
            }
            return $maxEval;
        }
        else{
            $minEval= INF;
            foreach($this->board->getAllMoves($board, $opponent) as $position){
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

        $playerCount = $this->board->countAllDir($board, $player);
        $playerScore += isset($playerCount[2])? $playerCount[2] *10 :0;
        $playerScore += isset($playerCount[3])? $playerCount[3] *100 :0;
        $playerScore += isset($playerCount[4])? $playerCount[4] *1000 :0;

        $opponentCount = $this->board->countAllDir($board, $opponent);
        $opponentScore += isset($opponentCount[2])? $opponentCount[2] *10 :0;
        $opponentScore += isset($opponentCount[3])? $opponentCount[3] *120 :0;
        $opponentScore += isset($opponentCount[4])? $opponentCount[4] *1500 :0;

        return  ($playerScore - $opponentScore);
    }
}
