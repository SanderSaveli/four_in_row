<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TurnManager extends Model
{
    use HasFactory;

    public function MakeMove($data)
    {
        $data = json_decode(json_encode($data));
        $circle = $data->move->circle;
        if($circle->owner == "None" && $data->field[$circle->x][$circle->y]->owner!="None"){
            $changedField = $data->field[$circle->x][$circle->y];
            $changedField->owner = $data->move->actor;
        }
        $changedField = $circle;
        $changedField->owner = $data->move->actor;
        if($this->checkWin( $data->field, $circle)){
            return $this->generateAnswer($changedField, "PlayerWin");
        }
        return $this->generateAnswer($changedField, "TurnComplete");
    }


    private function generateAnswer($changedCell, $type){
        return [
            'type'=> $type,
            'cell' =>$changedCell,
        ];
    }

    private function checkWin($field, $cell) {
        $x= $cell->x;
        $y= $cell->y;
        $owner= $cell->owner;
        $rowCount = count($field);
        $colCount = count($field[0]);

        // Проверка по горизонтали
        $horizontalCount = 1;
        for ($i = $x - 1; $i >= 0 && $field[$i][$y]->owner === $owner; $i--) {
            $horizontalCount++;
        }
        for ($i = $x + 1; $i < $rowCount && $field[$i][$y]->owner === $owner; $i++) {
            $horizontalCount++;
        }

        // Проверка по вертикали
        $verticalCount = 1;
        for ($j = $y - 1; $j >= 0 && $field[$x][$j]->owner === $owner; $j--) {
            $verticalCount++;
        }
        for ($j = $y + 1; $j < $colCount && $field[$x][$j]->owner === $owner; $j++) {
            $verticalCount++;
        }

        // Проверка по диагонали (сначала наискосок вверх-влево, затем вниз-вправо)
        $diagCount1 = 1;
        for ($i = $x - 1, $j = $y - 1; $i >= 0 && $j >= 0 && $field[$i][$j]->owner === $owner; $i--, $j--) {
            $diagCount1++;
        }
        for ($i = $x + 1, $j = $y + 1; $i < $rowCount && $j < $colCount && $field[$i][$j]->owner === $owner; $i++, $j++) {
            $diagCount1++;
        }

        // Проверка по диагонали (сначала наискосок вниз-влево, затем вверх-вправо)
        $diagCount2 = 1;
        for ($i = $x + 1, $j = $y - 1; $i < $rowCount && $j >= 0 && $field[$i][$j]->owner === $owner; $i++, $j--) {
            $diagCount2++;
        }
        for ($i = $x - 1, $j = $y + 1; $i >= 0 && $j < $colCount && $field[$i][$j]->owner === $owner; $i--, $j++) {
            $diagCount2++;
        }

        // Проверка на выигрыш
        if ($horizontalCount >= 4 || $verticalCount >= 4 || $diagCount1 >= 4 || $diagCount2 >= 4) {
            return true; // Игрок выиграл
        }

        return false; 
    }

}
