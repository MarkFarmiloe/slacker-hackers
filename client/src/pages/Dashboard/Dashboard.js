import React, {useState, useEffect} from 'react'
import Filter from '../../components/Filter/Filter'
import StudentsTable from '../../components/StudentsTable/StudentsTable.js'

export default function Dashboard() {
    ///////////////////acess to api /edit by zubeda
    //extract data when page load
    const [data,setData]=useState([]);
    const [updatedData,setUpdatedData]=useState(null)
    const [locData,setLocData]=useState(null)
    const [performData,setPerformData]=useState(null)
    const [nameData,setNameData]=useState(null);
    const [dateData,setDateData]=useState(null);
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
                setUpdatedData(db);
            })
            .then(function(error) {
                console.log(error);
            });
        }
    ,[]);
    
    //extract data when filters activated
    const [byDefault,setDefault]=useState("default")
    //performance
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
    ///date
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
    const [activateDate,setActivateDate]=useState(null)//active
    function filterDefaultFunc(val){
        setDefault(val)
        setActivateDate(null)
        setActiveName(null)
        setActivatePerformance(null);
        setActivateClassName(null)
        setActivateClassName(null)
        
    }
    ///location
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
        }
        }
        setActivateLocation(location)
        setDefault(null)
        setActivatePerformance(null);
        setActiveName(null);
        setLocation(location)
        setActivateClassName(null)
        setActivateDate(null)

}
    ////class
    function filterClassFunc(clas){
        let classData=locData.filter(function(obj){
            return obj.class.toLowerCase()===clas.toLowerCase()
          })
         if(locData.length>0){
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
   ///performance
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
    //name
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
                }
                setActiveName(nameArr)
            }
        }
        else{
           
            if(val==="empty"){
                setActiveName("empty")
                setNameData(updatedData)
               
            }else{
                let nameArr=updatedData.filter(function(obj){
                    return obj.name.toLowerCase().includes(val.toLowerCase());
                })
                if(nameArr.length>0){
                    setNameData(nameArr)
                }
                setActiveName(nameArr)
            }
        }
        setActivateDate(null)
        setDefault(null)
        setActivatePerformance(null);
        setName(val);
        setActivateLocation(null)
        setActivateClassName(null)
    
    }
    //date
    function setDateFunc(start,end,filter){
        setStartDate(start)
        setEndDate(end)
        ///////////////////////
        if(performData){
            alert("per")
            let dateDateArr=performData.filter(function(obj){
            
                return (obj.date>=start) && (obj.date<=end)
                // return obj.date<=prop.startDate
                })
                
                if(dateDateArr.length>0){
                    setDateData(dateDateArr)
                }else{
                    alert("No post exist in this date range")
                    setDateData(updatedData)
                }
        }else{
            alert("up")
            let dateDateArr=updatedData.filter(function(obj){
            
            return (obj.date>=start) && (obj.date<=end)
            // return obj.date<=prop.startDate
            })
            
            if(dateDateArr.length>0){
                setDateData(dateDateArr)
            }else{
                alert("No post exist in this date range")
                setDateData(updatedData)
            }
        }
        /////////////////////////
        setActivateDate(Math.random(100))
        setDefault(null)
        setActiveName(null)
        setActivatePerformance(null);
        setActivateLocation(null)
        setActivateClassName(null)
    }
    
    
    
   
   
    ///////////////////////////////
    return (
        <div className='dashboard-page'>
            <Filter setDateFunc={setDateFunc} filterDefaultFunc={filterDefaultFunc} filterClassFunc={filterClassFunc} filterLocationFunc={filterLocationFunc} filterNameFunc={filterNameFunc} filterPerformanceFunc={filterPerformanceFunc}/>
            {byDefault && (<StudentsTable Data={data} default={byDefault}/>)}
            {activatePerformance && (<StudentsTable Data={performData} location={location} className={className} search={performance}  name={name} startDate={startDate} endDate={endDate} />)}
            {activeName && (<StudentsTable Data={nameData} location={location} className={className} search={performance}  name={name} startDate={startDate} endDate={endDate} />)}
            {activateLocation && (<StudentsTable Data={updatedData} location={location} className={className} search={performance}  name={name} startDate={startDate} endDate={endDate} />)}
            {activateClassName && (<StudentsTable Data={updatedData} location={location} className={className} search={performance}  name={name} startDate={startDate} endDate={endDate} />)}
            {activateDate && (<StudentsTable filterDate={activateDate} Data={dateData} location={location} className={className} search={performance}  name={name} startDate={startDate} endDate={endDate} />)}

        </div>
    )
}
