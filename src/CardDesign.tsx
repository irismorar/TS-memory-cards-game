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
        backgroundColor: isFlippedUp ? "#14570d" : "#0a2d06",
        border: isFlippedUp ? "solid  #928887" : "solid #50490b",
        borderColor: isFlippedUp ? "#928887" : "#50490b",
      }}
    >
      <div className="oddcardinner">{isFlippedUp ? symbol : null}</div>
    </div>
  );
}
