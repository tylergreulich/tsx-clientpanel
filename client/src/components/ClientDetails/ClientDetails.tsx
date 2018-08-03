import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import { Button } from '@material-ui/core';
import { History } from 'history';
import { connect } from 'react-redux';
import { getClient, deleteClient } from '../../store/actions/clientActions';
import { Typography } from '@material-ui/core';

import { ClientDetailsProps } from '../../interfaces/ClientDetails/clientdetails.interface';

class ClientDetails extends React.Component<ClientDetailsProps, {}> {
  public componentDidMount() {
    this.props.getClient(this.props.match.params.id);
  }

  public onDeleteClientHandler = (id: string, history: History) =>
    this.props.deleteClient(id, history);

  public render() {
    const {
      client: { client }
    } = this.props;

    return (
      <>
        <ComponentWrapper style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <Button onClick={() => this.props.history.push('/')}>
                Back to Dashboard
              </Button>
            </div>
            <div>
              <Button
                onClick={() =>
                  this.props.history.push(
                    `/edit-client/${this.props.client.client._id}`
                  )
                }
              >
                Edit
              </Button>
              <Button
                onClick={id =>
                  this.onDeleteClientHandler(
                    this.props.client.client._id,
                    this.props.history
                  )
                }
              >
                Delete
              </Button>
            </div>
          </div>
          <Typography onClick={() => console.log(this.props.client.client._id)}>
            {client.firstName} {client.lastName}
          </Typography>
        </ComponentWrapper>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  client: state.client
});

export default connect(
  mapStateToProps,
  { getClient, deleteClient }
)(ClientDetails);
