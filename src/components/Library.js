import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setcurentSong }) => {
    return(
        <div className="library">
            <h2>Library</h2>
            <div className="library-songs">
               {songs.map((song) => (
               <LibrarySong 
               songs={songs}
               setcurentSong={setcurentSong} 
               song={song}
               id={song.id}
               key={song.id}
               />
               ))}
            </div>
        </div>
    );
};

export default Library;