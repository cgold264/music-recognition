import React, { useEffect } from "react";
import FacialDetection from "./components/FacialDetection";
import Home from "./components/Home"
import Navbar from "./components/Navbar";
import EmotionSongs from "./components/EmotionSongs";
import VibeSongs from "./components/VibeSongs";
import Footer from "./components/Footer";
import AOS from "aos";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "./assets/vendor/aos/aos.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css" ;
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/style.css";

const queryClient = new QueryClient();



function App() {

  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>

      <main id="main bg-dark">
        <Navbar />
        <Home />
        <FacialDetection />
        <EmotionSongs />
        <VibeSongs />
        {
          //<Contact />
        }
        <Footer />
      </main>
    </QueryClientProvider>

  );
}

export default App;
