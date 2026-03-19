import "./App.css";
import { useCardsLogic } from "./useCardsLogic";

export default function App() {
  const {
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
  } = useCardsLogic();

  return (
    <main>
      {page === "tutorial" && (
        <section>
          <section className="tutorial_text">
            <h1>Welcome to the Memory Cards Game</h1>
            <h3>where your brain gets a workout and your luck gets judged</h3>
            <p>
              Flip two cards at a time and try to find matching pairs. If they
              match, congrats, you’re officially smarter than you were 2 seconds
              ago. If not… well, at least you tried.
            </p>
            <p>
              But don’t get too comfortable! Each level comes with its own
              “tick-tock pressure”:
            </p>
            <p>4×4 grid → 60 seconds & maximum 19 moves</p>
            <p>6×6 grid → 140 seconds & maximum 39 moves</p>
            <p>8×8 grid → 220 seconds & maximum 67 moves</p>
            <p>
              Yes, we’re timing you. Yes, we’re counting your moves. No, we’re
              not judging… okay, maybe a little. Stay within the limits if you
              want to win or risk eternal shame (and a restart button).
            </p>{" "}
            <br />
            <p>Good luck, memory master. Try not to forget why you’re here!</p>
          </section>
          <section className="board_size_buttons_container">
            <button
              onClick={() => {
                setPageAtPlay();
                set4x4Board();
                set4x4BoardSize();
              }}
            >
              4x4
            </button>
            <button
              onClick={() => {
                setPageAtPlay();
                set6x6Board();
                set6x6BoardSize();
              }}
            >
              6x6
            </button>
            <button
              onClick={() => {
                setPageAtPlay();
                set8x8Board();
                set8x8BoardSize();
              }}
            >
              8x8
            </button>
          </section>
        </section>
      )}
      {page==="play" && ()}
    </main>
  );
}
