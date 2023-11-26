import React, { useState } from "react";
import ActivePlayer from "./activePlayer";
export default function PlayersBoard({ arrActivePlayers, setArrActivePlayers, isStarted, setIsStarted }) {
    const target = 100;
    const [isRoundOver, setIsRoundOver] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState();
    const updateObjPlayer = (name, key, value) => {
        setArrActivePlayers(arrActivePlayers.map(player => {
            if (player.playerName === name) { return { ...player, [key]: value }; }
            else { return player; }
        }));
    };
    const nextTurn = playerCalls => {
        const first = playerCalls.firstPlayer;
        const next = playerCalls.nextPlayer;
        if (playerCalls.number === target) {
            localStorage.setItem(playerCalls.playerName, JSON.stringify([...(JSON.parse(localStorage.getItem(playerCalls.playerName))), playerCalls.numberMoves]));
            arrActivePlayers.map(player => {
                if (player.playerName === first.playerName) {
                    player.nextPlayer = next;
                }
                else if (player.playerName === next.playerName) {
                    player.firstPlayer = first;
                }
                else if (player.playerName === playerCalls.playerName) {
                    const playerScores = JSON.parse(localStorage.getItem(playerCalls.playerName));
                    playerCalls.scores = playerScores;
                    player.firstPlayer = playerCalls;
                    player.nextPlayer = playerCalls;
                }
            });
        }
        if (arrActivePlayers.every(player => player.number === target)) {
            setIsStarted(false);
            setIsRoundOver(true);
        }
        setCurrentPlayer(next);
        console.log(arrActivePlayers);
    };
    const removePlayer = (playerToRemove) => {
        const first = playerToRemove.firstPlayer;
        const next = playerToRemove.nextPlayer;
        arrActivePlayers.forEach(player => {
            if (player.playerName === first.playerName) {
                first.nextPlayer = next;
            } else if (player.playerName === next.playerName) {
                next.firstPlayer = first;
            }
        });
        setArrActivePlayers(
            arrActivePlayers.filter(player => player.playerName !== playerToRemove.playerName)
        );
    };
    const newGame = () => {
        const length = arrActivePlayers.length;
        setIsRoundOver(false);
        arrActivePlayers.map((player, idx) => {
            player.number = Math.floor(Math.random() * target);
            player.numberMoves = 0;
            player.firstPlayer = arrActivePlayers[(idx + (length - 1)) % length];
            player.nextPlayer = arrActivePlayers[(idx + 1) % length];
        })
        setCurrentPlayer("");
        setIsStarted(true);
        nextTurn(arrActivePlayers[length - 1]);
    };
    const theFastPlayers = () => {
        const minPlayer = arrActivePlayers.reduce((minPlayer, currentPlayer) => {
            return currentPlayer.numberMoves < minPlayer.numberMoves ? currentPlayer : minPlayer;
        }, arrActivePlayers[0]);
        return arrActivePlayers.filter(player => player.numberMoves === minPlayer.numberMoves);
    };
    return <div className="players-board centered-container">
        {arrActivePlayers.length > 0 && !isStarted &&
            <button className="startgame" onClick={() => { newGame(); }}>start game!</button>}
        <div className="players-container">
            {arrActivePlayers.map((player, idx) =>
                <div className={`player-board ${currentPlayer?.playerName === player.playerName && isStarted ? `current-player` : `inactive-player`}`}>
                    <ActivePlayer
                        key={idx}
                        objPlayer={player}
                        updateObjPlayer={updateObjPlayer}
                        nextTurn={nextTurn}
                        removePlayer={removePlayer}
                        currentPlayer={currentPlayer?.playerName === player.playerName && isStarted}
                        winMode={player.number === target} />
                </div>)}
        </div>
        {isRoundOver && arrActivePlayers.length > 0 &&
            <div>
                <p>The round is over</p>
                <p>The fastest players are: {theFastPlayers().map(item => `${item.playerName}, `)} They finished the game in {theFastPlayers()[0].numberMoves} steps</p>
                <p>You can stay for another round and call more players</p>
            </div>}
    </div>
}












