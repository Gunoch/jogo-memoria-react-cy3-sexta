import React from 'react';

function Carta({ carta, onClick }) {
    const classes = [
        "carta",
        carta.virada ? "virada" : "",
        carta.combinada ? "combinada" : "",
    ]
    .join(" ")
    .trim();

    const isImage =
      typeof carta.emoji === 'string' &&
      (carta.emoji.startsWith('http') || carta.emoji.startsWith('/')) &&
      (/\.(png|jpe?g|svg|webp|gif)$/i).test(carta.emoji);

    return(
        <div className={classes} onClick={onClick}>
            {carta.virada || carta.combinada
                ? (isImage ? <img src={carta.emoji} alt="carta" /> : carta.emoji)
                : "?"}
        </div>
    );
}

export default Carta;
