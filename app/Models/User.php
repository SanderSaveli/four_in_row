<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $table = 'users';
    public $timestamps = true;
    protected $primaryKey = 'UserID';
    protected $fillable = [
        'Username',
        'Email',
        'PasswordHash',
        'Salt',
    ];

    protected $hidden = [
        'PasswordHash',
        'Salt',
    ];

    public function games()
    {
        return Game::where('Player1ID', $this->UserID)->orWhere('Player2ID', $this->UserID);
    }

    public function wonGames()
    {
        return Game::where('WinnerID', $this->UserID);
    }

    public function getWinPercentage()
    {
        $totalGames = $this->games()->count();
        $wonGames = $this->wonGames()->count();

        return ($totalGames > 0) ? ($wonGames/$totalGames)*100 : 0;
    }
}
