import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useContext, useEffect, useState } from 'react';
import RazineError from './RazineError'
import {iterateMatura, updateStateArray} from '../../Functions'
import {BackendContext} from '../../State/BackendState'


const Card = ({predmet, dvijerazine, data}) => {


    //#region Frontend State

        const [markStep, setmarkStep] = useState(2)


        const muiTheme = createMuiTheme({
            overrides:{
            MuiSlider: {
                thumb:{
                color: "white",
                },
                track: {
                color: 'white',
                height: 4,
                },
                rail: {
                color: '#704646',
                height: 3,
                },
                mark: {
                    color: '#661515',
                    height: 3,
                },
                valueLabel: {
                    color: '#ab2424'
                },
                markLabelActive: {
                    color: '#661515'
                },
                markLabel: {
                    color: '#943a3a'
                }
            }
        }
        });


        var marks = []
        for (let i = 2010; i <= 2020; i=i+markStep) {
            marks.push({
                value: i,
                label: String(i)
            })
        }

        
        useEffect(() => {
            if (window.innerWidth < 500){
                setmarkStep(3)
            }    
            
        }, [])

    //#endregion



    //#region Form State

        const [isselected, setisselected] = useState(0)
        const [years, setYears] = useState([2011, 2019]);
        const [razinaA, setRazinaA] = useState(false)
        const [razinaB, setRazinaB] = useState(false)
        const [razineerror, setrazineError] = useState(0)

    //#endregion


    
    //#region Global State

        const {predmetiListGlobal} = useContext(BackendContext)

        const [predmetiList, setPredmetiList] = predmetiListGlobal


        

 
    //#endregion



    //#region Animation State

        const [closeanimation, setcloseanimation] = useState(0)
        const [openanimation, setopenanimation] = useState(0)

    //#endregion



    // ON ANIMATION END
    const selectToggle = ()=> {

        if (openanimation===1){
            setopenanimation(0)
            setisselected(1)
        }else{
            setcloseanimation(0)
        }
    }

    // RESET
    const reset = () => {
        setisselected(0)
        setcloseanimation(1)
        setrazineError(0);
        setYears([2011, 2019]);
    }

    
    


    // Update global state
    useEffect(() => {
        if (isselected === 1){
            updateStateArray(predmet, 'isselected', true, predmetiList, setPredmetiList)
        }else{
            updateStateArray(predmet, 'isselected', false, predmetiList, setPredmetiList)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isselected, predmet, setPredmetiList])


    useEffect(() => {
        let timeout = setTimeout(()=>updateStateArray(predmet, 'years', years, predmetiList, setPredmetiList), 500)

        return () => {
            clearTimeout(timeout)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [years, predmet, setPredmetiList])


    useEffect(() => {
        updateStateArray(predmet, 'razinaA', razinaA, predmetiList, setPredmetiList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [razinaA, predmet, setPredmetiList])


    useEffect(() => {
        
        updateStateArray(predmet, 'razinaB', razinaB, predmetiList, setPredmetiList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [razinaB, predmet, setPredmetiList])


    
    
    

    return(
        <div 
            className="cardDiv"
            isselected={isselected}
            openanimation={openanimation}
            closeanimation={closeanimation}
            onAnimationEnd={selectToggle}
        >



            <h4>{predmet}</h4>
        



        {
            // IS SELECTED
            isselected ? 

            <div>



                {
                    // RAZINE
                    dvijerazine ? 
                    <div className="razine">
                        <div className="razinaA">
                            <label htmlFor="razinaA"><p>A</p></label>
                            <input 
                                type="checkbox" 
                                name="razinaA" 
                                id="razinaA" 
                                className='checkbox'
                                onClick={()=>setRazinaA(!razinaA)}
                            />
                        </div>
                        <RazineError razineerror={razineerror} />
                        <div className="razinaB">
                            <label htmlFor="razinaB"><p>B</p></label>
                            <input 
                                type="checkbox" 
                                name="razinaB" 
                                id="razina" 
                                className='checkbox' 
                                onClick={()=>setRazinaB(!razinaB)}
                            />
                        </div>
                    </div>
                    :
                    <div></div>
                }



                {/* YEAR SLIDER */}
                <div className="yearSlider">
                    <ThemeProvider theme={muiTheme}>
                        <Slider
                            value={years}
                            onChange={(e, newYears)=>setYears(newYears)}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={marks}
                            min={2010}
                            max={2020}
                        />
                    </ThemeProvider>
                </div>



                {/* DESECT */}
                <p onClick={() => reset()} >Deselect</p>


            </div>


            :


            // SELECT
            <>
                <img className="icon" alt="predmet icon" src={`${process.env.PUBLIC_URL}/icons/${predmet}.svg`}></img>
                <p onClick={() => {setopenanimation(1); iterateMatura(predmet)}} >Select</p>
            </>
        
        
        }


        </div>
    )
}

export default Card;