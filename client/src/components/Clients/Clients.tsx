import * as React from 'react';
import { connect } from 'react-redux';
import { getClients } from '../../store/actions/clientActions';
import { ClientTable } from '../StyledComponents/Clients/Clients';
import TableHeading from './TableHeading/TableHeading';
import { ClientsProps } from '../../interfaces/Clients/clients.interface';
import { Typography, Button } from '@material-ui/core';

class Clients extends React.Component<ClientsProps, {}> {
  public componentDidMount() {
    this.props.getClients(this.props.auth.user.id);
  }

  public render() {
    const {
      client: {
        clients: { clients }
      }
    } = this.props;

    let tableDetails;

    if (clients) {
      tableDetails = clients.map((client: any) => (
        <>
          <Typography>{client.client._id}</Typography>
          <Typography>
            {client.client.firstName} {client.client.lastName}
          </Typography>
          <Typography>{client.client.email}</Typography>
          <Typography>{client.client.balance}</Typography>
          <Button>Details</Button>
        </>
      ));
    } else {
      tableDetails = null;
    }

    return (
      <>
        <ClientTable>
          <TableHeading style={{ fontSize: '1.2rem' }} />
          {tableDetails}
        </ClientTable>
      </>
    );
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
