import CardList from './2-CardList'
import DownloadProgress from './DownloadProgress'
import Loader from "react-loader-spinner";
import SortButton from './SortButton';
import { useMediaQuery } from 'react-responsive'
import {BackendContext} from '../../State/BackendState'
import { useContext } from 'react';


const Mature = () => {

    //#region State

        const {matureLoadedGlobal, preuzmiGlobal} = useContext(BackendContext)
        const [matureLoaded, ] = matureLoadedGlobal
        const [preuzmi, setpreuzmi] = preuzmiGlobal

    //#endregion

    //#region Loader size

        let loaderSize = 100
        if (useMediaQuery({query: '(max-width: 700px)'})){
            loaderSize = 70
        }
    
    //#endregion

    return(
        <div className="matureDiv" >




            {/* DOWNLOAD STATUS */}
            <DownloadProgress />
    



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
    )
}

export default Mature;