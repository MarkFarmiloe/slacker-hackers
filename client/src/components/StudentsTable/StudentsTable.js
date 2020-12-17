import React, { useEffect, useState } from "react";
import "./StudentTable.css";
let test=0;

export function StudentTable(prop){
    const [orange,setOrange]=useState(null);
    const [red,setRed]=useState(null);
    const [green,setGreen]=useState(null);
    //array of search data
    let searchData=[];
    //make a subset location wise
    if(prop.default){
        searchData=prop.Data
       
    }
    //make location wise
    if(prop.location){
        searchData=prop.Data.filter(function(obj){
          return obj.location.toLowerCase()===prop.location.toLowerCase()
        })
        if(searchData.length===0){
            searchData=prop.Data
        }
    }
    //////make class wise
    if(prop.className){
        searchData=prop.Data.filter(function(obj){
          return obj.class.toLowerCase()===prop.className.toLowerCase()
        })
        if(searchData.length===0){
            searchData=prop.Data
        }
    }
    //make performance Wise
    if(prop.search==="Good"){
        let temp=[]
        searchData=prop.Data.filter(function(obj){
            if(obj.posts>10){
                return obj
            }else{
                temp.push(obj)
            }
        })
        if(searchData.length>0){
            searchData=searchData.concat(temp) 
        }
    }
    if(prop.search==="Poor"){
        let temp=[];
        searchData=prop.Data.filter(function(obj){
            if(obj.posts>=0 && obj.posts<5){
                return obj
            }else{
                temp.push(obj)
            }
        })
        if(searchData.length>0){
            searchData=searchData.concat(temp) 
        }
    }
    if(prop.search==="Average"){
        let temp=[];
        searchData=prop.Data.filter(function(obj){
            if(obj.posts>=5 && obj.posts<10){
                return obj
            }else{
                temp.push(obj)
            }
        })
        if(searchData.length>0){
            searchData=searchData.concat(temp) 
        }
    }
    if(prop.search==="Select All"){
        searchData=prop.Data
    }
/////////////name wise
    if(prop.name){
            searchData=prop.Data.filter(function(obj){
            return obj.name.toLowerCase().includes(prop.name.toLowerCase());
            })
            if(searchData.length>0)
            searchData=searchData;
            else{
                alert(searchData.length)
                searchData=prop.Data
            }
        
    }
    /////////////date wise
    if(prop.filterDate){
        //alert("yes")
        searchData=prop.Data.filter(function(obj){
           
           return obj.date>=prop.startDate && obj.date<=prop.endDate
         // return obj.date<=prop.startDate
        })
        console.log(searchData.length)
    }   
    
    
    return(
        <div id="studentContainer">
             <table className="table table-striped table-bordered table-sm">
            <thead>
                <tr>
                        <th scope="col" key={Math.random(1,5)}>Name</th>
                        <th scope="col" key={Math.random(5,10)}>Location</th>
                        <th scope="col" key={Math.random(10,15)}>Class</th>
                        <th scope="col" key={Math.random(15,20)}>Posts/Week</th>
                        <th scope="col" key={Math.random(20,25)}>Calls/Week</th>
                        <th scope="col" key={Math.random(25,30)}>Action</th>
                </tr>
            </thead>
            <tbody>
            {
               searchData.map(function(obj){
                  return <ROW obj={obj} key={obj.id} />
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
        
        return(<tr key={"row".concat(prop.obj.id)} style={{backgroundColor:'#eb5a46'}}><td key={"name".concat(Math.random(prop.obj.id))}>{prop.obj.name}</td><td key={"location".concat(Math.random(prop.obj.id))}>{prop.obj.location}</td><td key={"class".concat(Math.random(prop.obj.id))}>{prop.obj.class}</td><td key={"post".concat(Math.random(prop.obj.id))} >{parseInt(prop.obj.posts)}</td><td key={"week".concat(Math.random(prop.obj.id))}>{prop.obj.week}</td><td key={"button".concat(Math.random(prop.obj.id))}><button type="button" onClick={warnFunc} className="btn btn-danger">Profile</button></td></tr>
       )
    }
    else if(parseInt(prop.obj.posts)<10){
       
        return(<tr key={"row".concat(prop.obj.id)}  style={{backgroundColor:'orange'}}><td key={"name".concat(Math.random(prop.obj.id))}>{prop.obj.name}</td><td key={"location".concat(Math.random(prop.obj.id))}>{prop.obj.location}</td><td key={"class".concat(Math.random(prop.obj.id))}>{prop.obj.class}</td><td key={"post".concat(Math.random(prop.obj.id))} >{parseInt(prop.obj.posts)}</td><td key={"week".concat(Math.random(prop.obj.id))}>{prop.obj.week}</td><td key={"button".concat(Math.random(prop.obj.id))}><button type="button" onClick={warnFunc} className="btn btn-danger">Profile</button></td></tr>
        )
    }else{
        return(<tr key={"row".concat(prop.obj.id)}  style={{backgroundColor:'#90ee90'}}><td key={"name".concat(Math.random(prop.obj.id))}>{prop.obj.name}</td><td key={"location".concat(Math.random(prop.obj.id))}>{prop.obj.location}</td><td key={"class".concat(Math.random(prop.obj.id))}>{prop.obj.class}</td><td key={"post".concat(Math.random(prop.obj.id))} >{parseInt(prop.obj.posts)}</td><td key={"week".concat(Math.random(prop.obj.id))}>{prop.obj.week}</td><td key={"button".concat(Math.random(prop.obj.id))}><button type="button" onClick={warnFunc} className="btn btn-danger">Profile</button></td></tr>
        )
    }
    
}
export default StudentTable;