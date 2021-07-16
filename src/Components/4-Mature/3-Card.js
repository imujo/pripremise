import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useContext, useEffect, useState } from 'react';
import RazineError from './RazineError'
import {iterateMatura, checkRazinaError, sendRequest} from '../../Functions'
import {BackendContext} from '../../State/BackendState'


const Card = ({predmet, dvijerazine, data}) => {
    const {preuzmiGlobal, requestGlobal, testGlobal} = useContext(BackendContext)

    const [test, setTest] = testGlobal

    let isSelectedDefault = 0 // store these in useRef
    let razinaADefault= false
    let razinaBDefault = false
    let yearsDefault = [2011, 2019]


   
    useEffect(() => {
        if (test[predmet] && test[predmet]['isselected']){
            isSelectedDefault = test[predmet]['isselected']
            razinaADefault= test[predmet]['razinaA']
            razinaBDefault = test[predmet]['razinaB']
            yearsDefault = test[predmet]['years']
        }
    }, [test])

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



    //#region From State


        const [isselected, setisselected] = useState(isSelectedDefault)
        const [years, setYears] = useState(yearsDefault);
        const [razinaA, setRazinaA] = useState(razinaADefault)
        const [razinaB, setRazinaB] = useState(razinaBDefault)
        const [razineerror, setrazineError] = useState(0)

    //#endregion


    
    //#region Global State

        const [preuzmi, ] = preuzmiGlobal
        const [, setrequest] = requestGlobal
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

    // ON PREUZMI
    useEffect(() => {
        checkRazinaError(isselected, dvijerazine, razinaA, razinaB) ? setrazineError(1) : setrazineError(0)

        if (isselected){
            sendRequest(data, predmet, years, dvijerazine, razinaA, razinaB, setrequest)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preuzmi])
    

    


    const addToTest = () => {
        setTest({...test, [predmet]: {
            isselected: isselected,
            dvijerazine: dvijerazine,
            razinaA: razinaA,
            razinaB: razinaB,
            years: years
        }})
    }   
    

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
                                onClick={()=>{setRazinaA(!razinaA);addToTest()}}
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
                                onClick={()=>{setRazinaB(!razinaB);addToTest()}}
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
                            onChange={(e, newYears)=>{setYears(newYears); addToTest()}}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            marks={marks}
                            min={2010}
                            max={2020}
                        />
                    </ThemeProvider>
                </div>



                {/* DESECT */}
                <p onClick={() => {reset(); addToTest()}} >Deselect</p>


            </div>


            :


            // SELECT
            <p onClick={() => {setopenanimation(1); iterateMatura(predmet); addToTest()}} >Select</p>
        
        
        }


        </div>
    )
}

export default Card;