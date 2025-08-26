import React, { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

function App() {
  const [urls, setUrls] = useState([]);

  // Fetch all URLs
  const fetchUrls = async () => {
    const res = await fetch("http://localhost:5000/api/url");
    const data = await res.json();
    setUrls(data);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <UrlForm onAdd={fetchUrls} />
      <UrlList urls={urls} />
    </div>
  );
}

export default App;
