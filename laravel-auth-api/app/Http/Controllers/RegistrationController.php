<?php
namespace App\Http\Controllers;

use App\Models\Registration;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\User;
class RegistrationController extends Controller
{
    public function registerForFormation(Request $request, $formationId)
    {
        // Validate that user_id is provided and exists in the database
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
    
        // Fetch the user and formation
        $user = User::find($validated['user_id']);
        $formation = Formation::find($formationId);
    
        // Check if either the user or formation doesn't exist
        if (!$user || !$formation) {
            return response()->json(['message' => 'User or Formation not found'], 404);
        }
    
        // Check if the user is already registered for this formation
        $existingRegistration = Registration::where('user_id', $user->id)
                                             ->where('formation_id', $formation->id)
                                             ->first();
    
        if ($existingRegistration) {
            // Check if the registration is already approved or pending
            if ($existingRegistration->status == 'approved') {
                return response()->json(['message' => 'User is already registered for this formation.'], 400);
            }
    
            if ($existingRegistration->status == 'pending') {
                return response()->json(['message' => 'Registration is still pending approval.'], 400);
            }
        }
    
        // If no registration exists, create a new registration
        $registration = new Registration();
        $registration->user_id = $user->id;
        $registration->formation_id = $formation->id;
        $registration->status = 'pending'; // Set initial status as pending
        $registration->save();
    
        return response()->json(['message' => 'Registration successful, awaiting approval.'], 200);
    }
    

    
    public function approveRegistration($registrationId)
{
   

    // Find the registration request
    $registration = Registration::findOrFail($registrationId);

    // Approve the registration
    $registration->status = 'approved';
    $registration->save();

    return response()->json(['message' => 'Registration has been approved'], 200);
}

public function denyRegistration($registrationId)
{
   

    // Find the registration request
    $registration = Registration::findOrFail($registrationId);

    // Deny the registration
    $registration->status = 'denied';
    $registration->save();

    return response()->json(['message' => 'Registration has been denied'], 200);
}



public function getRegistrationStatus($formationId, Request $request)
{
    // Get the user ID from the request
    $userId = $request->query('user_id');
    Log::info("Checking registration status for user ID: {$request->query('user_id')} and formation ID: {$formationId}");

    Log::info("User ID from request: {$userId}");
    // Check if the registration exists for the given user and formation
    $registration = Registration::where('user_id', $userId)
                                 ->where('formation_id', $formationId)
                                 ->first();

    if ($registration) {
        Log::info("Registration found for user ID: {$userId}, formation ID: {$formationId}, status: {$registration->status}");
     
        return response()->json(['status' => $registration->status]); // Return the status from the registration record
    }

    Log::info("No registration found for user ID: {$userId}, formation ID: {$formationId}. Returning 'pending' status.");
 
    // If no registration exists, return 'pending' as the default status
    return response()->json(['status' => 'Register']);
}



public function getAllStatusesForUser($userId)
{
    // Get all formations
    $allFormations = \App\Models\Formation::all();

    // Get all registrations for this user
    $registrations = \App\Models\Registration::where('user_id', $userId)->get()->keyBy('formation_id');

    // Build an array of formationId => status
    $statuses = [];
    foreach ($allFormations as $formation) {
        if (isset($registrations[$formation->id])) {
            // e.g. 'pending', 'approved', 'denied'
            $statuses[$formation->id] = $registrations[$formation->id]->status;
        } else {
            // If no registration found, return something like 'Register'
            $statuses[$formation->id] = 'Register';
        }
    }

    // Return that object as JSON
    return response()->json($statuses);
}
// In RegistrationController
public function getPendingRegistrations()
{
    // Eager-load 'user' and 'formation' so you can display them easily
    $pending = Registration::with(['user', 'formation'])
                ->where('status', 'pending')
                ->get();
    
    return response()->json($pending, 200);
}

// In RegistrationController
public function getAllRegistrations()
{
    // Eager-load 'user' and 'formation' so you can easily display them
    $registrations = Registration::with(['user', 'formation'])->get();

    return response()->json($registrations, 200);
}

}
