import React, { useState } from 'react';
import BannerPlayers from './bannerPlayers';
import PlayersBoard from './playersBoard';
import './App.css';
function App() {
  const [arrActivePlayers, setArrActivePlayers] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const addPlayerToGame = name => {
    if (!arrActivePlayers.some(player => player.playerName === name)) {
      const newPlayer = {
        playerName: name,
        nextPlayer: {},
        firstPlayer: {},
        number: "",
        numberMoves: 0,
        scores: JSON.parse(localStorage.getItem(name)),
        victories: JSON.parse(localStorage.getItem(name)).length
      };
      const updatedArr = [...arrActivePlayers, newPlayer];
      newPlayer.nextPlayer = updatedArr[0];
      newPlayer.firstPlayer = updatedArr[((updatedArr.length - 1) * 2) % updatedArr.length];
      updatedArr[0].firstPlayer = updatedArr[updatedArr.length - 1];
      updatedArr[((updatedArr.length - 1) * 2) % updatedArr.length].nextPlayer = updatedArr[updatedArr.length - 1];
      setArrActivePlayers(updatedArr);
      console.log("creat",arrActivePlayers)
    }
    else {
      alert("The player is already in line");
    }
  };
  return (
    <div className="App">
      <BannerPlayers addPlayerToGame={addPlayerToGame} isStarted={isStarted} />
      <PlayersBoard
        arrActivePlayers={(arrActivePlayers)}
        setArrActivePlayers={setArrActivePlayers}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
      />
    </div>
  );
}
export default App;