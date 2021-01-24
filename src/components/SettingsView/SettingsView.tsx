import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { SettingsContext } from '@stores/Settings/Settings.provider';
import { useStore } from '@helpers/store';

const useStyles = makeStyles({
  root: {
    padding: 15,
  },
});

export const SettingsView: React.FC = observer(() => {
  const {
    saveAndReload,
    topMost,
    changeTopMost,
    autoLaunch,
    changeAutoLaunch,
  } = useStore(SettingsContext);

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={topMost}
                onChange={changeTopMost}
                name="topMost"
                color="primary"
              />
            }
            label="Always on top"
          />
          <FormControlLabel
            control={
              <Switch
                checked={autoLaunch}
                onChange={changeAutoLaunch}
                name="autoLaunch"
                color="primary"
              />
            }
            label="Auto-start"
          />
        </FormGroup>
      </Box>
      <Box>
        <Button color="secondary" component={RouterLink} to="/">
          Cancel
        </Button>
        <Button color="primary" onClick={saveAndReload}>
          Save and reload
        </Button>
      </Box>
    </Box>
  );
});
