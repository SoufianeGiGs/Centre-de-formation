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
            $imageName = time() . '_' . $request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('images'), $imageName);
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

    // Update an existing formation (PUT or PATCH route)
    public function update(Request $request, $id)
    {
        $formation = Formation::find($id);
        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'instructor' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'price' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle new image if uploaded
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($formation->image && file_exists(public_path($formation->image))) {
                unlink(public_path($formation->image));
            }
            $newImageName = time() . '_' . $request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('images'), $newImageName);
            $validatedData['image'] = 'images/' . $newImageName;
        }

        // Update formation
        $formation->update($validatedData);

        return response()->json([
            'message' => 'Formation updated successfully',
            'formation' => $formation
        ], 200);
    }

    // Delete a formation
    public function destroy($id)
    {
        $formation = Formation::find($id);
        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        // Delete image from disk if it exists
        if ($formation->image && file_exists(public_path($formation->image))) {
            unlink(public_path($formation->image));
        }

        $formation->delete();

        return response()->json(['message' => 'Formation deleted successfully'], 200);
    }

    // Get the count of users registered for a given formation
    public function getRegisteredUsers($formationId)
    {
        $formation = Formation::find($formationId);
        if (!$formation) {
            return response()->json(['message' => 'Formation not found'], 404);
        }

        // Example: If you have a "registrations" relationship
        $userCount = $formation->registrations()->count();

        return response()->json(['count' => $userCount]);
    }
}
