import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import { connect } from 'react-redux';
import { getData } from '../../store/actions/dataActions';

interface DashboardProps {
  getData: () => any;
}

class Dashboard extends React.Component<DashboardProps, {}> {
  public componentDidMount() {
    this.props.getData();
    console.log(this.props);
  }

  public render() {
    return (
      <ComponentWrapper>
        <h1>This is the Dashboard</h1>
      </ComponentWrapper>
    );
  }
}

const mapStateToProps = (state: any) => ({
  clientData: state.data
});

export default connect(
  mapStateToProps,
  { getData }
)(Dashboard);
