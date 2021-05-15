import React, {useState, createContext, useEffect} from 'react'

const FrontendContext = createContext();

const FrontendContextProvider = (props) => {
    
    // SORT
    const [notSelected, setnotSelected] = useState(['A - Z', 'Z - A'])
    const sortOptions = ['Popularno', 'A - Z', 'Z - A']
    const [sortOrder, setsortOrder] = useState('Popularno'); // ic ce u Backend Context

    useEffect(() => {

        let newOptions = []
        for (const option of sortOptions){
            if (option === sortOrder){
                continue
            }else{
                newOptions.push(option)
            }
        }
        setnotSelected(newOptions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortOrder])


    return(
        <FrontendContext.Provider value={{

            // SORT
            notSelectedGlobal: [notSelected, setnotSelected],
            sortOrderGlobal: [sortOrder, setsortOrder],
            
            
        }} >
            {props.children}
        </FrontendContext.Provider>
    )
}

export {FrontendContextProvider, FrontendContext};
