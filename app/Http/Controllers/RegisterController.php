<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    function goRegister(){
        return view('register');
    }
    function Register(Request $request){
        try{
            $validatedData = $request->validate([
                'username' => 'required|unique:users|min:3|max:255',
                'email' => 'required|email|unique:users|max:255',
                'password' => 'required|min:6',
            ]);
            $password = $validatedData['password'];
            $salt = uniqid(); 
            $hashedPassword = Hash::make($password . $salt);

            $user = User::create([
                'Username' => $validatedData['username'],
                'Email' => $validatedData['email'],
                'PasswordHash' => $hashedPassword,
                'Salt' => $salt,
            ]);

            if ($user) {
                Auth::login($user);
                return redirect('/profile')->with('success', 'Registration successful. Please log in.');
            } else {
                return back()->with('error', 'Registration failed. Please try again.');
            }
        } catch (\Exception $e) {
            return redirect('/register')->with('error', $e->getMessage());
        }
    }
}
