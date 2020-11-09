import FormDrawer from '@/components/Drawer/FormDrawer';
import { IBase } from '@/utils/base';
import { Button } from 'antd';
import React from 'react';
import Form1 from './components/FormI';
import Form2 from './components/FormII';
import { connect } from 'dva';
import { IForm2CState } from './model';

type Form2C_Props = {
  form2c: IForm2CState;
  loading: boolean;
  dispatch: Function;
  form: { getFieldDecorator };
  cond;
};

@connect(({ form2c, loading }) => ({
  form2c,
  loading: loading.models.form2c,
}))
class Form2C extends React.Component<Form2C_Props> {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      visibleForm1: true,
      visibleForm2: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'form2c/getTinhThanh', payload: {} });
  }

  handleClick() {
    this.setState({
      visibleForm1: !this.state.visibleForm1,
      visibleForm2: !this.state.visibleForm2,
    });
  }

  render() {
    return (
      // <FormDrawer name="form2c">
      <div>
        <Form1
          model={this.props.form2c}
          visible={this.state.visibleForm1}
          modelName={'form2c'}
          // showDrawer={true}
          dispatch={this.props.dispatch}
          // cond={cond}
          // key={model.record._id || model.key}
          // loading={loading}
          tinhThanh={this.props.form2c.tinhThanh}
        />
        <Form2
          model={this.props.form2c}
          visible={this.state.visibleForm2}
          modelName={'form2c'}
          // showDrawer={true}
          dispatch={this.props.dispatch}
          // cond={cond}
          // key={model.record._id || model.key}
          // loading={loading}
        />
        <Button onClick={this.handleClick} type="primary" icon="edit" />
      </div>
      // </FormDrawer>
    );
  }
}

// const WrappedForm = Form.create({ name: 'form2c' })(Form2C);

export default Form2C;
