import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import { connect } from 'react-redux';
import { getData } from '../../store/actions/dataActions';

import axios from 'axios';

interface DashboardProps {
  getData: () => any;
  clientData: {
    data: any[];
  };
}

class Dashboard extends React.Component<DashboardProps, {}> {
  public componentDidMount() {
    this.props.getData();
  }

  public fetchData = () => {
    axios
      .get('http://localhost:5000/api/users/test')
      .then(res => {
        console.log(Object.keys(res.data).map(i => res.data[i]));

        const testData = Object.keys(res.data).map(i => res.data[i]);

        this.setState({ msg: testData });
      })
      .catch(err => alert(err));
  };

  public render() {
    const { clientData } = this.props;

    return (
      <ComponentWrapper>
        <h1 onClick={this.fetchData}>This is the Dashboard</h1>
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
  { getData }
)(Dashboard);
