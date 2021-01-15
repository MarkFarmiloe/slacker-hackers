import React, { useState, useEffect } from "react";
import Filter from "../../components/Filter/Filter";
import StudentsTable from "../../components/StudentsTable/StudentsTable.js";
import ThresholdBanner from "../../components/ThresholdBanner/ThresholdBanner.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateLocale } from "moment";
import History from "../../components/History/History";
export default function Dashboard() {
  //default data
  const [byDefault, setDefault] = useState(null);
  const [data, setData] = useState([]);
  const [thresholdData, setThresholdData] = useState([]);
  const [thresholds, setThresholds] = useState({});
  const [avg,setAvg]=useState(7.8)
  //default data update when location or class select
  const [updatedData, setUpdatedData] = useState(null);

  //data select when location,class,performance activate
  const [performData, setPerformData] = useState(null);
  //data select against term/name
  const [nameData, setNameData] = useState(null);

  //data select against performance and activate it
//   const [performance, setPerformance] = useState(null);
  const [activatePerformance, setActivatePerformance] = useState(null); //active

//   const [className, setClassName] = useState(null);
  const [activateClassName, setActivateClassName] = useState(null); //active
  //name
//   const [name, setName] = useState(null);
  const [activeName, setActiveName] = useState(null); //active
  ///data select against date range
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
  //activate when filter week wise
  const [count, setCount] = useState(1);
  function filterWeekFunc1(weeks) {
     setDefault(null)
    // setData(null)
    setActivateClassName(null);
    setUpdatedData(null)
    setActivatePerformance(null);
    setPerformData(null)
    setActiveName(null);
    setNameData(null)
    setCount(weeks);
  
  }
  ////////////////////threshhols call
  useEffect( () => {
    fetch("https://slacker-hackers.herokuapp.com/api/threshold")
    .then(res => res.json())
    .then(obj=> {
      setThresholdData(obj)
    })
    .catch(err => alert(err));
    
    
    setActivateClassName(null);
    setActivatePerformance(null);
    setActiveName(null);
    setUpdatedData(null)
    setPerformData(null)
    setNameData(null)
  }, [count])
  //extract data from server through API
  useEffect(
    function () {
     
      // https://hackz.glitch.me/student'
      //https://slacker-hackers.herokuapp.com/api/perform
      //https://slackerhacke
     // rs.glitch.me/students/${count}
      fetch(`https://slacker-hackers.herokuapp.com/api/students/${count}`)
        .then(function (obj) {
          return obj.json();
        })
        .then(function (db) {
            setData(db.report);
            setDefault(db.report);
            setThresholds(db.thresholds);
           
        })
        .then(function (error) {
          console.log(error);
        });
       
        
        setActivateClassName(null);
        setActivatePerformance(null);
        setActiveName(null);
        setUpdatedData(null)
        setPerformData(null)
        setNameData(null)
      
    },
    [count]
  );
  
  //activate when default data is called
  function filterDefaultFunc(val) {
    setDefault(val);
    setActivateClassName(null);
    setActivatePerformance(null);
    setActiveName(null);
  }

  //activate when class is selected against location
  function filterClassFunc(clas) {
    let classData
     classData = data.filter(function (obj) {
      return obj.classname.toLowerCase() === clas.toLowerCase();
    });
  
    if (classData.length > 0) {
      setUpdatedData(classData);
      setActivateClassName(classData);
    } else {
      setUpdatedData(data);
      setActivateClassName(data);
    }
    setPerformData(null);
    setActivatePerformance(null);
    setDefault(null);
   // setData(null)
    setActiveName(null);
    setNameData(null)
  }
  //activate when performance is selected against location and class
      
  function filterPerformanceFunc(val) {
    ////////////////////////////
    let low=thresholdData.filter(function(obj){
      return obj.level==="low"
     })

    let medium=thresholdData.filter(function(obj){
      return obj.level==="medium"
    })

    let high=thresholdData.filter(function(obj){
      return obj.level==="high"
    })
    let performanceData = [];
    let allData = [];
    if (updatedData){
      let poorData=[];
      let averageData=[];
      let goodData=[]
      updatedData.forEach(function (obj) {
        if((obj.posts >= high[0].postsWeight)&&(obj.reactions >= high[0].reactsWeight)&&(obj.attachments >= high[0].attachmentsWeight)&&(obj.files >= high[0].filesWeight)){
          goodData.push(obj)
        }else if((obj.posts >= medium[0].postsWeight)&&(obj.reactions >= medium[0].reactsWeight)&&(obj.attachments >= medium[0].attachmentsWeight)&&(obj.files >= medium[0].filesWeight)){
          averageData.push(obj)
        }else if((obj.posts >= low[0].postsWeight)&&(obj.reactions >= low[0].reactsWeight)&&(obj.attachments >= low[0].attachmentsWeight)&&(obj.files >= low[0].filesWeight)){
          poorData.push(obj)
        }  
      });
      if(val==="Low"){
        performanceData=poorData;
      }
      if(val==="Medium"){
        performanceData=averageData
      }
      if(val==="High"){
        performanceData=goodData;
      }
      allData = updatedData;
    }
    else {
      let poorData=[];
      let averageData=[];
      let goodData=[]
      data.forEach(function (obj) {
       
        if((obj.posts >= high[0].postsWeight)&&(obj.reactions >= high[0].reactsWeight)&&(obj.attachments >= high[0].attachmentsWeight)&&(obj.files >= high[0].filesWeight)){
          goodData.push(obj)
        }else if((obj.posts >= medium[0].postsWeight)&&(obj.reactions >= medium[0].reactsWeight)&&(obj.attachments >= medium[0].attachmentsWeight)&&(obj.files >= medium[0].filesWeight)){
          averageData.push(obj)
        }else if((obj.posts >= low[0].postsWeight)&&(obj.reactions >= low[0].reactsWeight)&&(obj.attachments >= low[0].attachmentsWeight)&&(obj.files >= low[0].filesWeight)){
          poorData.push(obj)
        }  
      });
      if(val==="Low"){
        performanceData=poorData;
      }
      if(val==="Medium"){
        performanceData=averageData
      }
      if(val==="High"){
        performanceData=goodData;
      }
      allData = data;
    }
    if (performanceData.length > 0) {
      setActivatePerformance(performanceData);
      setPerformData(performanceData);
    } 
    else {
      if (val === "All") {
        setActivatePerformance(allData);
        setPerformData(allData);
      } else {
        alert(`${val} data is not exist`);
        if(updatedData){
          setActivatePerformance(updatedData);
          setPerformData(updatedData);
        }else{
          setActivatePerformance(data);
          setPerformData(data);
        }
       
      }
    }
    setDefault(null);
    setActivateClassName(null);
    setActiveName(null);
    setNameData(null)
  }
  //activate when term/name is type against location/class/performance or combination of two or three
  function filterNameFunc(val) {
    if (performData) {
      if (val === "empty") {
        setActiveName("empty");
        setNameData(performData);
      } else {
        let nameArr = performData.filter(function (obj) {
          return obj.username.toLowerCase().includes(val.toLowerCase());
        });
        if (nameArr.length > 0) {
          setNameData(nameArr);
          setActiveName(nameArr);
        } else {
          setNameData(performData);
          setActiveName(performData);
        }
      }
    } else if (updatedData) {
      if (val === "empty") {
        setActiveName("empty");
        setNameData(updatedData);
      } else {
        let nameArr = updatedData.filter(function (obj) {
          return obj.username.toLowerCase().includes(val.toLowerCase());
        });
        if (nameArr.length > 0) {
          setNameData(nameArr);
          setActiveName(nameArr);
        } else {
          setNameData(updatedData);
          setActiveName(updatedData);
        }
      }
    } else {
      if (val === "empty") {
        setActiveName("empty");
        setNameData(data);
      } else {
        let nameArr = data.filter(function (obj) {
          return obj.username.toLowerCase().includes(val.toLowerCase());
        });

        if (nameArr.length > 0) {
          setNameData(nameArr);
          setActiveName(nameArr);
        } else {
          setNameData(data);
          setActiveName(data);
        }
      }
    }
    setDefault(null);
    setActivateClassName(null);
    setActivatePerformance(null);
  }
 
  return ((data.length > 0)&&(thresholdData.length>0 )) ? (
    <div className="dashboard-page" style={{ margin: "20px 5%" }}>
      <ThresholdBanner data={thresholds}/>
      <Filter
        filterWeekFunc={filterWeekFunc1}
        filterDefaultFunc={filterDefaultFunc}
        filterClassFunc={filterClassFunc}
        filterNameFunc={filterNameFunc}
        filterPerformanceFunc={filterPerformanceFunc}
      />
      <History />
      {byDefault && <StudentsTable Data={data} thresholdData={thresholdData} />}
      {activatePerformance && <StudentsTable Data={performData} thresholdData={thresholdData} />}
      {activeName && <StudentsTable Data={nameData} thresholdData={thresholdData} />}
      {activateClassName && <StudentsTable Data={updatedData} thresholdData={thresholdData} />}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "100px auto",
      }}
    >
      <CircularProgress />
    </div>
  );
}
