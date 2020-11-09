import FormDrawer from '@/components/Drawer/FormDrawer';
import { IBase } from '@/utils/base';
import { Button, Form, Card } from 'antd';
import React from 'react';
import Form1 from './components/FormI';
import Form2 from './components/FormII';
import Form3 from './components/FormIII';
import Form4 from './components/FormIV';

import styles from './index.less';
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
  state = {
    visibleForm: 0,
  };
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'form2c/getTinhThanh', payload: {} });
  }

  handleClick() {
    let countForm = this.state.visibleForm;
    countForm++;
    countForm = countForm % 4;
    this.setState({
      visibleForm: countForm,
    });
  }

  render() {
    return (
      <div>
        <Form1
          model={this.props.form2c}
          visible={this.state.visibleForm == 0}
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
          visible={this.state.visibleForm == 1}
          modelName={'form2c'}
          dispatch={this.props.dispatch}
        />
        <Form3
          model={this.props.form2c}
          visible={this.state.visibleForm == 2}
          modelName={'form2c'}
          dispatch={this.props.dispatch}
        />
        <Form4
          model={this.props.form2c}
          visible={this.state.visibleForm == 3}
          modelName={'form2c'}
          dispatch={this.props.dispatch}
        />
        <Button onClick={this.handleClick} type="primary" className={styles.button_next}>
          {this.state.visibleForm + 1 == 4
            ? `(4/4 Hoàn thành)`
            : `(${this.state.visibleForm + 1}/4 Tiếp theo)`}
        </Button>
      </div>
    );
  }
}

// const WrappedForm = Form.create({ name: 'form2c' })(Form2C);

export default Form2C;
