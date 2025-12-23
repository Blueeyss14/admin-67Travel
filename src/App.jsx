import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" />
      <AppRoutes />
    </Router>
  );
};

export default App;
