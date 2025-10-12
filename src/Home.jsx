import { useReducer, useContext } from "react";
import styles from "./style.module.css";
import IncidentList from "./IncidentList";
import Welcome from "./Welcome";
import data from "./IncidentList/incidents.json";
import { DarkModeContext } from "./DarkModeContext";
import { Link, Routes, Route} from "react-router-dom";

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter(i => i.incident_id !== action.payload);
    case "UPDATE":
      return state.map(i => (i.incident_id === action.payload.incident_id ? action.payload : i));
    default:
      return state;
  }
}

function Home() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [incidents, dispatch] = useReducer(reducer, data);

  const handleDelete = id => dispatch({ type: "DELETE", payload: id });
  const handleAdd = incident => dispatch({ type: "ADD", payload: incident });
  const handleUpdate = incident => dispatch({ type: "UPDATE", payload: incident });

  const user = { prefix: "Ms.", firstName: "Ramya", lastName: "Arul" };
  const date = new Date();

  return (
    <div className={`${styles.app} ${darkMode ? styles.dark : styles.light}`}>
      <header className={styles.header}>
        <span>

            I'm {user.prefix} {user.firstName} {user.lastName}
        </span>
        <span className={styles.time}>
          Time: {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </span>
        <nav>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link to="/" className={styles.link}>

                Home

              </Link>
            </li>
            <li className={styles.listItem}>
              <Link to="/incidents" className={styles.link}>

                Incidents

              </Link>
            </li>
            <li className={styles.listItem}>
              <button type="button" className={styles.link} onClick={toggleDarkMode}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.content}>
        <Routes>

          <Route path="/" element={<Welcome />} />
          <Route
            path="/incidents"

            element={<IncidentList incidents={incidents} onDelete={handleDelete} onAdd={handleAdd} onUpdate={handleUpdate} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default Home;
