import React, { useState } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="app">
      <h1>URL Shortener</h1>
      <UrlForm onAdd={handleRefresh} />
      <UrlList key={refresh} />
    </div>
  );
}

export default App;
