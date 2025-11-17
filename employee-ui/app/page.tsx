"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UpdateModal from "./components/UpdateModal";

export interface Employee {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/employees")
      .then(res => setEmployees(res.data.employees));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Employee List</h1>

      <table border={1} width="100%" cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.isActive ? "ACTIVE" : "DEACTIVATED"}</td>

              <td>
                {emp.isActive && (
                  <button onClick={() => setSelected(emp)}>
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <UpdateModal
          employee={selected}
          onClose={() => setSelected(null)}
          onUpdated={(updated) => {
            setEmployees(prev =>
              prev.map(emp =>
                emp.id === updated.id ? updated : emp
              )
            );
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}
