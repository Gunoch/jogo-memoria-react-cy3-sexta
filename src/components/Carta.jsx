import React from 'react';

function Carta({ carta, onClick }) {
    const classes = [
        "carta",
        carta.virada ? "virada" : "",
        carta.combinada ? "combinada" : "",
    ]
    .join(" ")
    .trim();

    return(
        <div className={classes} onClick={onClick}>
            {carta.virada || carta.combinada ? carta.emoji : "?"}
        </div>
    );
}

export default Carta;
