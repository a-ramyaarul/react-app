import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
import styles from "./Incident.module.css";
import { Button } from "@mui/material";

function Incident({ incident, onDelete, onEdit }) {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={`${styles.box} ${darkMode ? "dark" : "light"}`}>
      <ul>
        <li>ID: {incident.incident_id}</li>
        <li>Title: {incident.title}</li>
        <li>Status: {incident.status}</li>
        <li>Priority: {incident.priority}</li>
        <div>
          <Button sx={{mt:'50px'}} variant='contained' color="error" onClick={onDelete}>Delete</Button>
          <Button sx={{mt:'50px'}} variant='contained' color="secondary" className={styles.edit} onClick={onEdit}>Edit</Button>
        </div>
      </ul>
    </div>
  );
}

export default Incident;
