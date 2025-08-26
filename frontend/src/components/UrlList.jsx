import React, { useEffect, useState } from "react";
import { getAllUrls } from "../api/urlApi";

const UrlList = () => {
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    const data = await getAllUrls();
    setUrls(data);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="list-container">
      <h2>All URLs</h2>
      {urls.length === 0 ? (
        <p>No URLs created yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Long URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td><a href={url.shortUrl} target="_blank">{url.shortUrl}</a></td>
                <td>{url.longUrl}</td>
                <td>{url.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UrlList;
