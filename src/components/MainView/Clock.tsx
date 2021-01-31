import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useStore } from '@helpers/store';
import { TimerContext } from '@stores/Timer/Timer.provider';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';
import PauseIcon from '@material-ui/icons/Pause';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 100,
  },
  time: {
    display: 'block',
  },
  buttons: {
    display: 'flex',
  },
});

export const Clock: React.FC = observer(() => {
  const {
    workedHours,
    workedMinutes,
    isPaused,
    startPause,
    stopPause,
    startNewDay,
    minimizeWindow,
  } = useStore(TimerContext);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.buttons}>
        <Button
          onClick={startNewDay}
          variant="outlined"
          color="primary"
          size="small"
          disabled={isPaused}
        >
          <ReplayIcon />
        </Button>

        {isPaused ? (
          <Button
            onClick={stopPause}
            variant="outlined"
            color="primary"
            size="small"
          >
            <PlayArrowIcon />
          </Button>
        ) : (
          <Button
            onClick={startPause}
            variant="outlined"
            color="primary"
            size="small"
          >
            <PauseIcon />
          </Button>
        )}

        <Button
          onClick={minimizeWindow}
          variant="outlined"
          color="primary"
          size="small"
          disabled={isPaused}
        >
          <ArrowDownwardIcon />
        </Button>
      </Box>
      <Box className={classes.time}>{`${workedHours}:${workedMinutes}`}</Box>
    </Box>
  );
});
