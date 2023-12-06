<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TurnManager extends Model
{
    use HasFactory;

    public function MakeMove($data){
        $data = json_decode(json_encode($data));
        $circle = $data->move->circle;
        $field = $data->field;
        if($field[$circle->x][$circle->y]->owner=="None" && $this->isCellBelowOccupied($field, $circle->x, $circle->y)){
            $field[$circle->x][$circle->y]->owner = $data->move->actor;
            if($this->isWinningPosition($field)){
                return $this->generateAnswer("PlayerWin", $field);
            }
            return $this->generateAnswer("TurnComplete", $field);
        }
        return $this->generateAnswer("TurnComplete", $field);
    }

    private function generateAnswer($type, $board){
        return [
            'type'=> $type,
            'field' =>$board,
            'evaluate' => "no eval" //$this->evaluatePosition($board, $player)
        ];
    }

    public function countAllDir($board, $player) {
        $vertical = $this->countVertical($board, $player);
        $horizontal = $this->countHorizontal($board, $player);
        $diagonal = $this->countDiagonal($board, $player);
        return $this->sumArraysByIndex([$vertical, $horizontal, $diagonal]);
    }
    
    public function countVertical($board, $player) {
        $countArray = []; 

        for ($x = 0; $x < 7; $x++) {
            $count = 0;
            $isOpen = false;
            for ($y = 0; $y < 6; $y++) {
                if($y>0){
                    if ($board[$x][$y-1]->owner === "None") {
                        $isOpen = true;
                    }
                }
                if ($board[$x][$y]->owner == $player) {
                    $count++;
                }
                else if($board[$x][$y]->owner != "None"){
                    if($isOpen|| $count> 3){
                        $this->increaseArray($countArray, $count);
                    }
                    $count =0;
                }
                else{
                    $isOpen = true;
                    break;
                }
            }
            if($isOpen|| $count> 3){
                $this->increaseArray($countArray, $count);
            }
        }

        return $countArray;
    }
    public function countHorizontal($board, $player) {
        $countArray = []; 
        $isOpen = false;
        for ($y = 0; $y < 6; $y++) {
            $count = 0; 
            for ($x = 0; $x < 7; $x++) {
                if($x>0){
                    if ($board[$x-1][$y]->owner === "None") {
                        $isOpen = true;
                    }
                }
                if ($board[$x][$y]->owner == $player) {
                    $count++;
                }
                else if($board[$x][$y]->owner != "None"){
                    if($isOpen || $count> 3){
                        $this->increaseArray($countArray,$count);
                    }
                    $count = 0; 
                }
                else{
                    $isOpen = true;
                }
            }
            if($isOpen|| $count> 3){
                $this->increaseArray($countArray,$count);
            }
        }

        return $countArray;
    }
    public function countDiagonal($board, $player) {
        $countArray = []; 
        $isOpen= false;
        for ($x = 0; $x < 7; $x++) {
            for ($y = 0; $y < 6; $y++) {
                if($board[$x][$y]->owner != $player){
                    continue;
                }
                if($x>0 && $y>0){
                    if ($board[$x-1][$y-1]->owner === $player) {
                        continue;
                    }
                    else if($board[$x-1][$y-1]->owner === "None"){
                        $isOpen= true;
                    }
                }
                $count = 0; 
                for($i =0; $i+$y < 6 && $i+$x < 7; $i++){
                    if ($board[$x + $i][$y + $i]->owner === $player) {
                        $count++;
                    }
                    else if($board[$x + $i][$y + $i]->owner != "None"){
                        if($isOpen|| $count> 3){
                            $this->increaseArray($countArray,$count);
                        }
                        $count = 0; 
                        break;
                    }
                    else{
                        $isOpen = true;
                    }
                }
                if($isOpen|| $count> 3){
                    $this->increaseArray($countArray,$count);
                }
            }
        }
        $isOpen= false;
        for ($x = 0; $x <7; $x++) {
            for ($y = 5; $y >= 0; $y--) {
                if($board[$x][$y]->owner != $player){
                    continue;
                }
                if($x > 0 && $y<5){
                    if ($board[$x-1][$y+1]->owner === $player) {
                        continue;
                    }
                    if ($board[$x-1][$y+1]->owner === "None") {
                        $isOpen = true;
                    }
                }
                $count = 0; 
                for($i =0; $y-$i >= 0 && $x+$i < 7; $i++){
                    if ($board[$x + $i][$y - $i]->owner === $player) {
                        $count++;
                    }
                    else if($board[$x + $i][$y - $i]->owner != "None"){
                        if($isOpen|| $count> 3){
                            $this->increaseArray($countArray,$count);
                        }
                        $count = 0; 
                        break;
                    }
                    else{
                        $isOpen = true;
                    }
                }
                if($isOpen|| $count> 3){
                    $this->increaseArray($countArray,$count);
                }
            }
        }

        return $countArray;
    }

    public function getAllMoves($board, $player){
        $positions = [];
        for($x = 0; $x<7; $x++){
            for($y =0; $y <6; $y++){
                if($board[$x][$y]->owner === "None"){
                    $newPos = $this->deepCopy($board);
                    $newPos[$x][$y]->owner = $player;
                    $positions[] = $newPos;
                    break;
                }
            }
        }
        return $positions;
    }

    public function deepCopy($originalArray) {
        return unserialize(serialize($originalArray));
    }


    public function isCellBelowOccupied($board, $x, $y) {
        if ($y === 0) {
            return true;
        }

        return $board[$x][$y-1]->owner !== 'None' && $board[$x][$y]->owner === 'None';
    }

    public function isWinningPosition($board) {

        $rowsP1 = $this->countAllDir($board, "Player1");
        $rowsP2 = $this->countAllDir($board, "Player2");
        if(isset($rowsP1[4])){
            return true;
        }
        if(isset($rowsP2[4])){
            return true;
        }

        return false;
    }
    function sumArraysByIndex($arrays) {
        $result = [];

        foreach ($arrays as $array) {
            foreach ($array as $index => $value) {
                if (!isset($result[$index])) {
                    $result[$index] = 0;
                }

                $result[$index] += $value;
            }
        }

        return $result;
    } 

    function increaseArray(&$array, $count) {
        if ($count > 1) {
            $ind = $count <= 4 ? $count : 4;
            $array[$ind] = isset($array[$ind]) ? $array[$ind] + 1 : 1;
        }
    }
}
