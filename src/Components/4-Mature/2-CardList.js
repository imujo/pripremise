import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useContext } from 'react';
import Card from './3-Card'
import {BackendContext} from '../../State/BackendState'

const CardList = () => {


    // Splide options
    let primaryOptions = {
        type: 'slide',
        autoWidth: true,
        drag: false,
        gap: '80px',
        rewind: true,
        perMove: 1,
        pagination: false,
        focus: 'center',
        trimSpace: false,
        start: 1,
        height: "auto",
        padding: {
            top: "10rem"
        }
    }

    // State
    const {matureListGlobal} = useContext(BackendContext)
    const [matureList, ] = matureListGlobal



    var data = []

    return(
        <div className="cardListDiv" >




            <Splide className='splide'  options={primaryOptions}>


                {matureList.map((matura, i) =>{
                    return(


                        <SplideSlide className='test' key={i} >

                            <Card 
                                data={data}
                                predmet={matura.predmet}
                                dvijerazine={matura.dvijerazine}
                            />

                        </SplideSlide>

                        
                    )
                })}


            </Splide>




        </div> 
    )
}

export default CardList;