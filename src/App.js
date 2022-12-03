import React, { useEffect, useState } from "react";
import SearchInput from "../src/components/SearchInput.js";
import Pagination from "../src/components/Pagination";
import ApiCore from "./api/apiCore";
import qs from "qs";
import "./styles.css";
import { Constants } from "./shared/constants.js";
import { Button } from "@mui/material";

const LIMIT = 10;

export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);

  const onPressSearchMovies = (text) => {
    ApiCore(Constants.Methods.POST, Constants.BASE_URL, { title: text }, () => {
      window.location.reload();
    });
  };

  useEffect(() => {
    setInfo({});

    const query = {
      page: page,
      limit: LIMIT,
    };

    ApiCore(
      Constants.Methods.GET,
      `${Constants.BASE_URL}?${qs.stringify(query)}`,
      null,
      (response) => {
        setInfo(response);
        if (response.data) {
          const { meta } = response.data;
          setPage(meta.currentPage);
        }
      }
    );
  }, [page]);

  return (
    <div className="App">
      <h1>Movies</h1>
      <div className="form">
        <SearchInput
          value={text}
          onChange={(search) => setText(search)}
          label="Movies title"
        />
        <Button variant="outlined" onClick={() => onPressSearchMovies(text)}>
          Find movies
        </Button>
      </div>
      {info.data && (
        <Pagination
          limit={LIMIT}
          total={info.data.meta.totalItems}
          offset={offset}
          setOffset={setOffset}
          setPage={setPage}
        />
      )}
      {info.data && (
        <ul className="movies-list">
          {info.data.items.map((movie) => (
            <li key={movie.id} className="item">
              <img src={movie.banner} alt={movie.title} />
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
