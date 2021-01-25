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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

const themeList = ['dark', 'light'];

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
    notificationTime,
    changeNotificationTime,
    dayNorm,
    changeDayNorm,
    theme,
    changeTheme,
    filePath,
    changeFilePath,
    chooseReportsDirectory,
    projectList,
    changeProjectList,
    chooseReportsTemplate,
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
        <FormGroup row>
          <TextField
            label="Show time in hrs."
            variant="outlined"
            value={notificationTime}
            onChange={changeNotificationTime}
            type="number"
          />
          <TextField
            label="Work time in hrs."
            variant="outlined"
            value={dayNorm}
            onChange={changeDayNorm}
            type="number"
          />
        </FormGroup>
        <FormGroup row>
          <TextField
            select
            variant="outlined"
            label="theme"
            value={theme}
            onChange={changeTheme}
          >
            {themeList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Path to report files"
            variant="outlined"
            value={filePath}
            onChange={changeFilePath}
          />
          <Button color="primary" onClick={chooseReportsDirectory}>
            choose path
          </Button>
        </FormGroup>
        <FormGroup row>
          <Button color="primary" onClick={chooseReportsTemplate}>
            Choose report template file
          </Button>
        </FormGroup>
        <FormGroup row>
          {projectList.map((item) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.enabled}
                  onChange={changeProjectList}
                  name={item.name}
                  color="primary"
                />
              }
              label={item.name}
              key={item.name}
            />
          ))}
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
