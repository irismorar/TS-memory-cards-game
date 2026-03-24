import "./App.css";
import { CardDesign } from "./CardDesign";
import { FinishScreen } from "./FinishScreen";
import { useCardsLogic } from "./useCardsLogic";

export default function App() {
  const {
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
  } = useCardsLogic();

  return (
    <main>
      {page === "tutorial" && (
        <section className="tutorial_container">
          <section className="tutorial_text">
            <h1>Welcome to the Memory Cards Game</h1>
            <h3>where your brain gets a workout and your luck gets judged</h3>
            <section>
              <p>
                Flip two cards at a time and try to find matching pairs. If they
                match, congrats, you’re officially smarter than you were 2
                seconds ago. If not… well, at least you tried.
              </p>
              <p>
                But don’t get too comfortable! Each level comes with its own
                “tick-tock pressure”:
              </p>
              <div>
                <p>
                  <span>4×4</span> grid → <span>60</span> seconds &{" "}
                  <span>19</span> moves
                </p>
                <p>
                  <span>6×6</span> grid → <span>140</span> seconds &{" "}
                  <span>39</span> moves
                </p>
                <p>
                  <span>8×8</span> grid → <span>220</span> seconds &{" "}
                  <span>67</span> moves
                </p>
              </div>
              <p>
                Yes, we’re timing you. Yes, we’re counting your moves. No, we’re
                not judging… okay, maybe a little. Stay within the limits if you
                want to win or risk eternal shame (and a restart button).
              </p>
              <p>
                Good luck, memory master. Try not to forget why you’re here!
              </p>
            </section>
          </section>
          <section className="board_size_buttons_container">
            <button
              onClick={() => {
                setPageAtPlay();
                set4x4Game();
              }}
            >
              4x4
            </button>
            <button
              onClick={() => {
                setPageAtPlay();
                set6x6Game();
              }}
            >
              6x6
            </button>
            <button
              onClick={() => {
                setPageAtPlay();
                set8x8Game();
              }}
            >
              8x8
            </button>
          </section>
        </section>
      )}
      {page === "play" && (
        <section className="game_wrapper">
          <div className="header_game_container">
            {secondsElapsed} / {playerMovesCount}
          </div>
          <section className="game_container">
            {board.map((currentCardSymbol, index) => {
              return (
                <CardDesign
                  key={index}
                  symbol={currentCardSymbol}
                  isFlippedUp={
                    currentCardPairIndices.includes(index) ||
                    flippedUpCardIndices.includes(index)
                  }
                  handleClickCard={() => {
                    flipUpCard(index);
                  }}
                />
              );
            })}
          </section>
        </section>
      )}
      {page === "lose" ||
        (page === "win" && (
          <FinishScreen
            page={page}
            playerMovesCount={playerMovesCount}
            maxMoves={maxMoves}
            secondsElapsed={secondsElapsed}
            maxSeconds={maxSeconds}
            handleReset={() => reset()}
          />
        ))}
    </main>
  );
}
