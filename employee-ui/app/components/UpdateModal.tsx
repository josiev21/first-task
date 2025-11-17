"use client";

import { useState } from "react";
import axios from "axios";
import { Employee } from "../page";

interface Props {
  employee: Employee;
  onClose: () => void;
  onUpdated: (employee: Employee) => void;
}

export default function UpdateModal({ employee, onClose, onUpdated }: Props) {
  const [name, setName] = useState<string>(employee.name);
  const [email, setEmail] = useState<string>(employee.email);
  const [isActive, setIsActive] = useState<boolean>(employee.isActive);

  const saveChanges = () => {
    axios.patch(`http://localhost:8000/api/employees/${employee.id}`, {
      name,
      email,
      isActive
    }).then(res => {
      onUpdated(res.data.employee);
    });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>User Profile</h2>

        <label>Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
        />

        <label>Status</label>
        <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          {isActive ? "Active" : "Inactive"}
        </label>

        <div style={styles.buttons}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 350,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  buttons: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
  },
};
