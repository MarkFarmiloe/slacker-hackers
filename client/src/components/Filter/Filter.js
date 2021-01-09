import React, {useState, useEffect} from 'react';
import './filter.css'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      margin: '30px'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  }));

 function Filter(prop) {

    const classes = useStyles();

    const [data, setData] = useState({});
    const [searchVal, setSearchVal] = useState('');
    const [classs, setClasss] = useState('');
    const [week, setWeek] = useState('');
    const [perform, setPerform] = useState('');
    // const [optionPerformance, setPerformanceClass] = useState("");

    function filterDefault(val){
        (prop. filterDefaultFunc(val))
        
    }

    function filterName(name){
        (prop.filterNameFunc(name))
    }
    
    function filterPerformance(performance){
        (prop.filterPerformanceFunc(performance))
    }

    function filterClass(clas){
        (prop.filterClassFunc(clas))
    }
 

   
    const handleClassChange = e => {
        setClasss(e.target.value)
        filterClass(e.target.value)//edit by zubeda
        
    }

    const handlePerformanceChange = e => {
        // setPerformanceClass(e.target.value)
        filterPerformance(e.target.value)
        setSearchVal('')
        setPerform(e.target.value)
    }
    const handleSearch = e => {
        if(e.target.value===""){
            filterName("empty") 
        }else{
            filterName(e.target.value) 
        }
            setSearchVal(e.target.value)
    }
    const handleWeekChange = e =>{
        setWeek(e.target.value)
        const id= e.currentTarget.getAttribute("id");
        
        const days=parseInt(id);
        
        
        (prop.filterWeekFunc(days))
    }
    
    useEffect(() => {
        fetch('https://slacker-hackers.herokuapp.com/api/filter')
        .then(res => res.json())
        .then(data=> setData(data))
        .catch(err => console.log(err))
    }, [])

    return Object.entries(data) != 0 ? (
        <div className='filter-section'>

            <h6 className='filter-text'>Filter by:</h6>

                <div className='select-box'>
                   
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                        <Select
                            
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={classs}
                            onChange={handleClassChange}
                        >
                            
                            {
                            data.locations[0].classes.map((loc, index) =><MenuItem value={loc}  key={index}>{loc}</MenuItem>) 
                            }
                        </Select>
                    </FormControl>
                    
                </div>

                <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label1">Week</InputLabel>
                        <Select
                            
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={week}
                            onChange={handleWeekChange}
                        >
                            
                            <MenuItem id={1} value='last 7 days' >last 7 days</MenuItem>
                            <MenuItem id={2} value='last 14 days'>last 14 days</MenuItem>
                            <MenuItem id={3} value='last 21 days'>last 21 days</MenuItem>
                            <MenuItem id={4} value='last 28 days'>last 28 days</MenuItem>
                            
                        </Select>
                </FormControl>
                
                {/* <select
                     onChange={handlePerformanceChange} className='select-performance'>
                        <option disabled selected  id="defaultPerformance">Performance</option>
                        {
                            data.performance.map((performance, index) => <option key={index}>{performance}</option>)
                        }
                </select> */}

                <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label1">Performance</InputLabel>
                        <Select
                            
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select1"
                            value={perform}
                            onChange={handlePerformanceChange}
                        >
                            {
                                data.performance.map((perf, index) => <MenuItem key={index} value={perf} >{perf}</MenuItem>)
                            }
                            
                            
                        </Select>
                </FormControl>
               
                {/* <div className='search-box'> */}
                    <form className={classes.formControl} noValidate autoComplete="off">
                        <TextField onChange={handleSearch} value={searchVal} id="standard-basic" label="Search student name ..." />
                        
                    </form>
                {/* </div>    */}
                
        </div>
    )
    :
    '';
}
export default Filter;
