import React from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

import { useStore } from '@helpers/store';
import { CounterContext } from '@stores/Counter.provider';

const projects = [
  {
    label: 'Internal',
    value: 'internal-id',
  },
  {
    label: 'Real',
    value: 'react-id',
  },
  {
    label: 'Test',
    value: 'test-id',
  },
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const ReportForm: React.FC = observer(() => {
  const { inputTitle, changeTitle } = useStore(CounterContext);

  const classes = useStyles();

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <>
      <TextField
        id="project-select"
        select
        variant="outlined"
        label="Project"
        value={projects[0].value}
        onChange={handleSelectChange}
      >
        {projects.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Description"
        variant="outlined"
        value={inputTitle}
        onChange={(event) => changeTitle(event.target.value)}
      />
      <Button variant="outlined" color="primary">
        Save <SaveIcon fontSize="large" />
      </Button>
    </>
  );
});
