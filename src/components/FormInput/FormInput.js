import { Form, Input } from 'antd';

const FormInput = title => (
  <Form.Item label={title}>
    <Input size="large" style={{ width: '50%' }} />
  </Form.Item>
);
export default FormInput;
