import React, { useState } from 'react';

function QuoteForm(props) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
  
    const submitHandler = (event) => {
      event.preventDefault();
  
      const quoteData = {
        title: enteredTitle,
        description: enteredDescription,
      };
  
      props.onAddQuote(quoteData);
  
      setEnteredTitle('');
      setEnteredDescription('');
    };
  
    return (
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={enteredTitle}
            onChange={(event) => setEnteredTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={enteredDescription}
            onChange={(event) => setEnteredDescription(event.target.value)}
          />
        </div>
        <button type="submit">Add Quote</button>
      </form>
    );
  }
  
  export default QuoteForm;
  