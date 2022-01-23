import { useEffect } from "react";
import ReactGA from "react-ga";


const useGaTracker = () => {
    const location = {pathname: '/'};

    useEffect(() => {

        if (!window.GA_INITIALIZED) {
            console.log('react ga init')

            ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

            window.GA_INITIALIZED = true
        }
        console.log('runn')
        ReactGA.set({ page: location.pathname })
        ReactGA.pageview(location.pathname + location.search);

    }, [location]);
};

export default useGaTracker;