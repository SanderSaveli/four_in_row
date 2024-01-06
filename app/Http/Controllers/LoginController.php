<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class LoginController extends Controller
{
    function goLogin(){
        return view('login');
    }
    function Login(Request $request){
        try{
            $credentials = $request->validate([
                'username' => 'required',
                'password' => 'required',
            ]);
            $username = $credentials['username'];
            $password = $credentials['password'];

            $user = User::where('Username', $username)->first();

            if ($user) {
                if (Hash::check($password . $user->Salt, $user->PasswordHash)) {
                    Auth::login($user);
                    return redirect('/profile');
                } else {
                    return redirect('/login')->with('error', 'Invalid password');
                }
            } else {
                // Пользователь не найден
                return redirect('/login')->with('error', 'User not found');
            }
        } catch (\Exception $e) {
            return redirect('/login')->with('error', $e->getMessage());
        }
    }
}
