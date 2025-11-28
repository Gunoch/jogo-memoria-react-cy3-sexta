import React from "react";
import Carta from "./Carta";

function Tabuleiro({ cartas, aoClicarNaCarta }) {
    return(
        <div className="tabuleiro">
            {cartas.map ((carta, indice) => (
                <Carta
                    key={carta.id}
                    carta={carta}
                    onClick={() => aoClicarNaCarta(indice)}
                />
            ))}
        </div>
    );
}
export default Tabuleiro;