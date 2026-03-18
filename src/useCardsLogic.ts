import { useRef, useState } from "react";

const CARD_SYMBOLS_4x4: string[] = ["B", "8", "₿", "🤍", "✨", "💭", "🌙", "฿"];
const CARD_SYMBOLS_6x6: string[] = [
  "B",
  "8",
  "₿",
  "🤍",
  "✨",
  "💭",
  "🌙",
  "฿",
  "🌟",
  "☁️",
  "🩶",
  "β",
  "⊕",
  "⊗",
  "⊙",
  "☀️",
  "🌞",
  "⚪",
];
const CARD_SYMBOLS_8x8: string[] = [
  "B",
  "8",
  "₿",
  "🤍",
  "✨",
  "💭",
  "🌙",
  "฿",
  "🌟",
  "☁️",
  "🩶",
  "β",
  "⊕",
  "⊗",
  "⊙",
  "☀️",
  "🌞",
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
const MAX_PLAYER_MOVES_6x6 = 35;
const MAX_PLAYER_MOVES_8x8 = 60;

const TOTAL_SECONDS_4x4 = 60;
const TOTAL_SECONDS_6x6 = 120;
const TOTAL_SECONDS_8x8 = 180;

export function useCards() {
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
          return [...prev, firstCardIndex, secondCardIndex];
        });
        setCurrentCardPairIndices([]);
      }
    }
  };

  const hasPlayerWon = () => {
    switch (selectedBoardSize) {
      case "4x4": {
        return playerMovesCount < MAX_PLAYER_MOVES_4x4 && timerRef.current != 0;
      }
      case "6x6": {
        return playerMovesCount < MAX_PLAYER_MOVES_6x6 && timerRef.current != 0;
      }
      case "8x8": {
        return playerMovesCount < MAX_PLAYER_MOVES_8x8 && timerRef.current != 0;
      }
      default:
        return false;
    }

    return {
      page,
      selectedBoardSize,
      board,
      flippedUpCardIndices,
      playerMovesCount,
      secondsElapsed,
      flipUpCard,
      hasPlayerWon,
    };
  };
}
