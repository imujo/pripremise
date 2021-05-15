import React, {useState, createContext, useEffect, useContext, useRef} from 'react'
import {FrontendContext} from './FrontendState'
import {getMature, checkRazinaError, arrayObjectsToObjectObjects, requestDownload} from '../Functions'


const BackendContext = createContext();

const BackendContextProvider = (props) => {

    const {REACT_APP_IP} = process.env
    const initialRender = useRef(true)



    //#region GET MATURE


        //#region State

            // Sort Order
                const {sortOrderGlobal} = useContext(FrontendContext)
                const [sortOrder,] = sortOrderGlobal

            // Mature List
                const [matureList, setmatureList] = useState([])
                const [matureLoaded, setmatureLoaded] = useState(false)

        //#endregion

        // Get Mature
            useEffect(() => {
                getMature(sortOrder, setmatureList, setmatureLoaded)
            }, [REACT_APP_IP, sortOrder])


    //#endregion


    //#region DOWNLOAD MATURE

        //#region State

            // On Click and Request
                const [preuzmi, setpreuzmi] = useState(false)
                const [request, setrequest] = useState([])

            // Downloading
                const [processing, setprocessing] = useState(0)
                const [percentage, setpercentage] = useState(0)
                const [downloaded, setdownloaded] = useState(0)
        
        //#endregion


        // Download Mature
            useEffect(() => {
                
                let isError = 0
                for (const r of request){
                    const {dvijerazine, razinaA, razinaB} = r
                    if (checkRazinaError(1, dvijerazine, razinaA, razinaB)){
                        isError ++
                    }
                }
                if(initialRender.current){
                        initialRender.current = false;
                }else if (isError === 0){
                    setprocessing(1)
                    let objectObjects = arrayObjectsToObjectObjects(request)

                    requestDownload(objectObjects, setprocessing, setpercentage, setdownloaded)
                }


            }, [request])


    //#endregion
    

    //#region RETURN 
    return(
        <BackendContext.Provider value={{

            // MATURE LIST
            matureListGlobal: [matureList, setmatureList],
            matureLoadedGlobal: [matureLoaded, setmatureLoaded],
            preuzmiGlobal: [preuzmi, setpreuzmi],
            requestGlobal: [request, setrequest],
            processingGlobal: [processing, setprocessing],
            percentageGlobal:[percentage, setpercentage],
            downloadedGlobal: [downloaded, setdownloaded],

        }} >
            {props.children}
        </BackendContext.Provider>
    )
    //#endregion
}

export {BackendContextProvider, BackendContext};
