import React from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './RegisterResult.less';
import _ from 'lodash';

const actions = (
  <div className={styles.actions}>
    <a href="https://mail.google.com/mail">
      <Button size="large" type="primary">
        <FormattedMessage id="app.register-result.view-mailbox" />
      </Button>
    </a>
    <Link to="/user/login">
      <Button size="large">Login</Button>
    </Link>
  </div>
);

const RegisterResult = ({ location }) => {
  return (
    <Result
      className={styles.registerResult}
      type="success"
      title={
        <div className={styles.title}>
          <FormattedMessage
            id="app.register-result.msg"
            values={{ email: location.state ? location.state.account : 'AIS@example.com' }}
          />
        </div>
      }
      description={formatMessage({ id: 'app.register-result.activation-email' })}
      actions={actions}
      style={{ marginTop: 56 }}
    />
  )
};

export default RegisterResult;
