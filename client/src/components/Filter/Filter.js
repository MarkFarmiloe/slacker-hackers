import React, {useState, useEffect} from 'react';
import './filter.css'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: '200px',
      margin: '10px 20px'
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
    const [week, setWeek] = useState("last 7 days");
    const [perform, setPerform] = useState('');
  
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
        setSearchVal("")
        setPerform("")
        setClasss(e.target.value)
        filterClass(e.target.value)
        prop.filterClassFunc()
        //edit by zubeda
        
    }

    const handlePerformanceChange = e => {
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
        let clasName=document.getElementById("classForm")
        setWeek(e.target.value)
        const id= e.currentTarget.getAttribute("id");
        const days=parseInt(id);
        (prop.filterWeekFunc(days))
        setSearchVal("")
        setClasss("")
        setPerform("")
    }

    const handleReset = e => {
        setSearchVal("")
        setPerform("")
        setClasss('')
        setWeek("last 7 days");
        prop.filterDefaultFunc(Math.random())
    }
    
    useEffect(() => {
        fetch('https://slacker-hackers.herokuapp.com/api/filter')
        .then(res => res.json())
        .then(data=> setData(data))
        .catch(err => console.log(err))
    }, [])

    return Object.entries(data) != 0 ? (
        <div className='filter-section'>
        
            <div className='filter-container'>
                <h6 className='filter-text'>Filter by:</h6>
                    <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label1">Days</InputLabel>
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
                    <div className='select-box'>
                    
                    { <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Class</InputLabel>
                            <Select
                                
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={classs}
                                onChange={handleClassChange}
                            >
                                 <MenuItem key="All" value="All">All</MenuItem>
                                {
                                data.locations[0].classes.map((loc, index) =><MenuItem value={loc}  key={index}>{loc}</MenuItem>) 
                                }
                            </Select>
                        </FormControl>}
                        
                    </div>
                    <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label1">Performance</InputLabel>
                            <Select
                                
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={perform}
                                onChange={handlePerformanceChange}
                            >
                             <MenuItem key="All" value="All">All</MenuItem>
                                {
                                   
                                    data.performance.map((perf, index) => <MenuItem key={index} value={perf} >{perf}</MenuItem>)
                                }
                                
                                
                            </Select>
                    </FormControl>
                
                    <form className={classes.formControl} noValidate autoComplete="off">
                        <TextField onChange={handleSearch} value={searchVal} id="standard-basic" label="Search student name ..." />
                    </form>

                </div>
                {/* <Button color="secondary"  onClick={handleReset} style={{textTransform: 'none'}}><RefreshOutlinedIcon   />  Reset filters</Button> */}
                {/* <Button color="secondary" style={{textTransform: 'none'}} onClick={handleReset}>Reset filters</Button> */}
                
        </div>
    )
    :
    '';
}
export default Filter;



