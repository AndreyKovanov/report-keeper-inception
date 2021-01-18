import React from 'react';
import { observer } from 'mobx-react-lite';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { useStore } from '@helpers/store';
import { CounterContext } from '@stores/Counter.provider';

export const TitleInput: React.FC = observer(() => {
  const { inputTitle, changeTitle } = useStore(CounterContext);

  return (
    <div>
      <Button color="primary" component={RouterLink} to="/">
        Back
      </Button>
      <Typography variant="h3">{inputTitle}</Typography>
      <TextField
        label="Title"
        variant="outlined"
        value={inputTitle}
        onChange={(event) => changeTitle(event.target.value)}
      />
    </div>
  );
});
