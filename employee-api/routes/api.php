<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\EmployeeController;

Route::get('/employees', [EmployeeController::class, 'index']);
Route::patch('/employees/{id}', [EmployeeController::class, 'update']);
