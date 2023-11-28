<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TurnManager extends Model
{
    use HasFactory;

    public function MakeMove($data)
    {
        $circle = $data['move']['circle'];
        if($circle['owner'] == "None" && $data['field'][$circle['x']][$circle['y']]['owner']!="None"){
            $changedField = $data['field'][$circle['x']][$circle['y']];
            $changedField['owner'] = $data['move']['actor'];
        }
        $changedField = $circle;
        $changedField['owner'] = $data['move']['actor'];
        return $changedField;
    }
}
