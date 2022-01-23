import { useEffect } from "react";
import ReactGA from "react-ga4";


const useGaTracker = () => {

    useEffect(() => {

        if (!window.GA_INITIALIZED) {
            console.log('react ga init')

            ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

            window.GA_INITIALIZED = true
        }
        console.log('runn')
        ReactGA.set({ page: '/' })
        ReactGA.pageview('/');

    }, []);
};

export default useGaTracker;