import { Link } from "react-scroll";
import {capitalize} from '../Functions'

function Nav() {

    const links = ['MATURE', 'KONTAKT']

    const returnLinks = (links) => {
        let comp = [];

        // LINKS
        for (let i = 0; i < links.length; i++){
            const link = links[i]
            comp.push(
                <Link
                    activeClass="active"
                    to={link}
                    spy={true}
                    smooth={true}
                    duration={400}
                    key={i}
                >
                    <li><p>{capitalize(link)}</p></li>
                </Link>
            )
        }
        return comp;
    }
    

    return (
      <nav>


        {/* LOGO */}
        <div className="logo"></div>



        {/* LINKS */}
        <ul className="links">
            {
                returnLinks(links)
            }
        </ul>



        {/* DONATE */}
        <div 
            className="doniraj btnFont"
            onClick={()=>alert('Trenutno ne primamo financijske donacije. Podržite nas tako da podijelite stranicu s drugima :)')}
            >
                Doniraj
        </div>


      </nav>
    );
  }
  
  export default Nav;
  