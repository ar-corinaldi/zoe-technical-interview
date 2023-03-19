import React from "react";
import { ELEMENTS_PER_PAGE } from "../page/Match";

function PaginationButtons({
  agentsSize,
  elementsIndex,
  setElementsIndex,
}: {
  setElementsIndex: React.Dispatch<React.SetStateAction<number>>;
  elementsIndex: number;
  agentsSize: number;
}) {
  return (
    <>
      <button
        className="pagination-button"
        onClick={() => {
          setElementsIndex(
            (prevElementsIndex) => prevElementsIndex - ELEMENTS_PER_PAGE
          );
        }}
        disabled={elementsIndex <= 3 || agentsSize <= 3}
      >
        Show less -
      </button>
      <button
        className="pagination-button"
        onClick={() => {
          setElementsIndex(
            (prevElementsIndex) => prevElementsIndex + ELEMENTS_PER_PAGE
          );
        }}
        disabled={elementsIndex >= agentsSize}
      >
        Show more +
      </button>
    </>
  );
}

export default PaginationButtons;
