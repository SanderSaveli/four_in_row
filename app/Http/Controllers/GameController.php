<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Game;
class GameController extends Controller
{
    function goGame(){
        $user = Auth::user();

        if($user){
            $userModel = User::find($user->UserID);
            return view('game',['player1Name' => $user->Username, 'player2Name' => "Bot"]);
        }
         else{
            return view('game',['player1Name' => "Player", 'player2Name' => "Bot"]);
        }
    }
}
