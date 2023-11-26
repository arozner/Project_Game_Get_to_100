import React from "react";
export default function RegisteredPlayer({ name, addPlayerToGame, isStarted }) {
    return <button
        onClick={() => addPlayerToGame(name)}
        disabled={isStarted}>
        {name}
    </button>;
}