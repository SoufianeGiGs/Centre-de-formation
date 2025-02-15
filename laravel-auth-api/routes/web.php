<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FormationController; 
use App\Http\Controllers\CertificationController;// ✅ Fix: Import UserController

// Public Routes
Route::get('/', function () {
    return view('welcome');
});

// Authentication Routes
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');  
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Admin Dashboard Route (Requires Auth)
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', function () {
        if (auth()->user() && auth()->user()->isAdmin()) {
            return view('admin.dashboard');
        }
        return redirect('/');
    });
});

// ✅ User Management Routes - No Auth Middleware for Now (to allow testing)
Route::get('/users', [UserController::class, 'index'])->name('users.index');

Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
// Show a user by ID (get user details)
Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');

Route::get('/formations', [FormationController::class, 'index']);
Route::post('/formations', [FormationController::class, 'store']);
Route::get('/formations/{id}', [FormationController::class, 'show']);
Route::delete('/formations/{id}', [FormationController::class, 'destroy']);

Route::resource('certifications', CertificationController::class);