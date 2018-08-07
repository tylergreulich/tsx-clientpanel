import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import { Button } from '@material-ui/core';
import { History } from 'history';
import { connect } from 'react-redux';
import {
  getClient,
  deleteClient,
  resetIsUpdated
} from '../../store/actions/clientActions';
import { Typography } from '@material-ui/core';
import { ClientDetailsProps } from '../../interfaces/ClientDetails/clientdetails.interface';

import { ClientContainer } from '../StyledComponents/ClientId/ClientId';

import MySnackbarContent from '../UI/SnackbarContent/SnackbarContent';

class ClientDetails extends React.Component<ClientDetailsProps> {
  public componentDidMount() {
    this.props.getClient(this.props.match.params.id);

    if (this.props.client.isUpdated) {
      setTimeout(() => {
        this.props.resetIsUpdated();
      }, 3000);
    }
  }

  public onDeleteClientHandler = (id: string, history: History) =>
    this.props.deleteClient(id, history);

  public onCloseHandler = () => this.props.resetIsUpdated();

  public render() {
    const {
      client: { client }
    } = this.props;

    return (
      <>
        <ComponentWrapper style={{ display: 'flex', flexDirection: 'column' }}>
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {this.props.client.isUpdated ? (
              <MySnackbarContent
                variant="success"
                message="Successfully Updated!"
                onClose={this.onCloseHandler}
              />
            ) : null}
          </div>
          <ClientContainer>
            <Typography>{client._id}</Typography>
            <Typography>
              {client.firstName} {client.lastName}
            </Typography>
            <Typography>{client.email}</Typography>
            <Typography>{client.balance}</Typography>
          </ClientContainer>
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
  { getClient, deleteClient, resetIsUpdated }
)(ClientDetails);
