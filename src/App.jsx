import "./App.css";
import "./assets/styles/layout.css"; // Layout global para sidebar
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  let element = useRoutes(routes);

  return <>{element}</>;
}

export default App;
