import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useStore } from '@helpers/store';
import { TimerContext } from '@stores/Timer/Timer.provider';

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 100,
  },
});

export const Clock: React.FC = observer(() => {
  const { workedHours, workedMinutes } = useStore(TimerContext);

  const classes = useStyles();

  return (
    <Box className={classes.root}>{`${workedHours}:${workedMinutes}`}</Box>
  );
});
