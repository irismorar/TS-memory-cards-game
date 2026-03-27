type Props = {
  page: "tutorial" | "play" | "win" | "lose";
  playerMovesCount: number;
  maxMoves: number;
  secondsElapsed: number;
  maxSeconds: number;
  handleReset: () => void;
};

export function FinishScreen({
  page,
  playerMovesCount,
  maxMoves,
  secondsElapsed,
  maxSeconds,
  handleReset,
}: Props) {
  const funnyLine = getFunnyLine(
    page,
    secondsElapsed,
    maxSeconds,
    playerMovesCount,
    maxMoves,
  );
  const title = getTitle(page);
  const badge = getBadge(page);

  return (
    <section className={`finish_container ${page === "win" ? "win" : ""}`}>
      {page === "win" && (
        <section>
          <div className="winning_title">{title}</div>
          <div className="winning_badge">{badge}</div>
          <div className="logo_finish_screen">🌟🌟🌟</div>
          <div className="funny_line_finish_screen winning">{funnyLine}</div>
          <button className="reset_button winning_button" onClick={handleReset}>
            PLAY AGAIN
          </button>
        </section>
      )}
      {page === "lose" && (
        <section>
          <div className="losing_title">{title}</div>
          <div className="losing_badge">{badge}</div>
          <div className="logo_finish_screen">💀💀💀</div>
          <div className="funny_line_finish_screen losing">{funnyLine}</div>
          <button className="reset_button losing_button" onClick={handleReset}>
            PLAY AGAIN
          </button>
        </section>
      )}
    </section>
  );
}

const getFunnyLine = (
  page: "tutorial" | "play" | "win" | "lose",
  secondsElapsed: number,
  maxSeconds: number,
  playerMovesCount: number,
  maxMoves: number,
) => {
  if (page === "win") {
    const timeRatio = secondsElapsed / maxSeconds;
    const moveRatio = playerMovesCount / maxMoves;

    if (timeRatio < 0.45 && moveRatio < 0.7) {
      return "That was suspiciously clean. We are investigating for wizard activity!";
    }

    if (timeRatio > 0.85 || moveRatio > 0.9) {
      return "Absolute clutch. Victory arrived wearing flip-flops, but it arrived!";
    }

    return "Your brain just did a backflip and landed perfectly!";
  }

  const ranOutOfTime = secondsElapsed >= maxSeconds;
  const ranOutOfMoves = playerMovesCount >= maxMoves;

  if (ranOutOfTime && ranOutOfMoves) {
    return "The clock booed, the moves vanished, and the cards are now judging you!";
  }

  if (ranOutOfTime) {
    return "Time looked at your strategy, laughed softly, and kept moving!";
  }

  if (ranOutOfMoves) {
    return "The move counter filed a formal complaint!";
  }

  return "The cards won this round, but they still look nervous about the rematch!";
};

function getTitle(page: "tutorial" | "play" | "win" | "lose") {
  if (page === "win") {
    return "YOU HAVE ASCENDED 👑";
  }
  if (page === "lose") {
    return "EMOTIONAL DAMAGE 💀";
  }
}

function getBadge(page: "tutorial" | "play" | "win" | "lose") {
  if (page === "win") {
    return "Memory God Mode";
  }
  if (page === "lose") {
    return "Certified Card Victim";
  }
}
