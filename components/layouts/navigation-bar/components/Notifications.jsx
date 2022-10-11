import Bell from "./svgs/bell.svg";
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Box } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    maxWidth: '400px',
    width: '100%',
    height: '500px',
    maxHeight: '524px',
    top: '85px !important',
    padding: '4px'
  },
}));

const Notifications = () => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    console.log('currect target', event.currentTarget);
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <Bell className="mr-5" onClick={handleClick} />
      <Menu
        PopoverClasses={{ paper: classes.popoverPaper }}
        id="customized-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom' }}
        transformOrigin={{ vertical: 'top' }}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          disabled
          classes={{
            root: '!opacity-100'
          }}
        >
          <ListItemText classes={{
            primary: '!text-sm !font-semibold !text-gray-700'
          }} primary="Notifications" />
        </MenuItem>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) =>
            <MenuItem key={'notification' + index}>
              <Box className="grid pb-5">
                <h4 className="text-red-500 font-semibold">
                  Booking Cancelled !
                </h4>
                <Box className="mt-3" whiteSpace="break-spaces">
                  Pellentesque tincidunt tristique neque, eget venenatis enim gravida quis.
                </Box>
              </Box>
            </MenuItem>
          )
        }
      </Menu>
    </div>
  )
}

export default Notifications;