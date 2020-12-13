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
    const [filter,setFilter]=useState('location');
    const [location,setLocation]=useState('location');
    const [className,setClassName]=useState('className');
    const [name,setName]=useState(null);
    function filterFunc(val){
        
        setFilter(val);
    }
   
    ////////////////////////////////
    return (
        <div className='dashboard-page'>
            <Filter filterFunc={filterFunc} />
            {filter ? (<StudentsTable Data={data} search={filter} />):(<StudentsTable Data={data} search={filter} />)}
            
        </div>
    )
}
