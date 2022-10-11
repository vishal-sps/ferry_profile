import { Radio } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const ActiveRadio = withStyles({
    root: {
      color: 'rgb(226, 55, 68)',
      '&$checked': {
        color: 'rgb(226, 55, 68)',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

export default ActiveRadio;