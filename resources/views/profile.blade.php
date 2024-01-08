@extends('layouts.app')

@section('title') 
Registration
@endsection 

@section('content')
  <a href="{{route('homePage')}}" class= "top-right-link">
    <img src="/img/images/home.svg" alt="IMG">
  </a>
  <div class="profile-header">
    <div class="row">
        <img src="img/images/user.png" alt="User Avatar" class="UserAvatar">
        <h1>{{ $username }}</h1>
    </div>
    <div class="row">
        <p class="profileField">Rating: {{ $rating }}</p>
        <p class="profileField">Games Played: {{ $gamesPlayed }}</p>
        <p class="profileField">Win Percentage: {{ $winPercentage }}%</p>
    </div>
  </div>

  <div class="recent-games">
    <h2>Recent Games</h2>
    <table>
      <thead>
        <tr>
          <th>Result</th>
          <th>Turn</th>
          <th>Opponent</th>
          <th>Number of Moves</th>
          <th>Date & Time</th>
        </tr>
      </thead>
              <tbody>
            @foreach ($games as $game)
            <tr class="{{ ($game->WinnerID === $userId) ? 'win' : (($game->WinnerID === null) ? 'draw' : 'loss') }}">
                <td>
                    @if ($game->WinnerID === $userId)
                        Win
                    @elseif ($game->WinnerID === null)
                        Draw
                    @else
                        Lose
                    @endif
                </td>
                <td>
                    {{ ($game->Player1ID === $userId) ? 1 : 2 }}
                </td>
                <td>
                    {{ ($game->Player1ID === $userId) ? $game->player2->Username : $game->player1->Username }}
                </td>
                <td>{{ $game->MovesNumber }}</td>
                <td>{{ $game->StartTime }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
  </div>
  <form action="{{ route('logout') }}" method="POST">
    @csrf
    <button type="submit">Logout</button>
</form>
@endsection