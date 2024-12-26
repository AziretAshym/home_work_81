import React, { useState } from 'react';
import axiosApi from '../../axiosApi.ts';
import './SearchForm.css';

const SearchForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const shortenUrl = async (originalUrl: string) => {
    try {
      const response = await axiosApi.post('/urls', { originalLink: originalUrl });
      setShortUrl(`http://${response.data.shortLink}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!originalUrl) {
      alert('Enter originalUrl!');
    }
    await shortenUrl(originalUrl);
  };

  return (
    <div>
      <h1>Shorten your link</h1>
      <form onSubmit={handleShorten}>
        <input
          type="text"
          placeholder="Enter URL here"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Shorten!</button>
      </form>
      {shortUrl && (
        <div>
          <p>Your link now looks like this:</p>
          <a href={originalUrl}>{shortUrl}</a>
        </div>
      )}
    </div>
  );
};

export default SearchForm;