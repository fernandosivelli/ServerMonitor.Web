import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { getSessionsAction } from '../../actions/actions';

class DiskUsage extends Component {
  componentDidMount() {
    this.props.get();
  }

  render() {
    if (this.props.data.length === 0 && this.props.columns.length === 0) {
      return (<h1>No data found.</h1>);
    }
    return (
      <Table
        columns={this.props.columns}
        dataSource={this.props.data}
        pagination={false}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.tasks.data,
  columns: state.tasks.columns
});

const mapDispatchToProps = dispatch => ({
  get: () => {
    dispatch(getSessionsAction());
  }
});

DiskUsage.propTypes = {
  get: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DiskUsage);
