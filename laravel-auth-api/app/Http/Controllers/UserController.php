<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // Fetch all users
    public function index()
    {
        return response()->json(User::all());
    }

    // Add a new user
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|string',
            'cin' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'date_inscription' => 'required|date',
            'actif' => 'boolean',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'cin' => $request->cin,
            'adresse' => $request->adresse,
            'date_inscription' => $request->date_inscription,
            'actif' => $request->actif ?? false,
        ]);

        return response()->json($user, 201);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }


    public function show($id)
{
    // Fetch the user by ID
    $user = User::find($id);
    
    // Check if the user exists
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Return the user data
    return response()->json([
        'user' => $user
    ]);
}

}
