<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Login;
use App\Models\Session; 
use Illuminate\Auth\Events\Logout;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
            parent::boot();

    Event::listen(Login::class, function ($user) {
        Session::create([
            'PlayerID' => $user->user->UserID,
            'StartTime' => now(),
        ]);
    });

    Event::listen(Logout::class, function ($user) {
        $lastSession = Session::where('PlayerID', $user->user->UserID)->orderBy('StartTime', 'desc')->first();
        if ($lastSession) {
            $lastSession->update(['EndTime' => now()]);
        }
    });
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
