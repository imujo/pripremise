import { useContext, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import {FrontendContext} from '../../State/FrontendState'

const SortButton = () => {


    //#region Global State

        const {notSelectedGlobal, sortOrderGlobal} = useContext(FrontendContext)
        const [notSelected, ] = notSelectedGlobal
        const [sortOrder, setsortOrder] = sortOrderGlobal;

    //#endregion



    //#region Animation State
    
        const [isexpanded, setisexpanded] = useState(0)
        const [expand, setexpand] = useState(0)
        const [shrink, setshrink] = useState(0)
        
    //#endregion


    

    const iconClick = () => {
        if (isexpanded===0){
            setexpand(1)
        }else{
            setshrink(1)
            setisexpanded(0)
        }
    }
    
    const animationEnd = () => {
        if (expand===1){
            setexpand(0)
            setisexpanded(1)
        }
        if (shrink===1){
            setshrink(0)
        }
    }



    return(
        <div className="sortButtonDiv" >
            
            {/* NAME */}
            <div className="name">
                <p>{sortOrder}</p>
                <div 
                    className="expandIcon"
                    onClick={iconClick}
                    expand={expand}
                    shrink={shrink}
                    isexpanded={isexpanded}
                >
                    <FiChevronDown />
                </div>
            </div>


            {/* EXPANDED */}
            <div 
                className="expanded"
                isexpanded={isexpanded}
                expand={expand}
                shrink={shrink}
                onAnimationEnd={animationEnd}
            >
                {
                    isexpanded ?

                    notSelected.map((option, i)=>{
                        return(
                            <p 
                                key={i}
                                onMouseDown={()=>setsortOrder(option)}
                                onMouseUp={iconClick}
                            >
                                {option}
                            </p>
                        )  
                    })
                    :
                    <></>
                }
            </div>
        </div> 
    )
}

export default SortButton;