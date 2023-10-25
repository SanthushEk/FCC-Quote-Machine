import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("Life is 10% what happens to me and 90% of how I react to it.")
  const [author, setAuthor] = useState("Charles Swindoll")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuoteArray] = useState(null)
  const [accentcolor, setAccentColor] = useState('#282c34')
  const [fadeOut, setFadeOut] = useState(false);

  const fetchQuote = async (quoteDBUrl) => {
    const response = await fetch(quoteDBUrl)
    const parseJSON = await response.json()
    setQuoteArray(parseJSON.quotes)
    console.log(parseJSON)
  }

  useEffect(() => {
    fetchQuote(quoteDBUrl)
  }, [quoteDBUrl])


  const getRandomQuote = () => {
    setFadeOut(true);
    setTimeout(() => {
      let randomInteger = Math.floor(quotesArray.length * Math.random());
      setRandomNumber(randomInteger);
      setAccentColor(COLORS_ARRAY[randomInteger]);
      setQuote(quotesArray[randomInteger].quote);
      setAuthor(quotesArray[randomInteger].author);
      setFadeOut(false);
    }, 500); 
  };

  return (
    <div className="App" >
      <header className="App-header" style={{ backgroundColor: accentcolor, color: accentcolor,transition: 'background-color 0.5s, color 0.5s' }}>

        <div id="quote-box" style={{ color: accentcolor }}>


          <p id="text" className={fadeOut ? 'fadeOut' : ''}>
           {quote}
          </p>

          <p id="author" className={fadeOut ? 'fadeOut' : ''}>
            - {author}
          </p>

          <div className='button'>
            <a id="tweet-quote"  style={{ backgroundColor: accentcolor }} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote}, -${author}`)}><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></a>
          </div>
          <button id="new-quote"  style={{ backgroundColor: accentcolor }} onClick={() => getRandomQuote()}>New Quote</button>
        </div>

      </header>
    </div>
  );
}

export default App;
