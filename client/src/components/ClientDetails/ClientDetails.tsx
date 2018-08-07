import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import { connect } from 'react-redux';
import { getClient, resetIsUpdated } from '../../store/actions/clientActions';
import { Typography } from '@material-ui/core';
import { ClientDetailsProps } from '../../interfaces/ClientDetails/clientdetails.interface';

import NavButtons from './NavButtons/NavButtons';

import { ClientContainer } from '../StyledComponents/ClientId/ClientId';

import MySnackbarContent from '../UI/SnackbarContent/SnackbarContent';

class ClientDetails extends React.Component<ClientDetailsProps, {}> {
  public componentDidMount() {
    this.props.getClient(this.props.match.params.id);

    if (this.props.client.isUpdated) {
      setTimeout(() => {
        this.props.resetIsUpdated();
      }, 3000);
    }
  }

  public onCloseHandler = () => this.props.resetIsUpdated();

  public render() {
    const {
      client: { client }
    } = this.props;

    return (
      <>
        <ComponentWrapper style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {this.props.client.isUpdated ? (
              <MySnackbarContent
                variant="success"
                message="Successfully Updated!"
                onClose={this.onCloseHandler}
              />
            ) : null}
          </div>
          <NavButtons {...this.props} />
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
  { getClient, resetIsUpdated }
)(ClientDetails);
