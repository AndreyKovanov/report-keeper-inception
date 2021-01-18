import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useStore } from '@helpers/store';
import { CounterContext } from '@stores/Counter.provider';

const useStyles = makeStyles({
  root: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  },
});

export const Progress: React.FC = observer(() => {
  const { countValue } = useStore(CounterContext);

  const classes = useStyles();

  return <Box className={classes.root} bgcolor="success.main" />;
});
