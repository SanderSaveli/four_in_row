<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;
    protected $primaryKey = 'SessionID';
    public $timestamps = false;

    protected $fillable = [
        'PlayerID',
        'StartTime',
        'EndTime',
        'GamesPlayed',
    ];

    public function player()
    {
        return $this->belongsTo(User::class, 'PlayerID');
    }
}
