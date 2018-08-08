import * as React from 'react';
import { connect } from 'react-redux';
import { getClients } from '../../store/actions/clientActions';
import { ClientTable } from '../StyledComponents/Clients/Clients';
import TableHeading from './TableHeading/TableHeading';
import { ClientsProps } from '../../interfaces/Clients/clients.interface';
import { Button, Typography } from '@material-ui/core';

import AddClient from '../AddClient/AddClient';

class Clients extends React.Component<ClientsProps, {}> {
  public componentDidMount() {
    this.props.getClients(this.props.auth.user.id);
  }

  public componentDidUpdate(prevProps: any) {
    const {
      client: { clients }
    } = prevProps;

    if (clients !== undefined && clients.length !== 0) {
      if (
        clients.clients &&
        this.props.client.clients[0] &&
        clients.clients.length !== this.props.client.clients[0].clients.length
      ) {
        this.props.getClients(this.props.auth.user.id);
      }
    }
  }

  public render() {
    console.log(this.props);
    const {
      client: {
        clients: { clients }
      }
    } = this.props;

    let tableDetails;

    if (clients && clients.length >= 1) {
      tableDetails = clients.map((client: any) => (
        <React.Fragment key={client.client._id}>
          <Typography
            onClick={() => console.log(this.props.client.clients.clients)}
          >
            {client.client._id}
          </Typography>
          <Typography>
            {client.client.firstName} {client.client.lastName}
          </Typography>
          <Typography>{client.client.email}</Typography>
          <Typography>{client.client.balance}</Typography>
          <Button
            onClick={() =>
              this.props.history.push(`/client/${client.client._id}`)
            }
            style={{ color: '#3f51b5', fontSize: '1.25rem' }}
          >
            Details
          </Button>
        </React.Fragment>
      ));
    } else {
      tableDetails = <div>There is no data</div>;
    }

    return <>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AddClient />
        </div>

        <ClientTable>
          <TableHeading />
          {tableDetails}
        </ClientTable>
      </>;
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  client: state.client
});

export default connect(
  mapStateToProps,
  { getClients }
)(Clients);
