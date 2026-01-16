import { DistroContext } from "./context/DistroContext";
import distros from "../data/distros.json";
import Home from "./pages/Home";

function App() {
  return (
    <DistroContext.Provider value={{ distros }}>
      <Home />
    </DistroContext.Provider>
  );
}

export default App;
