import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import WebIntegration from './WebIntegration';
import JavaScriptSDK from './JavascriptSDK';
import Home from './Home';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web-integration" element={<WebIntegration />} />
        <Route path="/javascript-sdk" element={<JavaScriptSDK />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
};

export default App;
