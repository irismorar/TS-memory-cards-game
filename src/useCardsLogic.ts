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
  const [page, setPage] = useState<"tutorial" | "play" | "finish">("tutorial");
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
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const timerRef = useRef<number | null>(null);

  const maxMoves =
    selectedBoardSize === "4x4"
      ? MAX_PLAYER_MOVES_4x4
      : selectedBoardSize === "6x6"
        ? MAX_PLAYER_MOVES_6x6
        : selectedBoardSize === "8x8"
          ? MAX_PLAYER_MOVES_8x8
          : 0;

  const totalSeconds =
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
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const flipUpCard = (cardIndex: number) => {
    if (page !== "play") {
      return;
    }
    if (currentCardPairIndices.length < 2) {
      setCurrentCardPairIndices((prev) => {
        return [...prev, cardIndex];
      });
    }
    if (currentCardPairIndices.length === 1) {
      setPlayerMovesCount((prev) => {
        return prev + 1;
      });
      const firstCardIndex = currentCardPairIndices[0];
      const secondCardIndex = cardIndex;
      const firstCard = board[firstCardIndex];
      const secondCard = board[secondCardIndex];
      if (firstCard === secondCard) {
        setFlippedUpCardIndices((prev) => {
          const updated = [...prev, firstCardIndex, secondCardIndex];
          if (updated.length === board.length) {
            setPage("finish");
          }
          return updated;
        });
        setCurrentCardPairIndices([]);
      } else {
        setTimeout(() => {
          setCurrentCardPairIndices([]);
        }, 700);
      }
    }
  };

  const reset = useCallback(() => {
    setPage("tutorial");
    setFlippedUpCardIndices([]);
    setCurrentCardPairIndices([]);
    setSecondsElapsed(0);
    setPlayerMovesCount(0);
  }, []);

  useEffect(() => {
    if (page !== "play") {
      return;
    }
    if (board.length === 0) {
      return;
    }
    if (
      flippedUpCardIndices.length === board.length &&
      secondsElapsed <= totalSeconds &&
      playerMovesCount <= maxMoves
    ) {
      setResult("win");
      setPage("finish");
    }
  }, [
    board.length,
    flippedUpCardIndices.length,
    maxMoves,
    page,
    playerMovesCount,
    secondsElapsed,
    totalSeconds,
  ]);

  useEffect(() => {
    if (page !== "play") {
      return;
    }
    if (secondsElapsed > totalSeconds || playerMovesCount > maxMoves) {
      setResult("lose");
      setPage("finish");
    }
  }, [maxMoves, page, playerMovesCount, secondsElapsed, totalSeconds]);

  return {
    page,
    board,
    flippedUpCardIndices,
    currentCardPairIndices,
    playerMovesCount,
    secondsElapsed,
    result,
    maxMoves,
    totalSeconds,
    setPageAtPlay,
    set4x4Game,
    set6x6Game,
    set8x8Game,
    flipUpCard,
    reset,
  };
}
