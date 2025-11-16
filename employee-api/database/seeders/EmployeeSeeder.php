<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;

class EmployeeSeeder extends Seeder
{
    public function run()
    {
        // Create the three example employees
        Employee::create([
            'name' => 'John Smith',
            'email' => 'john@ayp-group.com',
            'is_active' => true,
        ]);

        Employee::create([
            'name' => 'Jane Smith',
            'email' => 'jane@ayp-group.com',
            'is_active' => false,
        ]);

        Employee::create([
            'name' => 'Tom Smith',
            'email' => 'tom@ayp-group.com',
            'is_active' => true,
        ]);
    }
}
