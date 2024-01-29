import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import PosterFallback from "../../assets/no-poster.png";
import './style.scss'

import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import Img from "../lazyLoadImage/Img";
import ContentWrapper from "../contentWrapper/ContentWrapper";
const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();

    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (direction) => {
        const container = carouselContainer.current;

        const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behaviour: "smooth"

        })
    }
    const skItems = () => {
        return (
            <div className="skeletonItem ">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock ">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>

            </div>
        )
    }
    return (<>

        <div className="carousel" >
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}

                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow" style={{ color: "white" }}
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRightNav arrow" style={{ right: "30px", color: "white" }}
                    onClick={() => navigation("right")}
                />

                {!loading ?
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterurl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            return (

                                <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                    <div className="posterBlock">
                                        <Img src={posterurl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />


                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>
                                        <span className="date">{dayjs(item.release_Date).format("D MMM , YYYY")}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>


                    : <div className="loadingSkeleton">
                        {skItems()}
                        {skItems()}
                        {skItems()}
                        {skItems()}
                        {skItems()}


                    </div>}
            </ContentWrapper>

        </div>

    </>)
}

export default Carousel;