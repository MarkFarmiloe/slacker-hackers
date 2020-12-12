import React, {useState, useEffect} from 'react';
import './filter.css'

const locationArr = ['Birmingham','London','Manchester','Glasgow'];
const classArr = ['WestMidlands Class 1','WestMidlands Class 2','London Class 1','London Class 2'];
const performanceArr = ['Good','Average','Poor'];

const data ={
    "locations": [
        {
            "city": "Birmingham",
            "classes": [
                "West Midlands class 1",
                "West Midlands class 2"
            ]
        },
        {
            "city": "London",
            "classes": [
                "London class 1",
                "London class 2"
            ]
        },
        {
            "city": "Manchester",
            "classes": [
                "Manchester class 1"
            ]
        },
        {
            "city": "Glasgow",
            "classes": [
                "Glasgow class 1"
            ]
        }
    ],
    "performance": [
        "Good",
        "Average",
        "Poor"
    ]
}


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

    // useEffect(() => {
        // fetch('https://slacker-hackers.herokuapp.com/api/filter')
        // .then(res => res.json())
        // .then(data=> console.log(data))
        // .catch(err => console.log(err))
    // }, [])
    let filteredLocationObj;
    filteredLocationObj = data.locations.filter(item => item.city == optionLocation )
    return (
        <div className='filter-section'>
                <div className='select-box'>
                    <span>Filter by:</span>
                    <select onChange={handleLocationChange} className='select-location'>
                        <option disabled selected hidden>Location</option>
                        {
                            // locationArr.map((location, index) => <option key={index}>{location}</option>)

                            data.locations.map((location, index) => <option key={index}>{location.city}</option>)
                        }
                    </select>
                    <select onChange={handleClassChange} className='select-class'>
                        <option disabled selected hidden>Class</option>
                        {
                           filteredLocationObj.length > 0 ? 
                           filteredLocationObj[0].classes.map((item,index) => <option key={index}>{item}</option>)
                            :
                            ''
                        }
                    </select>
                    <select onChange={handlePerformanceChange} className='select-performance'>
                        <option disabled selected hidden>Performance</option>
                        {
                            data.performance.map((performance, index) => <option key={index}>{performance}</option>)
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
