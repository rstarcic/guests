import "./App.css";
import Header from "./components/Header";
import TitleSection from "./components/TitleSection";
import Form from "./components/Form";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [language, setLanguage] = useState("en");
  return (
    <Router basename="/roberta/guests/build">
      <div className="App">
        <Header />
        <TitleSection />
         <Routes>
          <Route path="/" element={<Navigate to={`/en`}  />} />
          <Route path="/en" element={<Form language={language} setLanguage={setLanguage} />} />
          {<Route path="/de" element={<Form language={language} setLanguage={setLanguage} />} /> }
          {<Route path="/it" element={<Form language={language} setLanguage={setLanguage} />} /> }
        </Routes>
      </div>
    </Router>
  );
}

export default App;