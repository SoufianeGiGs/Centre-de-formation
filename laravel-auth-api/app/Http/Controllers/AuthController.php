<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // User Registration
   // User Registration
public function register(Request $request)
{
    // Validate the request
    $validator = Validator::make($request->all(), [
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'age' => 'required|integer',
        'telephone' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
        'adresse' => 'required|string|max:255',
        'date_inscription' => 'required|date',
        'cin' => 'nullable|string|max:255', // ✅ Now optional
    ]);

    // Return error if validation fails
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Create the user
    $user = User::create([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'age' => $request->age,
        'telephone' => $request->telephone,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'adresse' => $request->adresse,
        'date_inscription' => $request->date_inscription,
        'cin' => $request->cin ?? null, // ✅ If cin is not provided, store NULL
        'actif' => false, // Default value
    ]);

    return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
}


    // User Login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            
            // Generate new API token
            $user->update(['api_token' => Str::random(60)]);

            return response()->json([
                'message' => 'Login successful',
                'user' => [
                    'id' => $user->id,
                    'nom' => $user->nom,
                    'prenom' => $user->prenom,
                    'email' => $user->email,
                    'role' => $user->is_admin ? 'Admin' : 'User',
                    'actif' => $user->actif,
                    'api_token' => $user->api_token // ✅ Return token for authentication
                ]
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // User Logout
    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $user->update(['api_token' => null]); // ✅ Invalidate token
            Auth::logout();
            return response()->json(['message' => 'Logged out successfully'], 200);
        }

        return response()->json(['message' => 'No user logged in'], 401);
    }
}
