@extends('layouts.app')

@section('title') 
Login
@endsection 

@section('content')
<div>
    <form action="/login" method="POST">
        @if(session('error'))
            <div class="alert alert-danger">
                {{ session('error') }}
            </div>
        @endif
        @csrf
        <h2>Login</h2>
        <input type="text" name="username" placeholder="Username" class="formField" autocomplete="username" required>
        <input type="password" name="password" placeholder="Password" class="formField" autocomplete="password" required>
        <button type="submit" class="formButton">Login</button>
    </form> 
    <a href="/register">create account</a>
</div>
@endsection