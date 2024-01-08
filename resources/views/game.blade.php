@extends('layouts.app')

@section('title') 
Game
@endsection 

@section('content')
<div id="user-id" data-user-id="{{ session('userId') }}"></div>
<h1>Four in a row</h1>
<div class="content-row flexUp">
    <div class="content-column">
        <img src="img/images/user.png" alt="IMG" class="gameAvatar">
        <p class="player-name" id="name1">{{ $player1Name }}</p>
    </div>
    <canvas class="fieldCanvas" id="fieldCanvas" width="400" height="400">
        Sorry your browser does not support this element!
    </canvas>
    <div class="content-column">
        <img src="img/images/user.png" alt="IMG" class="gameAvatar">
        <p class="player-name" id="name2">{{ $player2Name }}</p>
    </div>
</div>
<div class="popup-container" id="popup-container">

</div>

<script src="{{ mix('js/game.js') }}"></script>
@endsection