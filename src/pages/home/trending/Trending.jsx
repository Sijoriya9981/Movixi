import { useState } from "react";
import './style.scss'
import Switchtab from "../../../component/switchTab/SwitchTab";
import ContentWrapper from "../../../component/contentWrapper/ContentWrapper";



import useFetch from "../../../customHooks/useFetch";
import Carousel from "../../../component/Carousel/Carousel";
const Treading = () => {
    const [endpoint, setendpoint] = useState("day");

    const { data, loading } = useFetch(`/trending/all/${endpoint}`);

    const ontabchange = (tab) => {
        setendpoint(tab === "Day" ? "day" : "week");
    };
    return (<>
        <div className="carouselSection">
            <ContentWrapper >

                <span className="carouselTitle">Trending</span>
                <Switchtab data={["Day", "Week"]} ontabchange={ontabchange} />

            </ContentWrapper >
            <Carousel data={data?.results} loading={loading} />

        </div>

    </>)
}

export default Treading;