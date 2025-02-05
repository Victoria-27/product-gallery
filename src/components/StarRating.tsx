import React, { useEffect, useState } from "react";
import { StarRatingProps } from "../types/types";

const StarRating: React.FC<StarRatingProps> = ({
  numberOfStars,
  onChange,
  color = "#FFD337",
  readonly = false,
  value = 0,
  displayValue = false,
}) => {
  const [selectedStars, setSelectedStars] = useState(value);

  useEffect(() => {
    setSelectedStars(value);
  }, [value]);

  const handleStarClick = (index: number) => {
    if (readonly) return;
    const newRating = index + 1;
    setSelectedStars(newRating);
    if(onChange) {
        onChange(newRating);
    }
  };

  const renderStars = () => {
    return Array.from({ length: numberOfStars }, (_, index) => {
      const isFullStar = index < Math.floor(selectedStars);
      const isHalfStar = !isFullStar && index < selectedStars;
      return (
        <span
          key={index}
          style={{
            cursor: readonly ? "default" : "pointer",
            color: isFullStar ? color : "#A6A6A6",
            fontSize: "1.25rem",
            display: "inline-block",
            width: "1.25rem",
            overflow: "hidden",
            position: "relative",
          }}
          onClick={() => handleStarClick(index)}
        >
          ★
          {isHalfStar && (
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "1.25rem",
                overflow: "hidden",
                color: color,
                clipPath: "inset(0 10% 0 0)",
              }}
            >
              ★
            </span>
          )}
        </span>
      );
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">{renderStars()}</div>

      {displayValue ? <span>({value})</span> : null}
    </div>
  );
};

export default StarRating;
