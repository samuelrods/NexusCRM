<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Company extends Model
{
    use HasFactory, Searchable;

    public $fillable = [
        'name',
        'website',
        'industry',
        'address_id',
        'description',
        'organization_id'
    ];

    public $timestamps = false;

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
        ];
    }
}
