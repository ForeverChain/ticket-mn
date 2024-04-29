import { Navbar } from "../../components/Navbar";
import { MovieInfoSection } from "./components/MovieInfoSection";
import { MovieInfoCollection } from "./components/MovieInfoCollection";
import { Footer } from "../../components/Footer";

const MovieDetailsPage = () => {
    return (
        <>
            <Navbar />
            <MovieInfoSection />
            <Footer />
        </>
    );
};

export default MovieDetailsPage;
