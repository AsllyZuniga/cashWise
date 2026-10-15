import "./App.css";
import Dashboard from "./pages/dashboard";
import { FinanceProvider } from "./context/FinanceProvider";
import { ToastProvider } from "./context/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <FinanceProvider>
        <Dashboard />
      </FinanceProvider>
    </ToastProvider>
  );
}

export default App;
