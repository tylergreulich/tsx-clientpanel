import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import { connect } from 'react-redux';
// import { getData } from '../../store/actions/dataActions';

interface DashboardProps {
  getData: () => any;
  clientData: {
    data: any[];
  };
}

class Dashboard extends React.Component<DashboardProps, {}> {
  public componentDidMount() {
    // this.props.getData();
  }

  public render() {
    const { clientData } = this.props;

    return (
      <ComponentWrapper>
        <h1>This is the Dashboard</h1>
        {clientData
          ? Object.keys(clientData.data).map(index => clientData.data[index])
          : 'No Data'}
      </ComponentWrapper>
    );
  }
}

const mapStateToProps = (state: any) => ({
  clientData: state.data
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
