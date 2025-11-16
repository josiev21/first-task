<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
      use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'is_active',
    ];

    // Casts
    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Optional: expose isActive camelCase when serializing
    protected $appends = [];
    protected $hidden = [];

    // If you want to automatically include camelCase attribute:
    public function getIsActiveAttribute($value)
    {
        return (bool) $value;
    }
}
