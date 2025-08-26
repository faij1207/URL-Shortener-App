import React, { useState } from "react";

function UrlForm({ onAdd }) {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setShortUrl("");

    try {
      const res = await fetch("http://localhost:5000/api/url/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });
      const data = await res.json();

      if (data.error) {
        setMessage(data.error);
      } else {
        setShortUrl(data.shortUrl);
        setLongUrl("");
        onAdd(); // Refresh list
        setMessage("Short URL generated successfully!");
      }
    } catch (err) {
      setMessage("Server error, try again!");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setMessage("Copied to clipboard!");
  };

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Generate</button>
      </form>

      {shortUrl && (
        <div className="short-url-box">
          <a href={shortUrl} target="_blank">{shortUrl}</a>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UrlForm;
