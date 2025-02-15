<?php

namespace App\Http\Controllers;

use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FormationController extends Controller
{
    // List all formations
    public function index()
    {
        return response()->json(Formation::all(), 200);
    }

    // Store a new formation with image upload
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'instructor' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'price' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Handle the image upload
        if ($request->hasFile('image')) {
            // Generate a unique file name
            $imageName = time() . '_' . $request->file('image')->getClientOriginalName();
            
            // Move the image to the public directory
            $request->file('image')->move(public_path('images/'), $imageName); // Storing in public/images folder
    
            // Store the image path in the database (relative to the public directory)
            $validatedData['image'] = 'images/' . $imageName;
        }
    
        // Create the formation record in the database
        $formation = Formation::create($validatedData);
    
        if ($formation) {
            return response()->json([
                'message' => 'Formation created successfully',
                'formation' => $formation
            ], 201);
        } else {
            return response()->json([
                'message' => 'Failed to create formation'
            ], 500);
        }
    }
    
    
    


    // Get a specific formation
    public function show($id)
    {
        $formation = Formation::find($id);
        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }
        return response()->json($formation, 200);
    }

    // Delete a formation
    public function destroy($id)
    {
        $formation = Formation::find($id);
        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        if ($formation->image) {
            Storage::delete('public/' . $formation->image);
        }

        $formation->delete();

        return response()->json(['message' => 'Formation deleted successfully'], 200);
    }
}
