import React, { useState } from "react";
import RegisteredPlayer from "./registeredPlayer";
export default function BannerPlayers({ addPlayerToGame, isStarted }) {
    const [namePlayer, setNamePlayer] = useState('');
    const [bannerPlayers, setBannerPlayers] = useState([...Object.keys(localStorage)]);
    const addPlayerInBanner = () => {
        if (namePlayer && !bannerPlayers.includes(namePlayer) && bannerPlayers.length < 20) {
            setBannerPlayers([...bannerPlayers, namePlayer])
            localStorage.setItem(namePlayer, JSON.stringify([]))
        }
        else if (!namePlayer) { alert("Please enter a name!") }
        else if (bannerPlayers.includes(namePlayer)) { alert("The name exists in the system, please choose another name.") }
        else if (bannerPlayers.length >= 20) { alert("Sorry fully booked!") };
        setNamePlayer("");
    }
    return <div className="banner">
    <button className="registration" onClick={() => { addPlayerInBanner() }}>registration</button>
    <input
        name="registration"
        placeholder="Register here"
        value={namePlayer}
        onChange={event => setNamePlayer(event.target.value)}>
    </input>
    {bannerPlayers.map((player, idx) =>
        <RegisteredPlayer
            key={idx}
            name={player}
            addPlayerToGame={addPlayerToGame}
            isStarted={isStarted}
        />)}
</div>
}