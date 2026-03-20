type Props = {
  symbol: string;
  isFlippedUp: boolean;
  handleClickCard: () => void;
};

export function CardDesign({ symbol, isFlippedUp, handleClickCard }: Props) {
  return (
    <div
      className="card"
      onClick={handleClickCard}
      style={{
        backgroundColor: isFlippedUp
          ? "hsl(54, 75%, 18%)"
          : "hsl(54, 76%, 10%)",
        border: isFlippedUp
          ? "solid  hsla(10, 5%, 55%, 1)"
          : "solid hsl(54, 75%, 18%)",
        borderColor: isFlippedUp ? "hsla(10, 5%, 55%, 1)" : "hsl(54, 75%, 18%)",
      }}
    >
      <div className="oddcardinner">{isFlippedUp ? symbol : null}</div>
    </div>
  );
}
