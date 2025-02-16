<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificationController extends Controller
{
    public function index()
    {
        // Retrieve all certifications and return them as JSON
        return response()->json(Certification::all(), 200);
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'instructor' => 'required|string|max:255',
            'duration' => 'required|string',
            'chapters_count' => 'required|integer',
            'tests_count' => 'required|integer',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'issued_date' => 'required|date',
            'validity_period' => 'required|integer',
            'certification_code' => 'required|string|unique:certifications',
            'requirements' => 'nullable|string',
            'status' => 'required|in:active,expired,archived',
        ]);
        
        // Handle the image upload if there's a file
        if ($request->hasFile('image')) {
            // Generate a unique name for the image
            $imageName = time() . '_' . $request->file('image')->getClientOriginalName();
            
            // Move the image to the public/images/certifs directory
            $imagePath = $request->file('image')->move(public_path('images/certifs'), $imageName);
            
            // Store the relative path of the image in the database
            $validated['image'] = 'images/certifs/' . $imageName;
        }
        
        // Create the certification record
        $certification = Certification::create($validated);
        
        // Return the created certification data
        return response()->json($certification, 201);
    }
    
    public function show($id)
    {
        // Find the certification by ID or return an error if not found
        $certification = Certification::findOrFail($id);
        
        // Return the certification data as JSON
        return response()->json($certification, 200);
    }

    public function update(Request $request, $id)
    {
        // Find the certification by ID
        $certification = Certification::findOrFail($id);

        // Validate the incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'instructor' => 'required|string|max:255',
            'duration' => 'required|string',
            'chapters_count' => 'required|integer',
            'tests_count' => 'required|integer',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'issued_date' => 'required|date',
            'validity_period' => 'required|integer',
            'certification_code' => 'required|string|unique:certifications,certification_code,' . $id,
            'requirements' => 'nullable|string',
            'status' => 'required|in:active,expired,archived',
        ]);

        // Handle the image upload if there's a new file
        if ($request->hasFile('image')) {
            // If the certification already has an image, delete it
            if ($certification->image) {
                Storage::delete('public/' . $certification->image);
            }

            // Store the new image in the public directory
            $imagePath = $request->file('image')->store('certifs', 'public');

            // Update the image field in the database
            $validated['image'] = $imagePath;
        }

        // Update the certification record
        $certification->update($validated);

        // Return the updated certification data
        return response()->json($certification, 200);
    }

    public function destroy($id)
    {
        // Find the certification by ID
        $certification = Certification::findOrFail($id);

        // If the certification has an image, delete it
        if ($certification->image) {
            Storage::delete('public/' . $certification->image);
        }

        // Delete the certification record
        $certification->delete();

        // Return a success message
        return response()->json(['message' => 'Certification deleted successfully']);
    }
}
