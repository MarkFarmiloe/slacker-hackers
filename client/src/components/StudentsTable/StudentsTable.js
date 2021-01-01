import React, { useEffect, useState } from "react"
import "./StudentTable.css";
export function StudentTable(prop){
let searchData=[],cnt=0;
searchData=prop.Data
    function next(){
        alert("next")
    }
  
    return(
        <div id="studentContainer">
             <table style={{width:'80%'}} className="table table-striped table-bordered table-sm">
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
                   cnt=cnt+1;
                   if(cnt<10){
                    return <ROW obj={obj} key={obj.id} />
                   }else{

                   }
                  
                })
            }
            </tbody>
            </table>
        </div>
    )
}
//return each student table row
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
    else if(parseInt(prop.obj.posts)>=5 && parseInt(prop.obj.posts)<=10){
       
        return(<tr key={"row".concat(prop.obj.id)}  style={{backgroundColor:'orange'}}><td key={"name".concat(Math.random(prop.obj.id))}>{prop.obj.name}</td><td key={"location".concat(Math.random(prop.obj.id))}>{prop.obj.location}</td><td key={"class".concat(Math.random(prop.obj.id))}>{prop.obj.class}</td><td key={"post".concat(Math.random(prop.obj.id))} >{parseInt(prop.obj.posts)}</td><td key={"week".concat(Math.random(prop.obj.id))}>{prop.obj.week}</td><td key={"button".concat(Math.random(prop.obj.id))}><button type="button" onClick={warnFunc} className="btn btn-danger">Profile</button></td></tr>
        )
    }else{
        return(<tr key={"row".concat(prop.obj.id)}  style={{backgroundColor:'#90ee90'}}><td key={"name".concat(Math.random(prop.obj.id))}>{prop.obj.name}</td><td key={"location".concat(Math.random(prop.obj.id))}>{prop.obj.location}</td><td key={"class".concat(Math.random(prop.obj.id))}>{prop.obj.class}</td><td key={"post".concat(Math.random(prop.obj.id))} >{parseInt(prop.obj.posts)}</td><td key={"week".concat(Math.random(prop.obj.id))}>{prop.obj.week}</td><td key={"button".concat(Math.random(prop.obj.id))}><button type="button" onClick={warnFunc} className="btn btn-danger">Profile</button></td></tr>
        )
    }
    
}
export default StudentTable;