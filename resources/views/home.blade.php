@extends('layouts.app')

@section('title') 
Home
@endsection 

@section('content')
<h1>Four in a row</h1>
<div class="content-row">
    <div class="content-square square-selected" id= "handToHand">
        <img src="/img/images/Hand to hand.svg" alt="IMG">
        <p class="square-text"></p>
    </div>
    <div class="content-square" id= "online">
        <img src="/img/images/Online.svg" alt="IMG">
        <p class="square-text"></p>
    </div>
    <div class="content-square" id= "bot">
        <img src="/img/images/Bot.svg" alt="IMG">
        <p class="square-text"></p>
    </div>
</div>
<a href="{{route('gamePage')}}" class="content-button">Start game</a>
<a href="{{route('loginPage')}}" class="content-button">Login</a>
<a href="{{route('gamePage')}}" class="content-button">Rules</a>
<script src="{{ mix('js/menuSelector.js') }}"></script>
@endsection