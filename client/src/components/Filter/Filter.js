import React, {useState, useEffect} from 'react';
import './filter.css'

const locationArr = ['Birmingham','London','Manchester','Glasgow'];
const classArr = ['WestMidlands Class 1','WestMidlands Class 2','London Class 1','London Class 2'];
const performanceArr = ['Good','Average','Poor'];

 function Filter(prop) {

    const [optionLocation, setOptionLocation] = useState('');
    const [optionClass, setOptionClass] = useState('');
    const [optionPerformance, setPerformanceClass] = useState('');
    const [searchVal, setSearchVal] = useState('');
    
    /////////////////////////////edit by zubeda
    function filterFunc(location){
      
        (prop.filterFunc(location))
    }
    function filterPerformance(performance){
        (prop.filterFunc(performance))
    }
    function filterName(name){
        (prop.filterFunc(name))
    }
    ////////////////////////////////////////

    const handleLocationChange = e => {
        setOptionLocation(e.target.value);
        filterFunc(e.target.value)//edit by zubeda
        
    }
    const handleClassChange = e => {
        setOptionClass(e.target.value)
        filterFunc(e.target.value)//edit by zubeda
    }
    const handlePerformanceChange = e => {
        setPerformanceClass(e.target.value)
        filterPerformance(e.target.value)
    }
    const handleSearch = e => {
        setSearchVal(e.target.value)
        filterName(e.target.value) 
      
    }
    
    return (
        <div className='filter-section'>
                <div className='select-box'>
                    <span>Filter by:</span>
                    <select onChange={handleLocationChange} className='select-location'>
                        <option disabled selected hidden>Location</option>
                        {
                            locationArr.map((location, index) => <option key={index}>{location}</option>)
                        }
                    </select>
                    <select onChange={handleClassChange} className='select-class'>
                        <option disabled selected hidden>Class</option>
                        {
                            classArr.map((item,index) => <option key={index}>{item}</option>)
                        }
                    </select>
                    <select onChange={handlePerformanceChange} className='select-performance'>
                        <option disabled selected hidden>Performance</option>
                        {
                            performanceArr.map((item,index) => <option key={index}>{item}</option>)
                        }
                        {/* edit by zubeda */}
                        <option>Select All</option>
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
