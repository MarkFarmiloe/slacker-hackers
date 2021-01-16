import React, {useContext} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { UserContext, UserRoleContext, UserSlackIdContext } from '../../contexts/userContext';
import { useHistory } from 'react-router-dom';


const ITEM_HEIGHT = 48;

export default function LongMenu({role}) {

  const {user, setUser} = useContext(UserContext);
  const {userRole, setUserRole} = useContext(UserRoleContext);
  const {userSlackId, setUserSlackId} = useContext(UserSlackIdContext);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    
  };

  const handleClickOption = () => {
    setUser('');
    setUserRole('');
    setUserSlackId('');
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {
          <div>
          
            {
              role == 'admin' 
              ?
              <MenuItem key={0} onClick={() => {
                history.push('/settings') 
                handleClose(); 
                }
              }>
                Settings
              </MenuItem>
              :
              ''
            }
            
           
            <MenuItem key={1} onClick={handleClickOption}>
              Logout
            </MenuItem>
          </div>
        }
      </Menu>
    </div>
  );
}