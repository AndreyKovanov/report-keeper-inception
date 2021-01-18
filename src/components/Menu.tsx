import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const Menu: React.FC = () => {
  return (
    <div>
      <Button color="primary" component={RouterLink} to="/firstPage">
        To first page
      </Button>
      <Button color="primary" component={RouterLink} to="/secondPage">
        To second page
      </Button>
      <Button
        onClick={() => console.log('Routing handler')}
        color="primary"
        component={RouterLink}
        to="/thirdPage"
      >
        To third page
      </Button>
    </div>
  );
};
