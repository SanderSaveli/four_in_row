<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TurnManager extends Model
{
    use HasFactory;

    public function MakeMove($data)
    {
        if (is_array($data) && !empty($data)) {
            return  count($data);
        }
        return 0; 
    }
}
