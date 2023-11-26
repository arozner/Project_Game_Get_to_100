import React from "react";
export default function ActivePlayer({ objPlayer, updateObjPlayer, nextTurn, removePlayer, currentPlayer, winMode }) {
    const division = () => {
        if (objPlayer.number !== 0) {
            updateObjPlayer(objPlayer.playerName, "number", objPlayer.number = Math.floor(objPlayer.number / 2));
            console.log(objPlayer.number)
            updateObjPlayer(objPlayer.playerName, "numberMoves", objPlayer.numberMoves += 1);
            nextTurn(objPlayer);
        }
        else {
            alert("illegal action");
        }
    }
    const multiplication = () => {
        updateObjPlayer(objPlayer.playerName, "number", objPlayer.number *= 2);
        updateObjPlayer(objPlayer.playerName, "numberMoves", objPlayer.numberMoves += 1);
        nextTurn(objPlayer);
    }
    const minus = () => {
        updateObjPlayer(objPlayer.playerName, "number", objPlayer.number -= 1);
        updateObjPlayer(objPlayer.playerName, "numberMoves", objPlayer.numberMoves += 1);
        nextTurn(objPlayer);
    }
    const plus = () => {
        updateObjPlayer(objPlayer.playerName, "number", objPlayer.number += 1);
        updateObjPlayer(objPlayer.playerName, "numberMoves", objPlayer.numberMoves += 1);
        nextTurn(objPlayer);
    }
    return <div>
    <h2>name: {objPlayer.playerName}</h2>
    <h2>current number: {objPlayer.number}</h2>
    <h5>steps: {objPlayer.numberMoves}</h5>
    {!winMode && <div>
        <div>
            <button onClick={division} disabled={!currentPlayer}>/</button>
            <button onClick={multiplication} disabled={!currentPlayer}>x</button>
        </div>
        <div>
            <button onClick={minus} disabled={!currentPlayer}>-</button>
            <button onClick={plus} disabled={!currentPlayer}>+</button>
        </div>
    </div>}
    {winMode && <div>
        <h1>won!!!</h1>
        <h3>scores: {objPlayer.scores.map(item => `${item} / `)}</h3>
        <button className="quit" onClick={() => { removePlayer(objPlayer) }}>quit the game</button>
    </div>}
</div>
}




















