import { useContext } from 'react';
import Card from './3-Card'
import {BackendContext} from '../../State/BackendState'

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.scss"
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

SwiperCore.use([ Pagination, Navigation ]);

const CardList = () => {

    const breakpoints = {
        0: {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 50
        },
        700: {
            slidesPerView: 2
        },
        1160: {
            slidesPerView: 3,
            centeredSlides: true
        },
        1800: {
            slidesPerView: 4,
        }

    }


    // State
    const {matureListGlobal} = useContext(BackendContext)
    const [matureList, ] = matureListGlobal



    var data = []

    return(
        <div className="cardListDiv" >




            <Swiper 
                className='splide'
                pagination={{ clickable: true }}
                breakpoints= {breakpoints}
                navigation
                allowTouchMove={false}
            >


                {matureList.map((matura, i) =>{
                    return(


                        <SwiperSlide className='test' key={i} >

                            <Card 
                                data={data}
                                predmet={matura.predmet}
                                dvijerazine={matura.dvijerazine}
                            />

                        </SwiperSlide>

                        
                    )
                })}


            </Swiper>

    
     

        </div> 
    )
}

export default CardList;