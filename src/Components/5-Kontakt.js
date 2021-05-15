import React, { useState } from 'react'
import {sendEmail} from '../Functions'

const Kontakt = () => {

    const [sent, setsent] = useState(0)
    const [notsent, setnotsent] = useState(0)

    return (
        <div className='kontaktDiv' >



            <form onSubmit={e => sendEmail(e, setsent, setnotsent)} > 
        
                {/* NAME */}
                <div className="nameDiv">
                    <input type="text" required className='fName input-narrow' placeholder='Ime' name='fName'/>
                    <input type="text" required className='lName input-narrow' placeholder='Prezime' name='lName' />
                </div>


                {/* EMAIL, MESSAGE & SUBMIT */}
                <input type="email" required className='email input-wide' placeholder='Email' name='email' />
                <textarea required className='message input-wide' placeholder='Poruka' name='message' />
                <input className='preuzmiButton btnFont' type="submit" value="Pošalji"/>


                {/* SENT ? */}
                <div className="sent" sent={sent} notsent={notsent} >
                    {sent ? <p className='messageFont-s' >Poslano!</p> : undefined}
                    {notsent ? <p className='messageFont-f'>Nije poslano...</p> : undefined}
                </div>
                   
            </form> 



            <div className="aboutDiv">

                <h3>O nama</h3>

                <div className="paragraph">     
                    <p>Tko smo mi?</p><br/><br/>
                    <p>Mi smo dva gimnazijalca koji su, potaknuti lošim iskustvom pripreme za maturu preko postojeće stranice za preuzimanje matura, odlučili pokušati pomoći ne samo sebi nego i svim budućim pristupnicima ispitu državne mature kako bi se što lakše i kvalitetnije pripremili za taj ispit.</p><br/>
                    <p>Želimo vam svu sreću u pripremama i pri polaganju ispita državne mature!</p>
                </div>

            </div>



        </div>
    )
}

export default Kontakt;
