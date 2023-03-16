function QuoteList(props) {
    return (
      <ul>
        {props.quotes.map((quote) => (
          <li key={quote.title}>
            <h3>{quote.title}</h3>
            <p>{quote.description}</p>
          </li>
        ))}
      </ul>
    );
  }
  
  export default QuoteList;
  