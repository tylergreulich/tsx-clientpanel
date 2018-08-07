import * as React from 'react';
import { Button } from '@material-ui/core';

import { deleteClient } from '../../../store/actions/clientActions';

import { History } from 'history';

import { connect } from 'react-redux';

interface NavButtonProps {
  history: History;
  deleteClient: (id: string, history: History) => void;
  client: {
    client: {
      _id: string;
      firstName: string;
      lastName: string;
      balance: string;
      email: string;
    };
  };
}

const navButtons = (props: NavButtonProps) => {
  const onDeleteClientHandler = (id: string, history: History) =>
    props.deleteClient(id, history);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <Button onClick={() => props.history.push('/')}>
          Back to Dashboard
        </Button>
      </div>
      <div>
        <Button
          onClick={() =>
            props.history.push(`/edit-client/${props.client.client._id}`)
          }
        >
          Edit
        </Button>
        <Button
          onClick={id =>
            onDeleteClientHandler(props.client.client._id, props.history)
          }
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { deleteClient }
)(navButtons);
