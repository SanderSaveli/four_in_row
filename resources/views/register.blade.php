@extends('layouts.app')

@section('title') 
Registration
@endsection 

@section('content')
<div>
    <form action="/register" method="POST">
    @if(session('error'))
        <div class="alert-danger">
            {{ session('error') }}
        </div>
    @endif
        @csrf
        <h2>Registration</h2>
    <input type="text" name="username" id="username" placeholder="Username" class="formField" required autocomplete="username">
    <input type="text" name="email" id="email" placeholder="Email" class="formField" required autocomplete="email">
    <input type="password" name="password" id="password" placeholder="Password" class="formField" required>
    <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm Password" class="formField" required>
    <button type="submit" class="formButton">Register</button>
    </form> 
</div>
@endsection