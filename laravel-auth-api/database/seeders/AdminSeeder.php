<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'nom' => 'Admin',
            'prenom' => 'Admin',
            'age' => 30,
            'telephone' => '0123456789',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),  // Make sure to hash the password
            'cin' => 'A1234567',
            'adresse' => '123 Admin Street',
            'date_inscription' => now(),
            'actif' => true,
            'is_admin' => true,  // Set is_admin to true for the admin
        ]);
    }
}
