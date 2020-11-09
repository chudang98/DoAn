/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Button, Input, Icon } from 'antd';

class InputSearch extends React.Component {
  state = {
    searchText: '',
  };

  Clear = () => {
    this.setState({
      searchText: '',
    });
    this.props.handleSearch('');
  };

  render() {
    const { searchText } = this.state;
    return (
      <span>
        <Input
          placeholder={this.props.placeholder}
          style={{ width: 350 }}
          onChange={e => this.setState({ searchText: e.target.value })}
          value={searchText || ''}
          onPressEnter={e => this.props.handleSearch(e.target.value)}
        />
        <Button type="primary" onClick={() => this.props.handleSearch(this.state.searchText)}>
          <Icon type="search" />
        </Button>
        <Button type="warning" onClick={() => this.Clear()}>
          <Icon type="undo" />
        </Button>
      </span>
    );
  }
}

export default InputSearch;
