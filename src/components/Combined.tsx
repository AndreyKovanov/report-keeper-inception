import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

import { useStore } from '@helpers/store';
import { CounterContext } from '@stores/Counter.provider';

const useStyles = makeStyles({
  parent: {
    display: 'flex',
  },
  item: {
    marginRight: '20px',
  },
});

export const Combined: React.FC = observer(() => {
  const {
    countValue,
    increment,
    decrement,
    inputTitle,
    changeTitle,
  } = useStore(CounterContext);

  const classes = useStyles();

  return (
    <div>
      <Button color="primary" component={RouterLink} to="/">
        Back
      </Button>
      <Typography variant="h3">Your Electron App</Typography>
      <Box className={classes.parent}>
        <Box className={classes.item}>
          <h2>Count value: {countValue}</h2>
          <Button onClick={increment} variant="outlined" color="primary">
            <KeyboardArrowUpIcon fontSize="large" />
          </Button>
          <Button onClick={decrement} variant="outlined" color="secondary">
            <KeyboardArrowDownIcon fontSize="large" />
          </Button>
        </Box>
        <Box>
          <h2>New title: {inputTitle}</h2>
          <TextField
            label="Title"
            variant="outlined"
            value={inputTitle}
            onChange={(event) => changeTitle(event.target.value)}
          />
        </Box>
      </Box>
    </div>
  );
});
