import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app-shell">
      <div className="app-container">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
export default App;
