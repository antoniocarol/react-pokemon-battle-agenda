import { BrowserRouter, Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import P1Selection from "./pages/P1Selection";
import P2Selection from "./pages/P2Selection";
import DateSelection from "./pages/DateSelection";
import TimeSelection from "./pages/TimeSelection";
import BattleResume from "./pages/BattleResume";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/p1selection" element={<P1Selection />} />
        <Route path="/p2selection" element={<P2Selection />} />
        <Route path="/date" element={<DateSelection />} />
        <Route path="/time" element={<TimeSelection />} />
        <Route path="/resume" element={<BattleResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
