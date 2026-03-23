type Props = {
  result: "win" | "lose" | null;
  playerMovesCount: number;
  maxMoves: number;
  secondsElapsed: number;
  totalSeconds: number;
  handleReset: () => void;
};

const getFunnyLine = (
  result: "win" | "lose" | null,
  secondsElapsed: number,
  totalSeconds: number,
  playerMovesCount: number,
  maxMoves: number,
) => {
  if (result === "win") {
    const timeRatio = secondsElapsed / totalSeconds;
    const moveRatio = playerMovesCount / maxMoves;

    if (timeRatio < 0.45 && moveRatio < 0.7) {
      return "That was suspiciously clean. We are investigating for wizard activity.";
    }

    if (timeRatio > 0.85 || moveRatio > 0.9) {
      return "Absolute clutch. Victory arrived wearing flip-flops, but it arrived.";
    }

    return "Your brain just did a backflip and landed perfectly.";
  }

  const ranOutOfTime = secondsElapsed > totalSeconds;
  const ranOutOfMoves = playerMovesCount > maxMoves;

  if (ranOutOfTime && ranOutOfMoves) {
    return "The clock booed, the moves vanished, and the cards are now judging you.";
  }

  if (ranOutOfTime) {
    return "Time looked at your strategy, laughed softly, and kept moving.";
  }

  if (ranOutOfMoves) {
    return "The move counter filed a formal complaint.";
  }

  return "The cards won this round, but they still look nervous about the rematch.";
};

function getTitle(result: "win" | "lose" | null) {
  return result === "win" ? "YOU HAVE ASCENDED ✨" : "EMOTIONAL DAMAGE 💀";
}

function getBadge(result: "win" | "lose" | null) {
  return result === "win" ? "Memory God Mode" : "Certified Card Victim";
}

export function FinishScreen({
  result,
  playerMovesCount,
  maxMoves,
  secondsElapsed,
  totalSeconds,
  handleReset,
}: Props) {
  const funnyLine = getFunnyLine(
    result,
    secondsElapsed,
    totalSeconds,
    playerMovesCount,
    maxMoves,
  );

  const title = getTitle(result);
  const badge = getBadge(result);
  const isWin = result === "win";

  return (
    <section className={`finish_container ${isWin ? "win" : ""}`}>
      {isWin && (
        <section>
          <div className="winning_title">{title}</div>
          <div className="winning_badge">{badge}</div>
          <div className="logo_finish_screen">🌟🌟🌟</div>
          <div className="funny_line_finish_screen">{funnyLine}</div>
          <button className="reset_button" onClick={handleReset}>
            PLAY AGAIN
          </button>
        </section>
      )}
      {!isWin && (
        <section>
          <div className="losing_title">{title}</div>
          <div className="losing_badge">{badge}</div>
          <div className="logo_finish_screen">💀💀💀</div>
          <div className="funny_line_finish_screen">{funnyLine}</div>
          <button className="reset_button" onClick={handleReset}>
            PLAY AGAIN
          </button>
        </section>
      )}
    </section>
  );
}
