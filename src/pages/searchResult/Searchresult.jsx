import './searchstyle.scss'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import fetchDataFromApi from '../../utlis/api'
import ContentWrapper from '../../component/contentWrapper/ContentWrapper'

MovieCard
Spinner
import noResults from '../../assets/no-results.png'
import { useEffect, useState } from 'react'
// import MovieCard from '../../component/movieCard/MovieCard'
// import Spinner from '../../component/Spinner/Spinner'
import Spinner from '../../component/Spinner/Spinner'
import MovieCard from '../../component/movieCard/MovieCard'
MovieCard

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pagenum, setpagenum] = useState(1);
    const [loading, setloading] = useState(false);

    const { query } = useParams();

    const fetchInitialData = () => {
        setloading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then((res) => {
            setData(res);
            setpagenum((pre) => pre + 1);
            setloading(false);
        })
    }

    useEffect(() => {
        setpagenum(1)
        fetchInitialData();


    }, [query])

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then((res) => {
            if (data?.results) {
                setData({ ...data, results: [...data?.results, ...res.results] })
            }
            else {
                setData(res);
            }
        })
    }

    return (<>

        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}

            {!loading && (
                <ContentWrapper>
                    {data?.results.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Serach ${data?.total_results > 1 ? "results" : "result"}  of ${query}`}
                            </div>
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.results.length || []}
                                next={fetchNextPageData}
                                hasMore={pagenum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.mediaType === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true} >

                                        </MovieCard>
                                    )

                                })}
                            </InfiniteScroll>



                        </>


                    ) :
                        (<span className="resultNotFound">
                            Sorry , Results not found!
                        </span>)

                    }

                </ContentWrapper>
            )}

        </div>

    </>)
}

export default SearchResult;