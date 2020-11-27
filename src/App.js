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
  let url = "https://thesimpsonsquoteapi.glitch.me/quotes?count=10"


  let woohoo = new Audio("http://cs.klan-hub.ru/zombie/sound/misc/whoo.wav")
  let doh = new Audio("http://www.bobainsworth.com/wav/simpsons/doh.wav")
  const ranNum2 = Math.round(Math.random())
  function guesser(e) {
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
  }




  useEffect(() => { getQuote() }, [])
  const getQuote = () => {
    setLoading(true)
    fetch(url).then(res => res.json())
      .then(data => {

        const ranNum = Math.floor(Math.random() * Math.floor(data.length -1));

        function ranNum2() {
          const ranNum2 = Math.floor(Math.random() * Math.floor(data.length -1));

          if (ranNum === ranNum2 && ranNum2 !== data.length) {
            return ranNum2 + 1
          }
          else if (ranNum === ranNum2 && ranNum2 === data.length) {
            return ranNum2 - 1
          }

          else {
            return ranNum2
          }
        }


        const ranNum22 = ranNum2()
        const ranNum3 = Math.round(Math.random())
        console.log(ranNum22)
        setQuote(data[ranNum].quote)
        setCharacter(data[ranNum].character)
        setImage(data[ranNum].image)
        setCharacter2(data[ranNum22].character)
        setImage2(data[ranNum22].image)
        setLoading(false)
      }, [character, character2, image, image2, ranNum2])
  }



  return (
    <div className="generator">
      <h1>Score: {score}</h1>
      <h1 class="quote">"{quote}"</h1>
      <div class="character-chooser" style={Math.round(Math.random()) === 1 ? { flexDirection: "row-reverse" } : { flexDirection: "row" } && !loading ? { display: "flex" } : { display: "none" }}>
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
