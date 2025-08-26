import React, { useState } from "react";
import { createShortUrl } from "../api/urlApi";

const UrlForm = ({ onAdd }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await createShortUrl(longUrl);
      setShortUrl(data.shortUrl);
      onAdd(); // refresh list
      setLongUrl("");
    } catch (err) {
      setError("Failed to create short URL");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Short URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank">{shortUrl}</a>
        </p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UrlForm;
