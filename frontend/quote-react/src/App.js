import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import QuoteForm from './components/QuoteForm';
import QuoteList from './components/QuoteList';

function App() {
  const [quotes, setQuotes] = useState([]);

  const addQuoteHandler = (quote) => {
    setQuotes((prevQuotes) => {
      return [...prevQuotes, quote];
    });
  };

  return (
    <div>
      <QuoteForm onAddQuote={addQuoteHandler} />
      <QuoteList quotes={quotes} />
    </div>
  );
}

export default App;
