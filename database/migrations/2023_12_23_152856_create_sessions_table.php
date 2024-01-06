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
        Schema::create('sessions', function (Blueprint $table) {
            $table->increments('SessionID');
            $table->unsignedInteger('PlayerID');
            $table->timestamp('StartTime')->useCurrent();
            $table->timestamp('EndTime')->nullable();
            $table->integer('GamesPlayed')->default(0);
            $table->foreign('PlayerID')->references('UserID')->on('users');
            // Другие поля по необходимости...
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
