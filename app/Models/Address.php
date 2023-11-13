<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['street_address', 'city', 'state', 'zip_code'];

    public function clients(): HasMany
    {
        return $this->hasMany(Client::class);
    }
}
