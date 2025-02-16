<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'age',
        'telephone',
        'email',
        'password',
        'adresse',
        'date_inscription',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'date_inscription' => 'datetime',
            'actif' => 'boolean',
            'is_admin' => 'boolean'
        ];
    }

    public function isActive()
    {
        return (bool) ($this->actif ?? false); // Default to false if null
    }

    public function isAdmin()
    {
        return (bool) ($this->is_admin ?? false); // Default to false if null
    }


    public function registrations()
{
    return $this->hasMany(Registration::class);
}

}
