import * as React from 'react';
import { connect } from 'react-redux';
import { getClients } from '../../store/actions/clientActions';
import { ClientTable } from '../StyledComponents/Clients/Clients';
import TableHeading from './TableHeading/TableHeading';
import { ClientsProps } from '../../interfaces/Clients/clients.interface';
import { Button, Typography } from '@material-ui/core';

class Clients extends React.Component<ClientsProps, {}> {
  public componentDidMount() {
    this.props.getClients(this.props.auth.user.id);
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
          <Typography>{client.client._id}</Typography>
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

    return (
      <>
        <ClientTable>
          {/* <Button onClick={() => this.props.history.push('/add-client')}>
            Add Client
          </Button> */}
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
