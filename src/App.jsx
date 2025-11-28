import { useState, useEffect, use } from 'react'
import Tabuleiro from "./components/Tabuleira"

function App() {
  const [cartas, setCartas] = useState([]);
  const [primeira, setPrimeira] = useState(null);
  const [segunda, setSegunda] = useState(null);
  const [travado, setTravado] = useState(false);
  const [jogas, setJogadas] = useState(0);
  const [pares, setPares] = useState(0);

  function criarBaralho() {
    const emojis = ["🐸", "🐱", "🐭", "🐷"];
    const baralho = [];

    emojis.forEach((emoji, indice) => {
      baralho.push(
        {id: `${indice}-a`, emoji, virada: false, combinada: false},
        {id: `${indice}-b`, emoji, virada: false, combinada: false}
      );
    });

    for (let i = criarBaralho.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [baralho[i], baralho[j] = [baralho[j], baralho[i]]]
    }
    return baralho;
  }

  function novoJogo() {
    setCartas(criarBaralho());
    setPrimeira(null);
    setSegunda(null);
    setTravado(false);
    setJogadas(0);
    setPares(0);
  }
  useEffect(() => {
    novoJogo();
  }, []);

  function aoClicarNaCarta(indice) {
    if (travado) return;

    const cartaAtual = cartas[indice];
    if (cartaAtual.virada || cartaAtual.combinada) return;

    const nocasCartas = cartas.slice();
    novasCartas[indice] = { ...cartaAtual, virada: true };
    setCartas(nocasCartas);

    if (primeira === null) {
      setPrimeira(indice);
    } else if (segunda === null && indice !== primeira) {
      setSegunda(indice);
      setTravado(true);
      setJogadas((j) => j+ 1);

      const primeiraCarta = novasCartas[primeira];
      const segundaCarta = novasCartas[indice];

      if (primeiraCarta.emoji === segundaCarta.emoji) {
        setTimeout(() => {
          const atualizadas = novasCartas.map((c, i) => {
            if (i === primeira || i === indice) {
              return { ...c, combinada: true };
            }
            return c;
          });
          setCartas(atualizadas);
          setPrimeira(null);
          setSegunda(null);
          setTravado(false);
          setPares((p) => p + 1);
        }, 400);
      } else {
        setTimeout(() => {
          const atualizadas = novasCartas.map((c, i) => {
            if (i === primeira || i === indice) {
              return { ...c, virada: false };
            }
            return c;
          });
          setCartas(atualizadas);
          setPrimeira(null);
          setSegunda(null);
          setTravado(false);
        }, 700);
      }
    }

  }
  const tereminou = pares === 4;
  return (
    <div>

    </div>
  );

}
export default App
