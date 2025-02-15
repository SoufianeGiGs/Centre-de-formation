<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'instructor',
        'duration',
        'chapters_count',
        'tests_count',
        'price',
        'image',
        'issued_date',
        'validity_period',
        'certification_code',
        'requirements',
        'status',
    ];
}

