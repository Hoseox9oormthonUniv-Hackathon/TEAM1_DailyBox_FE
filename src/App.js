import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./page/main/Main";
import Modal from "./components/Modal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
