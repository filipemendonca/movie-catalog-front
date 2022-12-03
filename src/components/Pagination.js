import React from "react";
import { Button } from "@mui/material";

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({ limit, total, offset, setOffset, setPage }) => {
  const current = offset ? offset / limit + 1 : 1;
  const pages = Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(Math.max(current - MAX_LEFT, 1), maxFirst);

  function onPageChange(page) {
    setOffset((page - 1) * limit);
    setPage(page);
  }

  const renderControlsButton = (current, textButton, type, pages, onClick) => {
    return type === "P" ? (
      current === 1 ? (
        <Button
          variant="outlined"
          style={{ color: "ButtonShadow" }}
          disabled={current === 1}
        >
          {textButton}
        </Button>
      ) : (
        <Button variant="outlined" onClick={() => onClick()}>
          {textButton}
        </Button>
      )
    ) : current === pages ? (
      <Button
        variant="outlined"
        style={{ color: "ButtonShadow" }}
        disabled={current === pages}
      >
        {textButton}
      </Button>
    ) : (
      <Button variant="outlined" onClick={() => onClick()}>
        {textButton}
      </Button>
    );
  };

  return (
    <ul className="pagination">
      <li>
        {renderControlsButton(current, "Previous", "P", pages, () =>
          onPageChange(current - 1)
        )}
      </li>
      {Array.from({ length: Math.min(MAX_ITEMS, pages) })
        .map((_, index) => index + first)
        .map((page) => (
          <li key={page}>
            <Button
              variant={page === current ? "outlined" : null}
              style={{ color: "ButtonShadow" }}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          </li>
        ))}
      <li>
        {renderControlsButton(current, "Next", "N", pages, () =>
          onPageChange(current + 1)
        )}
      </li>
    </ul>
  );
};

export default Pagination;
