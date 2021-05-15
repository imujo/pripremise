import { Element } from "react-scroll";

const Title = ({title}) => {
    return(
        <Element className="titleDiv" id={title}>
            <h3>{title}</h3>
        </Element> 
    )
}

export default Title;