<?php

use App\Http\Controllers\api\AuthController;
use Illuminate\Support\Facades\Route;

Route::name('auth.')->prefix('auth')->controller(AuthController::class)->group(function (): void {
    Route::post('login', 'login')->name('login');
    Route::post('forgot-password', 'forgotPassword')->name('forgot');
    Route::post('reset-password', 'resetPassword')->name('reset');

    Route::middleware(['auth:sanctum', "check.user"])->group(function (): void {
        Route::get('check', 'check')->name('check');
        Route::post('logout', 'logout')->name('logout');
        Route::put('change-password', 'changePassword')->name('change_password');
        Route::get('edit-profile', 'editProfile')->name('edit_profile');
        Route::put('update-profile', 'updateProfile')->name('update_profile');
    });
});
