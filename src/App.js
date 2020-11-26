import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  const [quote, setQuote] = useState()
  const [character, setCharacter] = useState()
  const [image, setImage] = useState()
  const [character2, setCharacter2] = useState()
  const [image2, setImage2] = useState()
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)
  let url = "https://thesimpsonsquoteapi.glitch.me/quotes"


  let woohoo = new Audio("http://cs.klan-hub.ru/zombie/sound/misc/whoo.wav")
  let doh = new Audio("http://www.bobainsworth.com/wav/simpsons/doh.wav")
  const ranNum2 = Math.round(Math.random())
  function guesser(e) {
    console.log(e.target.src)
    if (e.target.src === image) {
      setScore(prevScore => score + 1)
      handleClick()
      woohoo.play()
    }
    else {
      handleClick()
      doh.play()
    }

  }


  const handleClick = () => {
    getQuote()
    getQuote2()
  }

  useEffect(() => { getQuote() }, [])
  const getQuote = () => {
    setLoading(true)
    fetch(url).then(res => res.json())
      .then(data => {
        setLoading(false)
        const ranNum = Math.floor(Math.random() * Math.floor(data.length));
        console.log(data[ranNum])
        setQuote(data[ranNum].quote)
        setCharacter(data[ranNum].character)
        setImage(data[ranNum].image)
      }, [character, image, ranNum2])
  }



  useEffect(() => { getQuote2() }, [])
  const getQuote2 = () => {
    setLoading(true)
    fetch(url).then(res => res.json())
      .then(data => {
        setLoading(false)
        const ranNum = Math.floor(Math.random() * Math.floor(data.length));
        console.log(data[ranNum])
        setCharacter2(data[ranNum].character)
        setImage2(data[ranNum].image)
      }, [character2, image2])
  }
  console.log(ranNum2)
  return (
    <div className="generator">
      <h1>Score: {score}</h1>
      <h1 class="quote">"{quote}"</h1>
      <div class="character-chooser" style={ranNum2 ? { flexDirection: "row-reverse" } : { flexDirection: "row" }}>
        <div id="char1">
          <h2 class="character"> {character}</h2>
          <img onClick={(e) => guesser(e)} src={image}></img>
        </div>
        <div id="char2">
          <h2 class="character2"> {character2}</h2>
          <img onClick={(e) => guesser(e)} src={image2}></img>
        </div>
      </div>
    </div>
  )
}

export default App;
