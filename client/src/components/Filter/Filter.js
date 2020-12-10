import React, {useState, useEffect} from 'react';
import './filter.css'

const locationArr = ['Birmingham','London','Manchester','Glasgow'];
const classArr = ['WestMidlands Class 1','WestMidlands Class 2','London Class 1','London Class 2'];

 function Filter() {

    const [optionLocation, setOptionLocation] = useState('');
    const [optionClass, setOptionClass] = useState('');
    const [searchVal, setSearchVal] = useState('');

    const handleLocationChange = e => {
        setOptionLocation(e.target.value);
    }
    const handleClassChange = e => {
        setOptionClass(e.target.value)
    }
    const handleSearch = e => {
        setSearchVal(e.target.value)   
    }


    return (
        <div className='filter-section'>

            <div className='select-box'>
                <span>Filter by:</span>
                <select onChange={handleLocationChange} className='select-location'>
                    <option disabled hidden>Location</option>
                    {
                        locationArr.map((location, index) => <option key={index}>{location}</option>)
                    }
                </select>
                <select onChange={handleClassChange} className='select-class'>
                    <option disabled hidden>Class</option>
                    {
                        classArr.map((item,index) => <option key={index}>{item}</option>)
                    }
                </select>
            </div>
            
            <div className='search-box'>
                <span>Search:</span>
                <input onChange={handleSearch} className='search-input' type='search' placeholder='Search student name ...' />
            </div>
            
        </div>
    )
}

export default Filter;
