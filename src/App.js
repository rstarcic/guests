import "./App.css";
import Header from "./components/Header";
import TitleSection from "./components/TitleSection";
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/english" element={<Form />} />
          <Route path="/italian" element={<Form />} />
          <Route path="/german" element={<Form />} />
        </Routes>
        <TitleSection />
        <Form />
      </div>
    </Router>
  );
}

export default App;
