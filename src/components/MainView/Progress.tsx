import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useStore } from '@helpers/store';
import { StatisticsContext } from '@stores/Statistics/Statistics.provider';

const useStyles = makeStyles({
  root: {
    width: 100,
  },
});

export const Progress: React.FC = observer(() => {
  const {
    dayEffort,
    weekEffort,
    monthEffort,
    dayNorm,
    weekNorm,
    monthNorm,
  } = useStore(StatisticsContext);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box>{`day: ${dayEffort}/${dayNorm}`}</Box>
      <Box>{`week: ${weekEffort}/${weekNorm}`}</Box>
      <Box>{`month: ${monthEffort}/${monthNorm}`}</Box>
    </Box>
  );
});
