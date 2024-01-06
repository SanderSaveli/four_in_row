<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $primaryKey = 'GameID';
    public $timestamps = false;

    protected $fillable = [
        'MovesNumber',
        'StartTime',
        'EndTime',
        'WinnerID',
        'Player1ID',
        'Player2ID',
    ];

    public function winner()
    {
        return $this->belongsTo(User::class, 'WinnerID');
    }

    public function player1()
    {
        return $this->belongsTo(User::class, 'Player1ID');
    }

    public function player2()
    {
        return $this->belongsTo(User::class, 'Player2ID');
    }
}
