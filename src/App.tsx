import { DistroProvider } from "./context/DistroContext";
import Home from "./pages/Home";

function App() {
  return (
    <DistroProvider>
      <Home />
    </DistroProvider>
  );
}

export default App;
