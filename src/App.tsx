import { useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import DistroList from "./components/DistroList";
import type { Distro } from "./types";
import distrosData from "../data/distros.json";

function App() {
  const [query, setQuery] = useState("");

  const distros: Distro[] = useMemo(
    () => distrosData as unknown as Distro[],
    []
  );

  return (
    <div className="min-h-screen">
      <Header />
      <SearchBar query={query} setQuery={setQuery} />
      <DistroList distros={distros} query={query} />
    </div>
  );
}

export default App;
