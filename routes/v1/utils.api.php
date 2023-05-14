<?php

use App\Http\Controllers\api\utils\OptionController;
use Illuminate\Support\Facades\Route;

Route::name('utils.')->prefix('utils')->group(function (): void {
    Route::middleware(['auth:sanctum'])->group(function () {
        // select option
        Route::controller(OptionController::class)->group(function (): void {
            Route::name('news.')->prefix('news')->group(function(): void {
                Route::get('category', 'newsCategory')->name('category');
                Route::get('language', 'newsLanguage')->name('language');
                Route::get('country', 'newsCountry')->name('country');
                Route::get('author', 'newsAuthor')->name('author');
                Route::get('source', 'newsSource')->name('source');
            });
        });
    });
});