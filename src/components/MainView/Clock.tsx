import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useStore } from '@helpers/store';
import { CounterContext } from '@stores/Counter.provider';

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 100,
  },
});

export const Clock: React.FC = observer(() => {
  const { countValue } = useStore(CounterContext);

  const classes = useStyles();

  return <Box className={classes.root}>Clock will be here</Box>;
});
