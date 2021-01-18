import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link as RouterLink } from 'react-router-dom';

import { useStore } from '@helpers/store';
import { CounterContext } from '@stores/Counter.provider';

export const Counter: React.FC = observer(() => {
  const { countValue, increment, decrement } = useStore(CounterContext);

  return (
    <div>
      <Button color="primary" component={RouterLink} to="/">
        Back
      </Button>
      <Typography variant="h3">Counter</Typography>
      <h2>Count value: {countValue}</h2>
      <Button onClick={increment} variant="outlined" color="primary">
        <KeyboardArrowUpIcon fontSize="large" />
      </Button>
      <Button onClick={decrement} variant="outlined" color="secondary">
        <KeyboardArrowDownIcon fontSize="large" />
      </Button>
    </div>
  );
});
