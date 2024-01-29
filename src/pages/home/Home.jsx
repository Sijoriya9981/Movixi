
import HeroBanner from './HeroBanner/Herobanner';
import Popular from './popular/Popular'
import TopRated from './topRated/Toprated'
import Treading from './trending/Trending'
const Home = () => {
    return (<>
        <div className="homepage">

            <HeroBanner />
            <Treading />
            <Popular />
            <TopRated />

        </div>

    </>)
}

export default Home;