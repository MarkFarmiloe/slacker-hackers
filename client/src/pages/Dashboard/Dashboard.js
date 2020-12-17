import React, {useState, useEffect} from 'react'
import Filter from '../../components/Filter/Filter'
import StudentsTable from '../../components/StudentsTable/StudentsTable.js'

export default function Dashboard() {
    ///////////////////acess to api /edit by zubeda
    //extract data when page load
    const [data,setData]=useState([]);
    useEffect(
        function(){
           // https://hackz.glitch.me/student'
            //https://slacker-hackers.herokuapp.com/api/perform
        fetch('https://slacker-hackers.herokuapp.com/api/perform')
            .then(function(obj){
                return obj.json();
            })
            .then(function(db){
                console.log("data")
                setData(db);
            })
            .then(function(error) {
                console.log(error);
            });
        }
    ,[]);
    
    //extract data when filters activated
    const [byDefault,setDefault]=useState("default")
    const [performance,setPerformance]=useState(null);
    const [location,setLocation]=useState(null);
    const [className,setClassName]=useState(null);
    const [name,setName]=useState(null);
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
    const [filterDate,setFilterDate]=useState(null)
    function setDateFunc(start,end,filter){
        setStartDate(start)
        setEndDate(end)
        setFilterDate(filter)
        setDefault(null)
        setName(null)
        setPerformance(null);
        setLocation(null)
        setClassName(null)
    }
    function filterDefaultFunc(val){
        setDefault(val)
        setFilterDate(null)
        setName(null)
        setPerformance(null);
        setLocation(null)
        setClassName(null)
        //setDefault(val)
    }
    function filterPerformanceFunc(performance){
        setFilterDate(null)
        setDefault(null)
        setName(null)
        setPerformance(performance);
        setLocation(null)
        setClassName(null)
    }
    function filterNameFunc(name){
        setFilterDate(null)
        setDefault(null)
        setPerformance(null);
        setName(name);
        setLocation(null)
        setClassName(null)
    }
    function filterLocationFunc(location){
        setDefault(null)
        setPerformance(null);
        setName(null);
        setLocation(location)
        setClassName(null)
    }
    function filterClassFunc(clas){
        setFilterDate(null)
        setDefault(null)
        setPerformance(null);
        setName(null);
        setLocation(null)
        setClassName(clas)
    }
   
    ///////////////////////////////
    return (
        <div className='dashboard-page'>
            <Filter setDateFunc={setDateFunc} filterDefaultFunc={filterDefaultFunc} filterClassFunc={filterClassFunc} filterLocationFunc={filterLocationFunc} filterNameFunc={filterNameFunc} filterPerformanceFunc={filterPerformanceFunc}/>
            {byDefault && (<StudentsTable Data={data} default={byDefault}/>)}
            {performance && (<StudentsTable Data={data} search={performance} />)}
            {name && (<StudentsTable Data={data} name={name} />)}
            {location && (<StudentsTable Data={data} location={location} />)}
            {className && (<StudentsTable Data={data} className={className} />)}
            {filterDate && (<StudentsTable Data={data} filterDate={filterDate} startDate={startDate} endDate={endDate} />)}

        </div>
    )
}
