import { useEffect, useState } from "react";
import { CollectionCard } from "../../../components/CollectionCard";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";

export const HomeCollection = () => {
  const override = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const searchWrd = searchParams.get("search") || "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/latestMovies`;
        if (searchWrd) {
          url += `?search=${searchWrd}`;
        }
        const response = await axios.get(url);
        setMovieData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    setSearchTerm(searchWrd);
    fetchData();
  }, [searchWrd]);

  const latestMoviesCards = movieData.map((latestMovie) => {
    return <CollectionCard key={latestMovie.id} {...latestMovie} />;
  });

  return (
    <section className="section-home-collection" id="nowShowing">
      <div className="home-collection-heading-container">
        <h1 className="heading-secondary heading-collection">
          Дэлгэцнээ гарч буй &rarr;
        </h1>
      </div>

      {loading && <HashLoader cssOverride={override} color="#eb3656" />}
      <div className="home-collection-container">
        {!loading && latestMoviesCards}
      </div>
    </section>
  );
};
