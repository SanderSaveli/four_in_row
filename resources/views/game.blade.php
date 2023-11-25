@extends('layouts.app')

@section('title') 
Game
@endsection 

@section('content')

<h1>Four in a row</h1>
<div class="content-row flexUp">
    <div class="content-column playerName">
        <img src="" alt="IMG">
        <p>Player1</p>
    </div>
    <canvas class="fieldCanvas" id="fieldCanvas" width="400" height="400">
        Sorry your browser does not support this element!
    </canvas>
    <div class="content-column playerName">
        <img src="" alt="IMG">
        <p id="name">Player2</p>
    </div>
</div>
<script src="{{ URL::asset('js/game.js') }}"></script>
@endsection