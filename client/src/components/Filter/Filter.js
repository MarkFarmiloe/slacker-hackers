import React, {useState, useEffect} from 'react';
import './filter.css'

 function Filter(prop) {

    const [data, setData] = useState({});
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

    useEffect(() => {
        fetch('https://slacker-hackers.herokuapp.com/api/filter')
        .then(res => res.json())
        .then(data=> setData(data))
        .catch(err => console.log(err))
    }, [data])

    //filter the data depending what a teacher select on the Location dropdown 
    let filteredLocationObj;
    Object.entries(data) != 0 ? filteredLocationObj = data.locations.filter(item => item.city == optionLocation ) : '';

    return Object.entries(data) != 0 ? (
        <div className='filter-section'>
                <div className='select-box'>
                    <span>Filter by:</span>
                    <select onChange={handleLocationChange} className='select-location'>
                        <option disabled selected hidden>Location</option>
                        {
                            data.locations.map((location, index) => <option key={index}>{location.city}</option>)
                        }
                    </select>
                    <select onChange={handleClassChange} className='select-class'>
                        <option disabled selected hidden>Class</option>
                        {
                            filteredLocationObj.length > 0 
                            ? 
                            filteredLocationObj[0].classes.map((item,index) => <option key={index}>{item}</option>)
                            :
                            <option disabled>Select Location First</option>
                        }
                    </select>
                    <select onChange={handlePerformanceChange} className='select-performance'>
                        <option disabled selected hidden>Performance</option>
                        {/* edit by zubeda */}
                        <option>Select All</option>
                        {
                            data.performance.map((performance, index) => <option key={index}>{performance}</option>)
                        }
                        
                    </select>
                </div>
                
                <div className='search-box'>
                    <span>Search:</span>
                    <input onChange={handleSearch} className='search-input' type='search' placeholder='Search student name ...' />
                </div>

           

            
        </div>
    )
    :
    '';
}

export default Filter;
