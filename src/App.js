import React, {useState} from "react";
//Import Styles
import './styles/app.scss';
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from './components/Library';
//import util
import data from "./util";

function App() {
  //state
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player 
      setIsPlaying={setIsPlaying}
      isPlaying={isPlaying}
      currentSong={currentSong}
      />
      <Library songs={songs} setcurrentSong={setcurrentSong} />
    </div>
  );
};

export default App;