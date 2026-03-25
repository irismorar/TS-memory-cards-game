import { useCallback, useEffect, useRef, useState } from "react";

const CARD_SYMBOLS_4x4: string[] = [
  "B",
  "10",
  "G",
  "🤍",
  "✨",
  "💭",
  "🌙",
  "X",
];
const CARD_SYMBOLS_6x6: string[] = [
  "B",
  "10",
  "G",
  "🤍",
  "✨",
  "💭",
  "🌙",
  "X",
  "🌟",
  "☁️",
  "😊",
  "Z",
  "⊕",
  "⊗",
  "🐣",
  "☀️",
  "💛",
  "Ⅶ",
];
const CARD_SYMBOLS_8x8: string[] = [
  "B",
  "10",
  "G",
  "🤍",
  "✨",
  "💭",
  "🌙",
  "X",
  "🌟",
  "☁️",
  "😊",
  "Z",
  "⊕",
  "⊗",
  "🐣",
  "☀️",
  "💛",
  "Ⅶ",
  "T",
  "L",
  "•",
  "☠️",
  "M",
  "∑",
  "∏",
  "🌈",
  "Ω",
  "🔥",
  "🕒",
  "🎉",
  "A",
  "S",
];

const MAX_PLAYER_MOVES_4x4 = 19;
const MAX_PLAYER_MOVES_6x6 = 39;
const MAX_PLAYER_MOVES_8x8 = 69;

const TOTAL_SECONDS_4x4 = 45;
const TOTAL_SECONDS_6x6 = 120;
const TOTAL_SECONDS_8x8 = 180;

const shuffleCards = (cardSymbols: string[]) => {
  const shuffleCardsValue = [...cardSymbols.concat(cardSymbols)];
  for (let i = shuffleCardsValue.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i + 1);
    const helper = shuffleCardsValue[i];
    shuffleCardsValue[i] = shuffleCardsValue[randomIndex];
    shuffleCardsValue[randomIndex] = helper;
  }
  return shuffleCardsValue;
};

export function useCardsLogic() {
  const [page, setPage] = useState<"tutorial" | "play" | "win" | "lose">(
    "tutorial",
  );
  const [selectedBoardSize, setSelectedBoardSize] = useState<
    "4x4" | "6x6" | "8x8" | null
  >(null);
  const [board, setBoard] = useState<string[]>([]);
  const [flippedUpCardIndices, setFlippedUpCardIndices] = useState<number[]>(
    [],
  );
  const [currentCardPairIndices, setCurrentCardPairIndices] = useState<
    number[]
  >([]);
  const [playerMovesCount, setPlayerMovesCount] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  const maxMoves =
    selectedBoardSize === "4x4"
      ? MAX_PLAYER_MOVES_4x4
      : selectedBoardSize === "6x6"
        ? MAX_PLAYER_MOVES_6x6
        : selectedBoardSize === "8x8"
          ? MAX_PLAYER_MOVES_8x8
          : 0;

  const maxSeconds =
    selectedBoardSize === "4x4"
      ? TOTAL_SECONDS_4x4
      : selectedBoardSize === "6x6"
        ? TOTAL_SECONDS_6x6
        : selectedBoardSize === "8x8"
          ? TOTAL_SECONDS_8x8
          : 0;

  const setPageAtPlay = useCallback(() => {
    setPage("play");
  }, []);

  const set4x4Game = useCallback(() => {
    setSelectedBoardSize("4x4");
    setBoard(shuffleCards(CARD_SYMBOLS_4x4));
    setSecondsElapsed(0);
    setPlayerMovesCount(0);
  }, []);

  const set6x6Game = useCallback(() => {
    setSelectedBoardSize("6x6");
    setBoard(shuffleCards(CARD_SYMBOLS_6x6));
    setSecondsElapsed(0);
    setPlayerMovesCount(0);
  }, []);

  const set8x8Game = useCallback(() => {
    setSelectedBoardSize("8x8");
    setBoard(shuffleCards(CARD_SYMBOLS_8x8));
    setSecondsElapsed(0);
    setPlayerMovesCount(0);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => {
        const next = prev + 1;

        if (next >= maxSeconds) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setPage("lose");
        }
        return next;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [maxSeconds]);

  const flipUpCard = (cardIndex: number) => {
    if (currentCardPairIndices.length >= 2) return;
    if (currentCardPairIndices.includes(cardIndex)) return;
    if (flippedUpCardIndices.includes(cardIndex)) return;

    if (currentCardPairIndices.length === 0) {
      setCurrentCardPairIndices([cardIndex]);
      return;
    }

    const firstCardIndex = currentCardPairIndices[0];
    const secondCardIndex = cardIndex;
    const firstCard = board[firstCardIndex];
    const secondCard = board[secondCardIndex];
    const nextMovesCount = playerMovesCount + 1;
    const currentPair = [firstCardIndex, secondCardIndex];

    setCurrentCardPairIndices(currentPair);
    setPlayerMovesCount(nextMovesCount);

    if (nextMovesCount >= maxMoves) {
      setPage("lose");
      return;
    }

    if (firstCard === secondCard) {
      const nextFlippedUp = [...flippedUpCardIndices, ...currentPair];
      setFlippedUpCardIndices(nextFlippedUp);
      setCurrentCardPairIndices([]);

      if (nextFlippedUp.length === board.length) {
        setPage("win");
      }
    } else {
      setTimeout(() => {
        setCurrentCardPairIndices([]);
      }, 700);
    }
  };

  // const flipUpCard = (cardIndex: number) => {
  //   if (currentCardPairIndices.length >= 2) {
  //     return;
  //   }

  //   const isFirstCardInPair = currentCardPairIndices.length === 0;
  //   if (isFirstCardInPair) {
  //     setCurrentCardPairIndices([cardIndex]);
  //     console.log("this is the first card in pair");
  //     return;
  //   }
  //   setCurrentCardPairIndices((prev) => [...prev, cardIndex]);

  //   const firstCardIndex = currentCardPairIndices[0];
  //   const secondCardIndex = cardIndex;
  //   const firstCard = board[firstCardIndex];
  //   const secondCard = board[secondCardIndex];

  //   setPlayerMovesCount((prev) => prev + 1);

  //   if (firstCard === secondCard) {
  //     setCurrentCardPairIndices([]);
  //     console.log("we have a new pair");
  //     setFlippedUpCardIndices((prev) => {
  //       return [...prev, firstCardIndex, secondCardIndex];
  //     });

  //     //it never takes this
  //     const hasPlayerLostByTooManyMoves = playerMovesCount >= maxMoves;
  //     if (hasPlayerLostByTooManyMoves) {
  //       setPage("lose");
  //       return;
  //     }

  //     //it never takes this
  //     const isLastPair = flippedUpCardIndices.length === board.length - 1;
  //     if (isLastPair) {
  //       console.log("this is the last pair of cards");
  //       setPage("win");
  //     }
  //   } else {
  //     setTimeout(() => {
  //       setCurrentCardPairIndices([]);
  //     }, 700);
  //   }
  // };

  const reset = useCallback(() => {
    setPage("tutorial");
    setFlippedUpCardIndices([]);
    setCurrentCardPairIndices([]);
    setSecondsElapsed(0);
    setPlayerMovesCount(0);
  }, []);

  return {
    page,
    board,
    flippedUpCardIndices,
    currentCardPairIndices,
    playerMovesCount,
    secondsElapsed,
    maxMoves,
    maxSeconds,
    setPageAtPlay,
    set4x4Game,
    set6x6Game,
    set8x8Game,
    flipUpCard,
    reset,
  };
}
