import { BrowserRouter, Route } from "react-router-dom";
import Routes from "./routes";
import { IntermediaryRoutes } from "./routes/IntermediaryRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
