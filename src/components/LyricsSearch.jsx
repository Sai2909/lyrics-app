import { useState } from 'react';
import Axios from 'axios';
import './LyricsSearch.css';

function LyricsSearch({ url }) {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');

  const searchLyrics = async (event) => {
    event.preventDefault();
    if (!artist === '' || song === '') {
      return;
    }
    setLyrics('');
    setError('');
    try {
      const response = await Axios.get(`${url}/${artist}/${song}`);
      console.log(response);
      setLyrics(response.data.lyrics);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  return (
   <>
    <div className='search-container'>
      <h2>Lyrics Search_App</h2>
      <form onSubmit={searchLyrics}>
        <input
          type='text'
          placeholder='Artist Name eg:Patrice'
          value={artist}
          onChange={(e) => {
            setArtist(e.target.value);
          }}
          required
        />
        <input
          type='text'
          placeholder='Song Name eg:Today'
          value={song}
          onChange={(e) => {
            setSong(e.target.value);
          }}
          required
        />
        <button type='submit'>Search</button>
      </form>
      <hr />
      {error && <h2 className='error'>{error}</h2>}
      <pre className='lyrics-background'>{lyrics}</pre>
    </div>
    <p className='footer'>Developed by <a href='https://medium.com/@saikiranmanchala2000'>Sai Manchala</a></p>
   </>
  );
}

export default LyricsSearch;