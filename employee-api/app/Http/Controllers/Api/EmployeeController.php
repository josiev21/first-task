<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Validation\Rule;

class EmployeeController extends Controller
{
    // GET /api/employees
    public function index()
    {
        $employees = Employee::orderBy('id')->get()->map(function ($e) {
            return [
                'id' => $e->id,
                'name' => $e->name,
                'email' => $e->email,
                'isActive' => (bool) $e->is_active,
            ];
        });

        return response()->json(['employees' => $employees], 200);
    }

    // PATCH /api/employees/{id}
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        if (! $employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        // Acceptable fields: name, email, isActive
        $data = $request->only(['name', 'email', 'isActive']);

        // Validation rules — map incoming isActive to is_active
        $rules = [
            'name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('employees')->ignore($employee->id),
            ],
            'isActive' => 'sometimes|boolean',
        ];

        $validated = $request->validate($rules);

        if (array_key_exists('isActive', $validated)) {
            $employee->is_active = $validated['isActive'];
        }
        if (array_key_exists('name', $validated)) {
            $employee->name = $validated['name'];
        }
        if (array_key_exists('email', $validated)) {
            $employee->email = $validated['email'];
        }

        $employee->save();

        return response()->json([
            'id' => $employee->id,
            'name' => $employee->name,
            'email' => $employee->email,
            'isActive' => (bool) $employee->is_active,
        ], 200);
    }
}
