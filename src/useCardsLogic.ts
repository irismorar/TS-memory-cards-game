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

const MAX_PLAYER_MOVES_4x4 = 20;
const MAX_PLAYER_MOVES_6x6 = 60;
const MAX_PLAYER_MOVES_8x8 = 135;

const TOTAL_SECONDS_4x4 = 35;
const TOTAL_SECONDS_6x6 = 120;
const TOTAL_SECONDS_8x8 = 450;

const shuffleCards = (cardSymbols: string[]) => {
  const shuffleCardsValue = [...cardSymbols.concat(cardSymbols)];
  for (let i = shuffleCardsValue.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
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
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const [playerMovesCount, setPlayerMovesCount] = useState(maxMoves);

  const setPageAtPlay = useCallback(() => {
    setPage("play");
  }, []);

  const set4x4Game = useCallback(() => {
    setSelectedBoardSize("4x4");
    setBoard(shuffleCards(CARD_SYMBOLS_4x4));
    setSecondsElapsed(0);
    setPlayerMovesCount(MAX_PLAYER_MOVES_4x4);
  }, []);

  const set6x6Game = useCallback(() => {
    setSelectedBoardSize("6x6");
    setBoard(shuffleCards(CARD_SYMBOLS_6x6));
    setSecondsElapsed(0);
    setPlayerMovesCount(MAX_PLAYER_MOVES_6x6);
  }, []);

  const set8x8Game = useCallback(() => {
    setSelectedBoardSize("8x8");
    setBoard(shuffleCards(CARD_SYMBOLS_8x8));
    setSecondsElapsed(0);
    setPlayerMovesCount(MAX_PLAYER_MOVES_8x8);
  }, []);

  useEffect(() => {
    if (page !== "play") {
      return;
    }
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
  }, [maxSeconds, page]);

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
    const nextMovesCount = playerMovesCount - 1;
    const currentPair = [firstCardIndex, secondCardIndex];

    setCurrentCardPairIndices(currentPair);
    setPlayerMovesCount(nextMovesCount);

    if (nextMovesCount === 0) {
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
    selectedBoardSize,
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
