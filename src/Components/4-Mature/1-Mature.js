import CardList from './2-CardList'
import DownloadProgress from './DownloadProgress'
import Loader from "react-loader-spinner";
import SortButton from './SortButton';
import { useMediaQuery } from 'react-responsive'
import {BackendContext} from '../../State/BackendState'
import { useContext } from 'react';
import SearchField from './SearchField'


const Mature = () => {

    //#region State

        const {matureLoadedGlobal, preuzmiGlobal,processingGlobal, percentageGlobal, downloadedGlobal} = useContext(BackendContext)
        const [matureLoaded, ] = matureLoadedGlobal
        const [preuzmi, setpreuzmi] = preuzmiGlobal
        const [processing,] = processingGlobal;
        const [percentage,] = percentageGlobal;
        const [downloaded] = downloadedGlobal

    //#endregion

    //#region Loader size

        let loaderSize = 100
        if (useMediaQuery({query: '(max-width: 700px)'})){
            loaderSize = 70
        }
    
    //#endregion


    return(
        <div className="matureBackground">
            
            <div className="matureDiv" >




            {/* DOWNLOAD STATUS */}
            {
                processing || percentage || downloaded ? 
                    
                    <DownloadProgress />
                :
                    <SearchField />
            }
    



            {/* CARD LIST */}
            {
                matureLoaded ?
                <CardList />
                :
                <Loader 
                    type='TailSpin'
                    color="#e79797"
                    height={loaderSize}
                    width={loaderSize}
                />
            }




            {/* SORT */}
            <SortButton />




       
            {/* PREUZMI BUTTON */}
            <div 
                className="preuzmiBtn btnFont" 
                onClick={()=>setpreuzmi(!preuzmi)}
            >
                Preuzmi
            </div>
            



        </div> 

        </div>
        
    )
}

export default Mature;