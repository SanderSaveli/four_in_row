<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('GameID');
            $table->integer('MovesNumber');
            $table->timestamp('StartTime')->useCurrent();
            $table->timestamp('EndTime')->nullable();
            $table->unsignedInteger('WinnerID')->nullable();
            $table->foreign('WinnerID')->references('UserID')->on('users');
            $table->unsignedInteger('Player1ID');
            $table->unsignedInteger('Player2ID');
            $table->foreign('Player1ID')->references('UserID')->on('users');
            $table->foreign('Player2ID')->references('UserID')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
