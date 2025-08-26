import React from "react";

function UrlList({ urls }) {
  if (!urls.length) return <p>No URLs yet.</p>;

  return (
    <div className="list-card">
      <h2>All Short URLs</h2>
      <table>
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>
                <a href={url.shortUrl} target="_blank">{url.shortUrl}</a>
              </td>
              <td>{url.longUrl}</td>
              <td>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UrlList;
