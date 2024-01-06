@extends('layouts.app')

@section('title') 
Game
@endsection 

@section('content')
<div id="user-id" data-user-id="{{ session('userId') }}"></div>
<h1>Four in a row</h1>
<div class="content-row flexUp">
    <div class="content-column">
        <img src="" alt="IMG">
        <p class="player-name" id="name1">Player1</p>
    </div>
    <canvas class="fieldCanvas" id="fieldCanvas" width="400" height="400">
        Sorry your browser does not support this element!
    </canvas>
    <div class="content-column">
        <img src="" alt="IMG">
        <p class="player-name" id="name2">Player2</p>
    </div>
</div>
<div class="popup-container" id="popup-container">

</div>

<script src="{{ mix('js/game.js') }}"></script>
@endsection