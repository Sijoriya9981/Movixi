import { useEffect, useState } from 'react';
import fetchDataFromApi from '../utlis/api';

const useFetch = (url) => {

    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(null);
    const [error, seterror] = useState(null);

    useEffect(() => {

        setdata("loading..");
        seterror(null);
        setdata(null);

        fetchDataFromApi(url)
            .then((res) => {
                setloading(false);
                setdata(res);
            })
            .catch((err) => {
                setloading(false);
                seterror("Something went wrong");
            })


    }, [url])

    return { data, loading, error };



}

export default useFetch;