import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useContext } from 'react';
import Card from './3-Card'
import {BackendContext} from '../../State/BackendState'

const CardList = () => {


    // Splide options
    let primaryOptions = {
        // type: 'loop',
        start: 3,
        autoWidth: true,
        drag: false,
        gap: '40px',
        rewind: true,
        perMove: 1,
        pagination: false,
        focus: 'center',
        trimSpace: false,
        height: "auto",
    }




    // State
    const {filteredMatureList} = useContext(BackendContext)


    var data = []

    return(
        <div className="cardListDiv" >




            <Splide className='splide'  options={primaryOptions} >


                {filteredMatureList.map((matura, i) =>{
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