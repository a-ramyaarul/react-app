import Home from "./Home.jsx";
import { DarkModeProvider } from "./DarkModeContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <DarkModeProvider>
        <Home />
      </DarkModeProvider>
    </BrowserRouter>
  );
}

export default App;
