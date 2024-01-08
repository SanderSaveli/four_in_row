@extends('layouts.app')

@section('title') 
Home
@endsection 

@section('content')
  <a href="{{route('profilePage')}}" class= "top-right-link">
    <img src="/img/images/profile.svg" alt="IMG">
  </a>
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
<a id="rulesButton" class="content-button">Rules</a>

<div id="rulesModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Правила игры "4 в ряд"</h2>
    <p id="rulesText"></p>
  </div>
</div>

<script src="{{ mix('js/menuSelector.js') }}"></script>
@endsection