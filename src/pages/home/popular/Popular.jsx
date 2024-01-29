import { useState } from "react";
import Switchtab from "../../../component/switchTab/SwitchTab";
import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";
import useFetch from "../../../customHooks/useFetch";
import Carousel from "../../../component/Carousel/Carousel";
const Popular = () => {
    const [endpoint, setendpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/popular`);

    const ontabchange = (tab) => {
        setendpoint(tab === "Movies" ? "movie" : "tv");
    };
    return (<>
        <div className="carouselSection">
            <ContentWrapper >

                <span className="carouselTitle">What's Popular</span>
                <Switchtab data={["Movies", "TvShow"]} ontabchange={ontabchange} />

            </ContentWrapper >
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />

        </div>

    </>)
}

export default Popular;