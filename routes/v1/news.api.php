<?php

use App\Http\Controllers\api\NewsController;
use Illuminate\Support\Facades\Route;

Route::name('v1.news.')->prefix('news')->group(function (): void {
    Route::controller(NewsController::class)->group(function (): void {
        Route::get('hero', 'heroNews')->name('hero');
        Route::get('feeds', 'feedsNews')->name('feeds');

        Route::middleware(['auth:sanctum', "check.user"])->group(function (): void {
            Route::get('list', 'listNews')->name('list');
            Route::get('prefered-category', 'preferedNewsCategory')->name('prefered.category');
            Route::get('prefered-feeds', 'preferedNewsFeeds')->name('prefered.feeds');
        });
        Route::middleware(['auth:sanctum'])->group(function () {
            Route::get('sync', 'syncNews')->name('sync');
        });
    });
});
