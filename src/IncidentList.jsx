import { useState, useContext } from "react";
import Incident from "./Incident";
import styles from "./style.module.css";
import { DarkModeContext } from "./DarkModeContext";

function IncidentList({ incidents, onDelete, onAdd, onUpdate }) {
  const { darkMode } = useContext(DarkModeContext);

  const [editingId, setEditingId] = useState(null);

  const [newIncident, setNewIncident] = useState({
    incident_id: "",
    title: "",
    priority: "Medium",
    status: "open",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setNewIncident(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId && onUpdate) {
      onUpdate(newIncident);
      setEditingId(null);
    } else {
      onAdd(newIncident);
    }

    setNewIncident({ incident_id: "", title: "", priority: "Medium", status: "open" });
  };

  return (
    <div className={darkMode ? styles.dark : styles.light}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {["incident_id", "title"].map(field => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
            <input
              type="text"
              name={field}
              value={newIncident[field]}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        ))}

        <label>
          Priority
          <select name="priority" value={newIncident.priority} onChange={handleChange} className={styles.select}>
            {["Low", "Medium", "High", "Critical"].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select name="status" value={newIncident.status} onChange={handleChange} className={styles.select}>
            {["open", "closed","In Progress"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <button type="submit" className={styles.submitBtn}>Add Incident</button>
      </form>

      <div className={styles.incidentList}>
        {incidents.map(incident => (
          <Incident
            key={incident.incident_id}
            incident={incident}
            onDelete={() => onDelete(incident.incident_id)}
            onEdit={() => {
              setEditingId(incident.incident_id);
              setNewIncident(incident);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default IncidentList;
