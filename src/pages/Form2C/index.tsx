import FormDrawer from '@/components/Drawer/FormDrawer';
import { Button, Form, Card, Row, Col } from 'antd';
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

    this.nextForm = this.nextForm.bind(this);
    this.preForm = this.preForm.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'form2c/getTinhThanh', payload: {} });
  }

  nextForm() {
    let countForm = this.state.visibleForm;
    countForm++;
    countForm = countForm % 4;
    this.setState({
      visibleForm: countForm,
    });
  }

  preForm() {
    let countForm = this.state.visibleForm;
    if (countForm > 0) countForm--;
    this.setState({
      visibleForm: countForm,
    });
  }

  buttonNext = () => (
    <Button onClick={this.nextForm} type="primary" className={styles.button_next}>
      {this.state.visibleForm + 1 == 4
        ? `(4/4 Hoàn thành)`
        : `(${this.state.visibleForm + 1}/4 Tiếp theo)`}
    </Button>
  );

  buttonPre = () => (
    <Button onClick={this.preForm} className={styles.button_back}>
      Quay lại
    </Button>
  );

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
          buttonPre={this.buttonPre()}
          buttonNext={this.buttonNext()}
        />
        <Form2
          model={this.props.form2c}
          visible={this.state.visibleForm == 1}
          modelName={'form2c'}
          dispatch={this.props.dispatch}
          buttonPre={this.buttonPre()}
          buttonNext={this.buttonNext()}
        />
        <Form3
          model={this.props.form2c}
          visible={this.state.visibleForm == 2}
          modelName={'form2c'}
          dispatch={this.props.dispatch}
          buttonPre={this.buttonPre()}
          buttonNext={this.buttonNext()}
        />
        <Form4
          model={this.props.form2c}
          visible={this.state.visibleForm == 3}
          modelName={'form2c'}
          dispatch={this.props.dispatch}
          buttonPre={this.buttonPre()}
          buttonNext={this.buttonNext()}
        />
      </div>
    );
  }
}

// const WrappedForm = Form.create({ name: 'form2c' })(Form2C);

export default Form2C;
