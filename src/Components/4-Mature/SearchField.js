import React from 'react'
import { useContext } from 'react'
import {BackendContext} from '../../State/BackendState'


function SearchField() {

    const {searchFieldGlobal} = useContext(BackendContext)
    const [searchField, setSearchField] = searchFieldGlobal

    return (
        <div className='searchFieldArea'>
            <div className="searchFieldDiv">
                <input type='text' value={searchField} onChange={(e)=>setSearchField(e.target.value)} className='searchInput' placeholder='Pretraži mature' />
                <div 
                    className="searchIcon"
                    onClick={()=>setSearchField('')}
                ></div>
            </div>
        </div>
    )
}

export default SearchField
