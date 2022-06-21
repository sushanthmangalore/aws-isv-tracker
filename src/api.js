import { useState, useEffect } from "react";
import axios from 'axios'

export const USER_API = process.env.NODE_ENV === 'production' ? 'https://': 'http://localhost:8080';

export const useSingleHttp = (url, dependencies) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        if (dependencies.every(function (element) { return !!element; })) {
            axios.get(USER_API + url)
                .then(response => {
                    const fetchedData = response.data;
                    setIsLoading(false);
                    setFetchedData(fetchedData);
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                });
        } //eslint-disable-next-line
    }, dependencies)

    return [isLoading, fetchedData]
}

export const useMultipleHttp = (urls, dependencies) => {
    const [isLoading, setIsLoading] = useState(false)
    const [fetchedResults, setFetchedResults] = useState(null)
    
    useEffect(() => {
        if (dependencies.every(function (element) { return !!element; })) {
            setIsLoading(true)
            const mappedUrls = urls.map(url => axios.get(USER_API + url));
            axios.all(mappedUrls)
                .then(response => {
                    setFetchedResults(response);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                });
        } //eslint-disable-next-line
    }, dependencies)

    return [isLoading, fetchedResults]
}