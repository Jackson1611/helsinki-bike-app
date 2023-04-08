import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Journey } from "./components/Journey";
import { Station } from "./components/Station";

function App() {
  return (
    <BrowserRouter>
      <h1>
        <Link to="/Journey">Journey</Link>{" "}
      </h1>
      <h1>
        <Link to="/Station">Station</Link>
      </h1>
      <Routes>
        <Route path="/" element={<Journey />} />
        <Route path="/Journey" element={<Journey />} />
        <Route path="/Station" element={<Station />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
