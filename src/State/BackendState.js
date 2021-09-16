import React, {useState, createContext, useEffect, useContext} from 'react'
import {FrontendContext} from './FrontendState'
import {getMature, checkRazinaError, arrayObjectsToObjectObjects, requestDownload, getSelected} from '../Functions'


const BackendContext = createContext();

const BackendContextProvider = (props) => {

    const {REACT_APP_IP} = process.env



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

            // Downloading
                const [processing, setprocessing] = useState(0)
                const [percentage, setpercentage] = useState(0)
                const [downloaded, setdownloaded] = useState(0)
        
        //#endregion


        // Download Mature
            const download = () => {
                let isError = 0

                const data = getSelected(predmetiList)
                if (data.length){
                    for (const obj of data){
                        const {dvijerazine, razinaA, razinaB} = obj
                        if (checkRazinaError(1, dvijerazine, razinaA, razinaB)){
                            isError ++
                        }
                    }
    
                    if (isError === 0){
                        setprocessing(1)
                        let objectObjects = arrayObjectsToObjectObjects(data)
    
                        requestDownload(objectObjects, setprocessing, setpercentage, setdownloaded)
                    }
                }else{
                    console.log('no selected')
                }
            }
            


    //#endregion

    
    const [predmetiList, setPredmetiList] = useState([])
    
    
    useEffect(() => {
        let predmeti = []
        for (let i=0; i<matureList.length; i++){
            const obj = matureList[i]
            predmeti.push({ predmet: obj.predmet, isselected: false, dvijerazine: obj.dvijerazine, razinaA: false, razinaB: false, years: [2011, 2019]})

        }
        setPredmetiList(predmeti)
    }, [matureList])
    


    //#region RETURN 
    return(
        <BackendContext.Provider value={{

            // MATURE LIST
            matureListGlobal: [matureList, setmatureList],
            matureLoadedGlobal: [matureLoaded, setmatureLoaded],
            preuzmiGlobal: [preuzmi, setpreuzmi],
            processingGlobal: [processing, setprocessing],
            percentageGlobal:[percentage, setpercentage],
            downloadedGlobal: [downloaded, setdownloaded],
            predmetiListGlobal: [predmetiList, setPredmetiList],
            download: download

        }} >
            {props.children}
        </BackendContext.Provider>
    )
    //#endregion
}

export {BackendContextProvider, BackendContext};
