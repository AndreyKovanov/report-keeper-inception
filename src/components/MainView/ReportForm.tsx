import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

import { useStore } from '@helpers/store';
import { CurrentReportContext } from '@stores/CurrentReport/CurrentReport.provider';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const ReportForm: React.FC = observer(() => {
  const {
    projectNames,
    reportTask,
    changeReportTask,
    reportDuration,
    changeReportDuration,
    reportDate,
    changeReportDate,
    reportDescription,
    changeReportDescription,
    onSave,
  } = useStore(CurrentReportContext);

  const classes = useStyles();

  return (
    <>
      <TextField
        id="project-select"
        select
        variant="outlined"
        label="Task"
        value={reportTask}
        onChange={changeReportTask}
      >
        {projectNames.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Duration"
        variant="outlined"
        value={reportDuration}
        onChange={changeReportDuration}
      />
      <TextField
        label="Date"
        variant="outlined"
        value={reportDate}
        onChange={changeReportDate}
      />
      <TextField
        label="Description"
        variant="outlined"
        value={reportDescription}
        onChange={changeReportDescription}
        autoFocus
      />
      <Button
        variant="outlined"
        color="primary"
        disabled={!reportDescription}
        onClick={onSave}
      >
        Save <SaveIcon fontSize="large" />
      </Button>
    </>
  );
});
