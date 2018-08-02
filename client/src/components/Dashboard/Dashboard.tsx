import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import { connect } from 'react-redux';
import { getClients } from '../../store/actions/clientActions';
// import { Button } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
import Clients from '../Clients/Clients';

interface DashboardProps {
  getClients: (userId: string) => any;
  client: {
    clients: {
      clients: [
        {
          client: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            balance: string;
          };
        }
      ];
    };
  };
  history: {
    push: (route: string) => void;
  };
  auth: {
    user: {
      id: string;
    };
  };
}

interface DashboardState {
  test: {};
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  public componentDidMount() {
    this.props.getClients(this.props.auth.user.id);
  }

  public render() {
    const {
      client: {
        clients: { clients }
      }
    } = this.props;

    return (
      <ComponentWrapper>
        <div style={{ flex: 1 }}>
          <Clients />
        </div>
        {!clients
          ? 'No Data'
          : clients.map((client: any) => client.client.balance)}
        {/* <Button
          variant="contained"
          color="primary"
          style={{ width: '12.5rem' }}
          type="submit"
          onClick={() => history.push('/add-client')}
        >
          <Add />
          Add A Client
        </Button> */}
      </ComponentWrapper>
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
)(Dashboard);
