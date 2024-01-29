import { useState, useEffect } from 'react';
import './style.scss'
import { useNavigate } from "react-router-dom"
import useFetch from '../../../customHooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../component/lazyLoadImage/Img';
import ContentWrapper from '../../../component/contentWrapper/ContentWrapper';

const HeroBanner = () => {

    const [background, setbackground] = useState("");
    const [query, setquery] = useState("");
    const navigate = useNavigate();
    const { data, loading } = useFetch("/movie/upcoming")
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        /* "?." is  optionalchanning=> agar "data" undefined hoga toh aage ka code nhi chalega  */
        setbackground(bg);


    }, [data])

    const searchqueryhandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

    return (
        <div className="heroBanner">

            {!loading && < div className="backdrop-img">

                <Img src={background} />
            </div>}

            <div className="opacity-layer"></div>

            <ContentWrapper >
                <div className="wrapper">
                    <div className="herobannercontent">
                        <span className="title">Welcome</span>
                        <span className="subtitle">Millions of Movies,TV shows and people to discover. Explore now.</span>

                        <div className="searchinput">
                            <input type="text" name="" id="" placeholder='Search for movies & tv shows ' onChange={(e) => setquery(e.target.value)} onKeyUp={searchqueryhandler} />
                            <button>Search</button>
                        </div>
                    </div>

                </div>



            </ContentWrapper>


        </div>
    )
}

export default HeroBanner;