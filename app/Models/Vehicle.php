<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $table = 'vehicles';

    protected $fillable = [ // preenchivel
        'user_id',
        'type',
        'brand',  
        'model',
        'year',
	];

    public function events(){
        return $this->hasOne(Event::class);
    }
}
