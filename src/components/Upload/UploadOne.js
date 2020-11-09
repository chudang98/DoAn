import React from 'react';
import { Upload, Icon, Button } from 'antd';
import notificationAlert from '@/components/Notification';
/**
 * @param
 */
class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: props.value.fileList || [],
    };
  }

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({ ...changedValue });
    }
  };

  handleChange = ({ fileList }) => {
    let list;
    if (fileList.length > 0) list = [fileList[fileList.length - 1]];
    else list = [];
    this.setState({ fileList: list });
    this.triggerChange({ fileList: list });
  };

  render() {
    const { fileList } = this.state;
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
          accept="application/pdf"
        >
          <Button>
            <Icon type="upload" />
            Tải lên
          </Button>
        </Upload>
      </div>
    );
  }
}

export default PicturesWall;
