import React, { useState } from "react";
import axios from "axios";

function App() {
  const [songName, setSongName] = useState("");
  const [results, setResults] = useState([]);
  const KEY = process.env.REACT_APP_YOUTUBE_KEY;
  const searchSong = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${songName}&type=video&key=${KEY}`
      );
      setResults(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Search YouTube for a Song</h1>
      <input
        type="text"
        placeholder="Enter song name"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <button onClick={searchSong}>Search</button>
      <div>
        {results.map((result) => (
          <div key={result.id.videoId}>
            <h2>{result.snippet.title}</h2>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${result.id.videoId}`}
              title={result.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
