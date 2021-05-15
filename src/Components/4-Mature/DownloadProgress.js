import { useContext } from "react";
import Loader from "react-loader-spinner";
import { useMediaQuery } from 'react-responsive'
import {BackendContext} from '../../State/BackendState'



const DownloadProgress = () => {


    //#region Global State

        const {processingGlobal, percentageGlobal, downloadedGlobal} = useContext(BackendContext);
        const [processing,] = processingGlobal;
        const [percentage,] = percentageGlobal;
        const [downloaded] = downloadedGlobal
        
    //#endregion



    //#region Frontend State

        let loadingWidth = 200
        if (useMediaQuery({query: '(max-width: 700px)'})){
            loadingWidth = 150
        }

    //#endregion
    
    

    return(
        <div className="downloadProgressDiv" >



            {/* PROCESSING */}
            {
                processing ?
                <div className="processing">
                    <Loader 
                        type='TailSpin'
                        color="#e79797"
                        height={30}
                        width={30}
                    />
                    <p>Processing...</p>
                </div>
                
                :
                undefined
            }



            {/* PERCENTAGE */}
            {
                percentage ?
                <div className="loading">
                    <div className="loaded" style={{width: loadingWidth*(percentage/100)}} ></div>
                </div>
            
                :
                undefined
            }



            {/* DOWNLOADED */}
            {
                downloaded ?
                    <p className='messageFont-s'>Preuzeto!</p>
                :
                undefined
            }



        </div> 
    )
}

export default DownloadProgress;