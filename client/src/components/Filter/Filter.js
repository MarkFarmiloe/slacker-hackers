import React, {useState, useEffect} from 'react';
import './filter.css'
import moment from 'moment'

 function Filter(prop) {

    const [data, setData] = useState({});
    const [optionLocation, setOptionLocation] = useState('');
    const [optionClass, setOptionClass] = useState('');
    const [optionPerformance, setPerformanceClass] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [range, setRange] = useState('');

    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
 

    /////////////////////////////edit by zubeda
   function applyFunc(){
    if(startDate && endDate){
        var a = moment(startDate);
        var b = moment(endDate);
        var result=b.diff(a, 'weeks')
        if(result<0){
        alert("put end date less then start date")
        }if(result<1){
            alert("you must put 1 week gap between start and end date")
        }
        else{
        (prop.setDateFunc(startDate,endDate,result))
        }
    }
    else{
        alert("please insert both start and end date first")
    }
    
   // (prop.setDateFunc(startDate,endDate))
    // -1000
    //alert(moment(startDate,"YYYY-MM-DD HH:mm:ss").diff(moment(endDate,"YYYY-MM-DD HH:mm:ss"))) // 1

   }
    
    function filterDefault(val){
        (prop. filterDefaultFunc(val))
        
    }
   function filterName(name){
       (prop.filterNameFunc(name))
   }
    
    function filterPerformance(performance){
        (prop.filterPerformanceFunc(performance))
    }
   function filterLocation(location){
       (prop.filterLocationFunc(location))
   }
   function filterClass(clas){
    (prop.filterClassFunc(clas))
}
    ////////////////////////////////////////
    const handleStartDateChange = e => {
        document.getElementById("endDate").disabled=false;
        setStartDate(e.target.value);
        setSearchVal('')
       //edit by zubeda
       
        
    }
    const handleEndDateChange = e => {
        setEndDate(e.target.value);
        setSearchVal('')
       //edit by zubeda  
    }

    const handleLocationChange = e => {
        setOptionLocation(e.target.value);
        filterLocation(e.target.value)//edit by zubeda
        setSearchVal('')
        
        
    }
    const handleClassChange = e => {
        setOptionClass(e.target.value)
        filterClass(e.target.value)//edit by zubeda
    }
    const handlePerformanceChange = e => {
        setPerformanceClass(e.target.value)
        filterPerformance(e.target.value)
        setSearchVal('')
    }
    const handleSearch = e => {
        if(e.target.value===""){
            filterName("empty") 
        }else{
            filterName(e.target.value) 
        }
            setSearchVal(e.target.value)
          
        
        
      
    }
    const handleRange = e => {
        setRange(e.target.value) 
      
    }
    
    useEffect(() => {
        fetch('https://slacker-hackers.herokuapp.com/api/filter')
        .then(res => res.json())
        .then(data=> setData(data))
        .catch(err => console.log(err))
    }, [])

    //filter the data depending what a teacher select on the Location dropdown 
    let filteredLocationObj;
    Object.entries(data) != 0 ? filteredLocationObj = data.locations.filter(item => item.city == optionLocation ) : '';
    
    return Object.entries(data) != 0 ? (
        <div className='filter-section'>
                <div className='select-box'>
                    <span>Filter by:</span>
                    <select onChange={handleLocationChange} className='select-location'>
                        <option>Select All</option>
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
                    
                   
                </div>
                
                <select onChange={handlePerformanceChange} className='select-performance'>
                        <option disabled selected hidden id="defaultPerformance">Performance</option>
                        {/* edit by zubeda */}
                       
                        {
                            data.performance.map((performance, index) => <option key={index}>{performance}</option>)
                        }
                        
                    </select>
                <div className='search-box'>
                    <span>Search:</span>
                    <input id="studentName" onChange={handleSearch} className='search-input' type='search' value={searchVal} placeholder='Search student name ...' />
                </div>    
                {/* edit zubeda*/}
                <div>
                   
                        <input type="date"  id="startDate" selected="startDate" name="startDate" onChange={handleStartDateChange } />
                        <input type="date" id="endDate" name="endDate" onChange={handleEndDateChange } disabled={true} />
                        <button onClick={applyFunc}  id="btnDate" >Apply</button>
                   
                </div>
                {/* <div className='data-range-box'>
                    <span className='data-range-box__title'>Range: <span className='data-range-box__range'>{range}</span></span>
                    <input onChange={handleRange}  type='range' min='0' max='100' step='10'/>
                </div> */}

                {/* <div className='data-range-box'>
                    <span className='data-range-box__title'>Range: <span className='data-range-box__range'>{range}</span></span>
                    <input onChange={handleRange}  type='range' min='0' max='100' step='10'/>
                </div> */}

        </div>
    )
    :
    '';
}
export default Filter;
