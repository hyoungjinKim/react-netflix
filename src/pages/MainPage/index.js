import React from "react";
import requests from "../../api/requests";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
const MainPage = () => {
  return (
    <>
      <Banner />
      <Row
        title={"NTEFLIX ORIGINALS"}
        id={"NO"}
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title={"Trending Now"} id={"TN"} fetchUrl={requests.fetchTrending} />
      <Row title={"Tod Rated"} id={"TR"} fetchUrl={requests.fetchTopRated} />
      <Row
        title={"Action Movies"}
        id={"AM"}
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title={"Comedy Movies"}
        id={"CM"}
        fetchUrl={requests.fetchComedyMovies}
      />
    </>
  );
};

export default MainPage;
