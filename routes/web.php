<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\VehicleController;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/home', function () {
        return view('home');
    })->name('home');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/vehicles', function () {
        return view('vehicles.index');
    })->name('vehicles');
});

Route::get('/getVehicles', [VehicleController::class, 'index']);
Route::get('/car/{id}', [VehicleController::class, 'show']);

Route::post('/vehicles/action', [VehicleController::class, 'action']);

Route::get('calender/events', [EventController::class, 'show']);
Route::post('calender/event', [EventController::class, 'show']);
Route::post('calender/action', [EventController::class, 'action']);

Route::post('/getVehicle', [VehicleController::class, 'getVehicle'])->name('getVehicle'); // Autocomplete