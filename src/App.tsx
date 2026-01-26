import { DistroProvider } from "./context/DistroContext";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DistroProvider>
        <Home />
      </DistroProvider>
    </QueryClientProvider>
  );
}

export default App;
