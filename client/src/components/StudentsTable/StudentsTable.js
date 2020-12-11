import React, { useEffect, useState } from "react";
import "./StudentTable.css";


export function StudentTable(prop){
    const [orange,setOrange]=useState(null);
    const [red,setRed]=useState(null);
    const [green,setGreen]=useState(null);
    //array of search data
    let searchData=[];
    //make a subset location wise
    if(prop.search==="location"){
        searchData=prop.Data;
    }else{
        searchData=prop.Data.filter(function(obj){
            return obj.location.toLowerCase()===prop.search.toLowerCase();
        })
    }
     //make a subset name wise
    
    //make performanceWise
    if(prop.search==="Select All"){
        searchData=prop.Data
    }
    if(prop.search==="Poor"){
        let temp=[];
        searchData=prop.Data.filter(function(obj){
            //return obj.posts<5;
            if(obj.posts<5){
                return obj
            }else{
                temp.push(obj)
            }
        })
        searchData=searchData.concat(temp)
    }
    if(prop.search==="Average"){
        let temp=[];
        searchData=prop.Data.filter(function(obj){
            //return (obj.posts>5) && (obj.posts<10)
            if((obj.posts>5) && (obj.posts<10)){
                return obj
            }else{
                temp.push(obj)
            }
        })
        searchData=searchData.concat(temp)
    }
    if(prop.search==="Good"){
        let temp=[]
        searchData=prop.Data.filter(function(obj){
            //return obj.posts>10;
            if(obj.posts>10){
                return obj
            }else{
                temp.push(obj)
            }
        })
        searchData=searchData.concat(temp)
    }

    
    
    return(
        <div id="studentContainer">
             <table class="table table-striped table-bordered table-sm">
            <thead>
                <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Class</th>
                        <th scope="col">Posts/Week</th>
                        <th scope="col">Calls/Week</th>
                        <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {
               searchData.map(function(obj){
                  return <ROW obj={obj}/>
                })
            }
            </tbody>
                
            </table>
        </div>
    )
}
//Row
function ROW(prop){
    function warnFunc(){
        var warn = prompt("Please enter your Message", "message");
        if (warn != null) {
            alert("your message has been send to "+prop.obj.name)
          }

    }
    if(parseInt(prop.obj.posts)<5){
        return(<tr style={{backgroundColor:'#eb5a46'}}><td>{prop.obj.name}</td><td>{prop.obj.location}</td><td>{prop.obj.class}</td><td>{parseInt(prop.obj.posts)}</td><td>{prop.obj.week}</td><td><button type="button" onClick={warnFunc} class="btn btn-danger">Profile</button></td></tr>
       )
    }else if(parseInt(prop.obj.posts)<10){
        return(
            <tr style={{backgroundColor:'orange'}}><td>{prop.obj.name}</td><td>{prop.obj.location}</td><td>{prop.obj.class}</td><td>{prop.obj.posts}</td><td>{prop.obj.week}</td><td><button type="button" onClick={warnFunc} class="btn btn-warning">Profile</button></td></tr>
        )
    }else{
        return(
            <tr style={{backgroundColor:'#90ee90'}}><td>{prop.obj.name}</td><td>{prop.obj.location}</td><td>{prop.obj.class}</td><td>{prop.obj.posts}</td><td>{prop.obj.week}</td><td><button type="button" onClick={warnFunc}  class="btn btn-success">Profile</button>
            </td></tr>

        )
    }
    
}
export default StudentTable;