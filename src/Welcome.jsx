import { useEffect, useState } from "react";
import styles from "./style.module.css";
function Welcome() {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getJoke() {
       try{
      const res = await fetch("https://official-joke-api.appspot.com/random_joke", { signal });
      const data = await res.json();
      setJoke(`${data.setup} - ${data.punchline}`);
        } catch (error) {

          if (error.name === 'AbortError') return;
          console.error("Error fetching joke:", error);
        }
    }

    getJoke();

    return () => controller.abort();
  }, []);

  return (
    <>
      <h2 className={styles.welcome}>  Welcome to my page </h2>
      <h5 className={styles.joke}>Joke: {joke}</h5>
    </>
  );
}

export default Welcome;
