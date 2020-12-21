import { updateLocale } from 'moment';
import React, {useState, useEffect} from 'react'
import Filter from '../../components/Filter/Filter'
import StudentsTable from '../../components/StudentsTable/StudentsTable.js'
export default function Dashboard() {
    //default data
    const [byDefault,setDefault]=useState("default")
    const [data,setData]=useState([]);
    //default data update when location or class select
    const [updatedData,setUpdatedData]=useState(null)
    //data extract when location select
    const [locData,setLocData]=useState(null)
    //data select when location,class,performance activate
    const [performData,setPerformData]=useState(null)
    //data select against term/name
    const [nameData,setNameData]=useState(null);
    //data select against a date range
    const [dateData,setDateData]=useState(null);
    //data select against performance and activate it
    const [performance,setPerformance]=useState(null);
    const [activatePerformance,setActivatePerformance]=useState(null);//active
    //location
    const [location,setLocation]=useState(null);
    const [activateLocation,setActivateLocation]=useState(null);//active
    //class
    const [className,setClassName]=useState(null);
    const [activateClassName,setActivateClassName]=useState(null);//active
    //name
    const [name,setName]=useState(null);
    const [activeName,setActiveName]=useState(null);//active
    ///data select against date range
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
    const [activateDate,setActivateDate]=useState(null)//active
    //extract data from server through API
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
    //activate when default data is called
    function filterDefaultFunc(val){
        setDefault(val)
        setActivateDate(null)
        setActiveName(null)
        setActivatePerformance(null);
        setActivateClassName(null)
        setActivateClassName(null)
    }
    ///activate when a location is selected
    function filterLocationFunc(location){
        if(location==="Select All"){
            setUpdatedData(data)
            window.location.reload()
        }else{
            let locationData=data.filter(function(obj){
            return obj.location.toLowerCase()===location.toLowerCase()
        })
            if(locationData.length>0){
                setPerformData(null)
                setLocData(locationData)
                setUpdatedData(locationData)
                setActivateLocation(location)
                setDefault(null)
                setActivatePerformance(null);
                setActiveName(null);
                setLocation(location)
                setActivateClassName(null)
                setActivateDate(null)
            }
        }
    }
    //activate when class is selected against location
    function filterClassFunc(clas){
        let classData=locData.filter(function(obj){
            return obj.class.toLowerCase()===clas.toLowerCase()
          })
        if(classData.length>0){
            setPerformData(null)
            setUpdatedData(classData)
        }
        setActivateClassName(clas)
        setActivateDate(null)
        setDefault(null)
        setActivatePerformance(null);
        setActiveName(null);
        setActivateLocation(null)
        setClassName(clas)
    }
   //activate when performance is selected against location and class
   function filterPerformanceFunc(val){
    let performanceData=updatedData.filter(function(obj){
        if(val==="Poor"){
            return obj.posts<5
        }
        if(val==="Average"){
            return obj.posts>=5 && obj.posts<=10
        }
        if(val==="Good"){
            return obj.posts>10;
        }
      })
     if(performanceData.length>0){
        setPerformData(performanceData)
        setActivatePerformance(performanceData)
        setActivateDate(null)
        setDefault(null)
        setActiveName(null)
        setPerformance(performance);
        setActivateLocation(null)
        setActivateClassName(null)
     }else{
         alert(`${val} data is not exist`)
     }
    }
    //activate when term/name is type against location/class/performance or combination of two or three 
    function filterNameFunc(val){
        if(performData){
            if(val==="empty"){
                setActiveName("empty")
                setNameData(performData)
            }else{
                let nameArr=performData.filter(function(obj){
                    return obj.name.toLowerCase().includes(val.toLowerCase());
                })
                if(nameArr.length>0){
                  
                    setNameData(nameArr)
                    setActiveName(nameArr)
                }else{
                    setNameData(performData)
                    setActiveName(performData)
                    
                }
            }
        }
        else if(updatedData){
            if(val==="empty"){
                setActiveName("empty")
                setNameData(updatedData)
            }else{
                //updatedData
                let nameArr=updatedData.filter(function(obj){
                    return obj.name.toLowerCase().includes(val.toLowerCase());
                })
                if(nameArr.length>0){
                    setNameData(nameArr)
                    setActiveName(nameArr)
                }else{
                    setNameData(updatedData)
                    setActiveName(updatedData)
                }
            }
        }else{
            if(val==="empty"){
                setActiveName("empty")
                setNameData(data)
            }else{
                let nameArr=data.filter(function(obj){
                    return obj.name.toLowerCase().includes(val.toLowerCase());
                })
                if(nameArr.length>0){
                    setNameData(nameArr)
                    setActiveName(nameArr)
                }else{
                    setNameData(data)
                    setActiveName(data)
                }
            }
        }
        setActivateDate(null)
        setDefault(null)
        setActivatePerformance(null);
        setName(val);
        setActivateLocation(null)
        setActivateClassName(null)
    
    }
//activate when date range is selected against location/class/performance or combination of two or three 
    function setDateFunc(start,end,filter){
        setStartDate(start)
        setEndDate(end)
        if(performData){
            let dateDateArr=performData.filter(function(obj){
                return (obj.date>=start) && (obj.date<=end)
                })
                if(dateDateArr.length>0){
                    setDateData(dateDateArr)
                }else{
                    setDateData(performData)
                    setActivateDate(performData)
                    alert("no record exist between these dates")
                }
        }else if(updatedData) {
            //updatedData
            let dateDateArr=updatedData.filter(function(obj){
            return (obj.date>=start) && (obj.date<=end)
            })
            if(dateDateArr.length>0){
                setDateData(dateDateArr)
            }else{
                alert("No post exist in this date range")
                setDateData(updatedData)
            }
        }else{
            let dateDateArr=data.filter(function(obj){
                return (obj.date>=start) && (obj.date<=end)
                })
                if(dateDateArr.length>0){
                    setDateData(dateDateArr)
                }else{
                    alert("No post exist in this date range")
                    setDateData(data)
                }
        }
        setActivateDate(Math.random(100))
        setDefault(null)
        setActiveName(null)
        setActivatePerformance(null);
        setActivateLocation(null)
        setActivateClassName(null)
    }
    return (
        <div className='dashboard-page'>
            <Filter setDateFunc={setDateFunc} filterDefaultFunc={filterDefaultFunc} filterClassFunc={filterClassFunc} filterLocationFunc={filterLocationFunc} filterNameFunc={filterNameFunc} filterPerformanceFunc={filterPerformanceFunc}/>
            {byDefault && (<StudentsTable Data={data}/>)}
            {activatePerformance && (<StudentsTable Data={performData} />)}
            {activeName && (<StudentsTable Data={nameData} />)}
            {activateLocation && (<StudentsTable Data={updatedData} />)}
            {activateClassName && (<StudentsTable Data={updatedData} />)}
            {activateDate && (<StudentsTable filterDate={activateDate} Data={dateData} />)}

        </div>
    )
}
