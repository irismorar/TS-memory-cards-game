import { useCallback, useEffect, useRef, useState } from "react";

const CARD_SYMBOLS_4x4: string[] = ["B", "8", "þ", "🤍", "✨", "💭", "🌙", "฿"];
const CARD_SYMBOLS_6x6: string[] = [
  "B",
  "8",
  "þ",
  "🤍",
  "✨",
  "💭",
  "🌙",
  "฿",
  "🌟",
  "☁️",
  "😊",
  "P",
  "⊕",
  "⊗",
  "🐣",
  "☀️",
  "💛",
  "⚪",
];
const CARD_SYMBOLS_8x8: string[] = [
  "B",
  "8",
  "þ",
  "🤍",
  "✨",
  "💭",
  "🌙",
  "฿",
  "🌟",
  "☁️",
  "😊",
  "P",
  "⊕",
  "⊗",
  "🐣",
  "☀️",
  "💛",
  "⚪",
  "∅",
  "ℚ",
  "≈",
  "≠",
  "≡",
  "∑",
  "∏",
  "💫",
  "⭐",
  "💛",
  "🌕",
  "🌔",
  "∆",
  "∇",
];

const MAX_PLAYER_MOVES_4x4 = 19;
const MAX_PLAYER_MOVES_6x6 = 39;
const MAX_PLAYER_MOVES_8x8 = 67;

const TOTAL_SECONDS_4x4 = 60;
const TOTAL_SECONDS_6x6 = 120;
const TOTAL_SECONDS_8x8 = 180;

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
  const timerRef = useRef<number | null>(null);

  const setPageAtPlay = useCallback(() => {
    setPage("play");
  }, []);

  const setPageAtFinish = useCallback(() => {
    setPage("finish");
  }, []);

  const set4x4BoardSize = useCallback(() => {
    setSelectedBoardSize("4x4");
  }, []);

  const set6x6BoardSize = useCallback(() => {
    setSelectedBoardSize("6x6");
  }, []);

  const set8x8BoardSize = useCallback(() => {
    setSelectedBoardSize("8x8");
  }, []);

  const set4x4Board = useCallback(() => {
    setBoard(CARD_SYMBOLS_4x4);
  }, []);

  const set6x6Board = useCallback(() => {
    setBoard(CARD_SYMBOLS_6x6);
  }, []);

  const set8x8Board = useCallback(() => {
    setBoard(CARD_SYMBOLS_8x8);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => {
        if (selectedBoardSize === "4x4" && prev === TOTAL_SECONDS_4x4) {
          setPage("finish");
        }
        if (selectedBoardSize === "6x6" && prev === TOTAL_SECONDS_6x6) {
          setPage("finish");
        }
        if (selectedBoardSize === "8x8" && prev === TOTAL_SECONDS_8x8) {
          setPage("finish");
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [selectedBoardSize]);

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
        if (selectedBoardSize === "4x4" && prev === MAX_PLAYER_MOVES_4x4) {
          setPage("finish");
        }
        if (selectedBoardSize === "6x6" && prev === MAX_PLAYER_MOVES_6x6) {
          setPage("finish");
        }
        if (selectedBoardSize === "8x8" && prev === MAX_PLAYER_MOVES_8x8) {
          setPage("finish");
        }
        return prev + 1;
      });
      const firstCardIndex = currentCardPairIndices[0];
      const secondCardIndex = cardIndex;
      const firstCard = board[firstCardIndex];
      const secondCard = board[secondCardIndex];
      if (firstCard === secondCard) {
        setFlippedUpCardIndices((prev) => {
          return [...prev, firstCardIndex, secondCardIndex];
        });
        setCurrentCardPairIndices([]);
        if (selectedBoardSize === "4x4" && flippedUpCardIndices.length === 16) {
          setPage("finish");
        }
        if (selectedBoardSize === "6x6" && flippedUpCardIndices.length === 36) {
          setPage("finish");
        }
        if (selectedBoardSize === "8x8" && flippedUpCardIndices.length === 64) {
          setPage("finish");
        }
      } else {
        setTimeout(() => {
          setCurrentCardPairIndices([]);
        }, 700);
      }
    }
  };

  // const hasPlayerWon = () => {
  //   switch (selectedBoardSize) {
  //     case "4x4": {
  //       return (
  //         playerMovesCount < MAX_PLAYER_MOVES_4x4 &&
  //         secondsElapsed < TOTAL_SECONDS_4x4
  //       );
  //     }
  //     case "6x6": {
  //       return (
  //         playerMovesCount < MAX_PLAYER_MOVES_6x6 &&
  //         secondsElapsed < TOTAL_SECONDS_6x6
  //       );
  //     }
  //     case "8x8": {
  //       return (
  //         playerMovesCount < MAX_PLAYER_MOVES_8x8 &&
  //         secondsElapsed < TOTAL_SECONDS_8x8
  //       );
  //     }
  //     default:
  //       return false;
  //   }
  // };

  const reset = useCallback(() => {
    setPage("tutorial");
    setFlippedUpCardIndices([]);
    setCurrentCardPairIndices([]);
    setSecondsElapsed(0);
  }, []);

  return {
    page,
    selectedBoardSize,
    board,
    flippedUpCardIndices,
    playerMovesCount,
    secondsElapsed,
    setPageAtPlay,
    setPageAtFinish,
    set4x4BoardSize,
    set6x6BoardSize,
    set8x8BoardSize,
    set4x4Board,
    set6x6Board,
    set8x8Board,
    flipUpCard,
    reset,
  };
}
