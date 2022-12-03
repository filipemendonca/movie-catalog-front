import React, { useEffect, useRef, useState } from "react";
import SearchInput from "../src/components/SearchInput.js";
import Pagination from "../src/components/Pagination";
import ApiCore from "./api/apiCore";
import "./styles.css";

const LIMIT = 10;

export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);

  let idRef = useRef(1);

  const fetchInfo = () => {
    ApiCore(
      "get",
      !idRef.current
        ? `http://localhost:4000/catalog/getAll/${LIMIT}`
        : `http://localhost:4000/catalog/getAll/${LIMIT}/${idRef.current}`,
      (response) => {
        setInfo(response);
        idRef.current = response.data.lastId;
      }
    );
  };

  const onPressSearchMovies = (text) => {
    ApiCore(
      "post",
      `http://localhost:4000/catalog/updateDb?page=1&title=${text}`,
      () => {}
    );

    window.location.reload();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="App">
      <h1>Movies</h1>
      <div className="form">
        <SearchInput value={text} onChange={(search) => setText(search)} />
        <button onClick={() => onPressSearchMovies(text)}>Find movies</button>
      </div>
      {text && !info.data && <span>Loading...</span>}
      {info.data && (
        <ul className="movies-list">
          {info.data.catalog.map((movie) => (
            <li key={movie.id}>
              <img src={movie.banner} alt={movie.title} />
              {movie.title}
            </li>
          ))}
        </ul>
      )}
      {info.data && (
        <Pagination
          limit={LIMIT}
          total={info.data.count}
          offset={offset}
          setOffset={setOffset}
          lastId={idRef.current}
          handleCallback={fetchInfo}
        />
      )}
    </div>
  );
}
