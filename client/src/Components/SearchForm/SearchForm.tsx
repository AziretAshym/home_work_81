import React, { useState } from 'react';
import axiosApi from '../../axiosApi.ts';
import './SearchForm.css';
import { toast } from 'react-toastify';

const SearchForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const shortenUrl = async (originalUrl: string) => {
    try {
      const response = await axiosApi.post('/urls', { originalLink: originalUrl });
      setShortUrl(`http://${response.data.shortLink}`);
      toast.success("Your link shortened successfully!");
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
    <div className="searchFormContainer">
      <h1 className="title">Shorten your link</h1>
      <form className="form" onSubmit={handleShorten}>
        <input
          type="text"
          className="input"
          placeholder="Enter URL here"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button className="button" type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div className="result">
          <p className="resultText">Your link now looks like this:</p>
          <a className="shortenedLink" href={originalUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
    </div>

  );
};

export default SearchForm;