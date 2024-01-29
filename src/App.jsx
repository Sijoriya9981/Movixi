
import { useEffect } from 'react'
import './App.css'
Footer
import { useSelector, useDispatch } from 'react-redux';
import { getapiconfiguration, getGenres } from './store/HomeSlice';


import Header from './component/header/Header'
import Footer from './component/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/Searchresult'
import Explore from './pages/explore/Explore';
import Error from './pages/pageNotFound/PageNotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import fetchDataFromApi from './utlis/api';

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((store) => store.home);
  console.log(url);
  useEffect(() => {


    fetchApiConfig();
    genresCall();

  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",

        }
        dispatch(getapiconfiguration(url));
      });

  }

  // mutliple api call ke liye promise ak use
  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];

    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises);
    // geners
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    })
    dispatch(getGenres(allGenres));
  }
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<Error />} />

      </Routes>

      <Footer />
    </BrowserRouter>

  );
}

export default App

