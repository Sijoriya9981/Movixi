import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";



// import avatar from "../../../assets/avatar.png";
import avatar from "../../assets/avatar.png"
// import ContentWrapper from "../../component/Contentwrapper/Contentwrapper";
// import Img from "../../component/LazyLoadimage/Img";
import ContentWrapper from "../../component/contentWrapper/ContentWrapper";
import Img from '../../component/lazyLoadImage/Img'
const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading" >Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item, index) => {

                            let imgurl = item.profile_path ? url.profile + item.profile_path : avatar
                            return (
                                <div key={index} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgurl}></Img>
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">{item.character}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;