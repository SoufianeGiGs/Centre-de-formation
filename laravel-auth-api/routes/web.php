<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FormationController; 
use App\Http\Controllers\CertificationController;

use App\Http\Controllers\RegistrationController;// ✅ Fix: Import UserController

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
Route::post('certifications/update/{id}', [CertificationController::class, 'update']);

Route::post('/formations/{formationId}/register', [RegistrationController::class, 'registerForFormation']);
Route::post('/registrations/{registrationId}/approve', [RegistrationController::class, 'approveRegistration']);
Route::post('/registrations/{registrationId}/deny', [RegistrationController::class, 'denyRegistration']);
// Add this in your routes/web.php or routes/api.php
Route::get('/formations/{formationId}/status', [RegistrationController::class, 'getRegistrationStatus']);
Route::get('/formations/{formationId}/users', [FormationController::class, 'getRegisteredUsers']);
Route::post('formations/update/{id}', [FormationController::class, 'update']);
Route::get('/users/{userId}/formations/statuses', [RegistrationController::class, 'getAllStatusesForUser']);
