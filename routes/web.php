<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', 'App\Http\Controllers\HomeController@goHome')->name("homePage");
Route::get('/game', 'App\Http\Controllers\GameController@goGame')->name("gamePage");
Route::get('/login', 'App\Http\Controllers\LoginController@goLogin')->name("loginPage");
Route::get('/register', 'App\Http\Controllers\RegisterController@goRegister')->name("registerPage");
Route::get('/profile', 'App\Http\Controllers\ProfileController@goProfile')->name("profilePage");
Route::post('/login', 'App\Http\Controllers\LoginController@Login')->name("login");
Route::post('/register', 'App\Http\Controllers\RegisterController@Register')->name("register");
Route::post('/makeMove', 'App\Http\Controllers\TurnController@makeMove');
Route::post('/makeAIMove', 'App\Http\Controllers\TurnController@makeAIMove');
Route::get('/get-user-id', function () {
    return response()->json(['userId' => auth()->id()]);
});
Route::post('/logout', 'App\Http\Controllers\Auth\LoginController@logout')->name('logout');
