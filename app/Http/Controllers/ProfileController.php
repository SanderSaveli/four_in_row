<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Game;
class ProfileController extends Controller
{
    function goProfile(){
        $user = Auth::user();

        if($user){
            $userModel = User::find($user->UserID);
            $winPercentage = $userModel->getWinPercentage();
            $gamePlayed = $userModel->wonGames()->count();
            $games = Game::where('Player1ID', $user->UserID)
            ->orWhere('Player2ID',$user->UserID)
            ->get();
            return view('profile',['username' => $user->Username, 'rating'=> $user->rating,"gamesPlayed" => $gamePlayed, "winPercentage" => $winPercentage, 'games' => $games, 'userId' => $user->UserID]);
        }
         else{
            return view('login');
        }
    }
}
