<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $table = 'events';


    protected $fillable = [
        'start', 
        'end', 
        'title',
        'vehicle_id', 
        'status_id',
        'user_id',
    ];


    public function vehicle(){
        return $this->hasOne(Vehicle::class, "id", "vehicle_id");
    }

}
