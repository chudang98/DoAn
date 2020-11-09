import React from 'react';
import { Upload, Icon, Modal, Button } from 'antd';
/**
 * @param
 */
class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: props.fileList || [],
    };
  }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({ ...changedValue });
    }
  };

  handleChange = ({ fileList }) => {
    console.log(fileList);
    this.setState({ fileList });
    this.triggerChange({ fileList });
  };

  render() {
    const { fileList } = this.state;
    const { otherProps } = this.props;
    const uploadButton = (
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    );
    return (
      <div className="clearfix">
        <Upload
          customRequest={({ file, onSuccess }) => {
            setTimeout(() => {
              onSuccess('ok');
            }, 0);
          }}
          fileList={fileList}
          onChange={this.handleChange}
          {...otherProps}
        >
          {otherProps && !otherProps.disabled && uploadButton}
        </Upload>
      </div>
    );
  }
}

export default PicturesWall;
