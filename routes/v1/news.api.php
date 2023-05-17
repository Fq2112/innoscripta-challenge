<?php

use App\Http\Controllers\api\NewsController;
use Illuminate\Support\Facades\Route;

Route::name('v1.news.')->prefix('news')->group(function (): void {
    Route::controller(NewsController::class)->group(function (): void {
        Route::get('list', 'listNews')->name('list');

        Route::middleware(['auth:sanctum'])->group(function () {
            Route::get('sync', 'syncNews')->name('sync');
        });
    });
});
