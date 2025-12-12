import { useEffect, useState } from 'react';
import Tabuleiro from './components/Tabuleira';

const IMAGES = [
  'https://s2-techtudo.glbimg.com/smozxFbx9TrTHCLr9r-GhBareM4=/0x0:620x465/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/4/S/pCPqBaRTyx6rxjrvV1Ng/2012-11-30-imagem150.jpg',
  'https://sev.h-cdn.co/assets/17/21/1024x1024/square-1495650820-screen-shot-2017-05-24-at-23306-pm.jpg',
  'https://aldeiaconteudo.com.br/wp-content/uploads/2019/06/ciclo-de-vida-do-meme-aldeia-marketing-de-conteudo.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFSyhmtdYz6flhKoUlJD2C0C8DhXcJflUCcQ&shttps://bordalo.observador.pt/v2/q:60/rs:fill:980/c:770:433:nowe:0:0/plain/https://s3.observador.pt/wp-content/uploads/2016/09/29124952/meme_770x433_acf_cropped.jpg'
];

function App() {
  const [cartas, setCartas] = useState([]);
  const [primeira, setPrimeira] = useState(null);
  const [segunda, setSegunda] = useState(null);
  const [travado, setTravado] = useState(false);
  const [jogadas, setJogadas] = useState(0);
  const [pares, setPares] = useState(0);

  function criarBaralho() {
    const baralho = [];

    IMAGES.forEach((emoji, indice) => {
      baralho.push(
        { id: `${indice}-a`, emoji, virada: false, combinada: false },
        { id: `${indice}-b`, emoji, virada: false, combinada: false }
      );
    });

    for (let i = baralho.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [baralho[i], baralho[j]] = [baralho[j], baralho[i]];
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

    const novasCartas = cartas.slice();
    novasCartas[indice] = { ...cartaAtual, virada: true };
    setCartas(novasCartas);

    if (primeira === null) {
      setPrimeira(indice);
    } else if (segunda === null && indice !== primeira) {
      setSegunda(indice);
      setTravado(true);
      setJogadas((j) => j + 1);

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

  const terminou = pares === IMAGES.length;

  return (
    <div className="app">
      <h1 className="titulo">Jogo da memória</h1>
      <p className="subtitulo">Encontre todos os pares de imagens</p>

      <div className="painel-info">
        <span>Jogadas: {jogadas}</span>
        <button className="botao" onClick={novoJogo}>
          Reiniciar
        </button>
      </div>

      <Tabuleiro cartas={cartas} aoClicarNaCarta={aoClicarNaCarta} />

      {terminou && (
        <p className="mensagem-final">
          Parabéns! Você encontrou todos os pares em {jogadas} jogadas.
        </p>
      )}
    </div>
  );
}

export default App;
