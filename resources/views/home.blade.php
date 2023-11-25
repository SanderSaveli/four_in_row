@extends('layouts.app')

@section('title') 
Home
@endsection 

@section('content')
<h1>Four in a row</h1>
<div class="content-row">
    <div class="content-square square-selected">
        <img src="" alt="IMG">
        <p class="square-text"></p>
    </div>
    <div class="content-square">
        <img src="" alt="IMG">
        <p class="square-text"></p>
    </div>
    <div class="content-square">
        <img src="" alt="IMG">
        <p class="square-text"></p>
    </div>
</div>
<a href="{{route('gamePage')}}" class="content-button">Start game</a>
<a href="{{route('gamePage')}}" class="content-button">Login</a>
<a href="{{route('gamePage')}}" class="content-button">Rules</a>
@endsection