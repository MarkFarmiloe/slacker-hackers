import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import './StudentTable.css'
import moment from 'moment'


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
 
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
   
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}



const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
 function StudentTable(prop) {
  let searchData=[],cnt=0;
 
  searchData=prop.Data;
 let low=prop.thresholdData.filter(function(obj){
      return obj.level==="low"
 })

 let medium=prop.thresholdData.filter(function(obj){
  return obj.level==="medium"
})

let high=prop.thresholdData.filter(function(obj){
  return obj.level==="high"
})


///console.log(low)

// alert(prop.thresholdData[0].level)
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage,searchData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
  
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
  
   
  };
 

  return (
    
  
    <TableContainer component={Paper} >
      <Table  id="studentContainer" className={classes.table} aria-label="custom pagination table">
        <TableBody >
        <TableRow>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold' }} align="left">Name</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Class</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Posts</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Reactions</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Attachments</TableCell>
          <TableCell component="th" scope="row" style={{ width: 'auto',fontWeight:'bold'}} align="left">Files</TableCell>


        </TableRow>
          {(rowsPerPage > 0
            ? searchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : searchData
          ).map((obj) => (
          
            <TableRow  id={"/#/student-profile/".concat(obj.username)} key={Math.random(100)} style={{backgroundColor
            :((obj.posts>=high[0].postsWeight)&&(obj.reactions>=high[0].reactsWeight)
            &&(obj.attachments>=high[0].attachmentsWeight)&&(obj.files>=high[0].filesWeight))?('green')
            :((obj.posts>=medium[0].postsWeight)&&(obj.reactions>=medium[0].reactsWeight)&&(obj.attachments>=medium[0].attachmentsWeight)
            &&(obj.files>=medium[0].filesWeight))?('yellow')
            :(((obj.posts>=low[0].postsWeight))&&
           (obj.reactions>=low[0].reactsWeight)&&(obj.attachments>=low[0].attachmentsWeight)
           &&(obj.files>=low[0].filesWeight))?('pink')
            :('gray')}}>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.username)} style={{textDecoration:'none',color:'black'}} >
                  {obj.username}
                </a>
              </TableCell>
             
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.classname}
                </a>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.posts}
                </a>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.reactions}
                </a>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.attachments}
                </a>
              </TableCell>
              <TableCell style={{ width: 'auto' }} align="left">
                <a href={"/#/student-profile/".concat(obj.name)} style={{textDecoration:'none',color:'black'}} >
                  {obj.files}
                </a>
              </TableCell>
              
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5,10, 15, 20, { label: 'All', value: -1 }]}
              colSpan={3}
              count={searchData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default StudentTable;