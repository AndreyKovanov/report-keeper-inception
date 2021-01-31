import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Clock } from './Clock';
import { Progress } from './Progress';
import { ReportForm } from './ReportForm';

const useStyles = makeStyles({
  root: {
    padding: 15,
  },
});

export const MainView: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} wrap="nowrap">
        <Grid item xs>
          <ReportForm />
        </Grid>
        <Grid item>
          <Clock />
        </Grid>
        <Grid item>
          <Progress />
        </Grid>
      </Grid>
      <Button
        size="small"
        color="secondary"
        component={RouterLink}
        to="/thirdPage"
      >
        <EqualizerIcon />
      </Button>
      <Button
        size="small"
        color="primary"
        component={RouterLink}
        to="/settings"
      >
        <SettingsIcon />
      </Button>
    </Box>
  );
};
