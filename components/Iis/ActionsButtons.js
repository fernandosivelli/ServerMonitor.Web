import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StartStopButton from './StartStopButton';
import { setIisAction } from '../../actions/actions';


const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const ActionsButtons = (props) => {
  const onSet = () => props.set(props);
  return (
    <div className="actions-main">
      <StartStopButton running={props.running} click={onSet} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  set: (item) => {
    const data =
    {
      appPools: flatten(item.apps.map(x => x.children)),
      condition: item.running
    };
    dispatch(setIisAction(data));
  }
});

ActionsButtons.propTypes = {
  running: PropTypes.bool.isRequired,
  set: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ActionsButtons);
