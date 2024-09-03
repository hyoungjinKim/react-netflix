import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResult(request.data.results); // "result"를 "results"로 수정
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const renderSearchResults = () => {
    if (searchResult && searchResult.length > 0) {
      return (
        <section className="search-container">
          {searchResult.map((movie) => {
            if (movie.backdrop_path !== null && movie.media_type !== "person") {
              const movieImageUrl =
                "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;
              return (
                <div className="movie" key={movie.id}>
                  <div
                    onClick={() => {
                      navigate(`/${movie.id}`);
                    }}
                    className="movie__column-poster"
                  >
                    <img
                      src={movieImageUrl}
                      alt={movie.title || movie.name}
                      className="movie__poster"
                    />
                  </div>
                </div>
              );
            } else {
              return null; // 조건에 맞지 않는 경우 null을 반환하여 빈 요소를 방지
            }
          })}
        </section>
      );
    } else {
      return (
        <section className="no-results">
          <div className="no-result__text">
            <p>
              찾고자하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
            </p>
          </div>
        </section>
      );
    }
  };

  return renderSearchResults(); // JSX를 반환하도록 수정
};

export default SearchPage;
