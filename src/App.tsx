import { useEffect, useState } from "react";
import { DistroContext } from "./context/DistroContext";
import Home from "./pages/Home";
import type { Distro } from "./types/distro";

function App() {
  const [distros, setDistros] = useState<Distro[]>([]);

  useEffect(() => {
    fetch("/data/distros.json")
      .then((res) => res.json())
      .then(setDistros);
  }, []);

  return (
    <DistroContext.Provider value={{ distros }}>
      <Home />
    </DistroContext.Provider>
  );
}

export default App;
