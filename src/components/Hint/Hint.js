import React from 'react';
import { Tooltip, Icon } from 'antd';

class Hint extends React.Component {
  render() {
    const { title, label } = this.props;
    return (
      <React.Fragment>
        <span>{`${label} `}</span>
        <Tooltip style={{ verticalAlign: 'center' }} title={title}>
          <Icon type="question-circle" theme="filled" />
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default Hint;
