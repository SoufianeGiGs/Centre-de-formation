<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'instructor',
        'duration',
        'price',
        'image',
    ];

    public function registrations()
{
    return $this->hasMany(Registration::class);
}

}
