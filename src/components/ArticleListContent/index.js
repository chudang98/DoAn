import React from 'react';
import moment from 'moment';
import { Avatar, Typography } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
  <div className={styles.listContent}>
    <div className={styles.description} style={{ fontSize: 12 }}>
      <Typography.Paragraph ellipsis={{ rows: 3, expandable: false }}>{content}</Typography.Paragraph>
    </div>
    {/* <div className={styles.extra}>
      Đăng tải: <em>{moment(updatedAt).format('DD/MM/YYYY HH:mm')}</em>
    </div> */}
  </div>
);

export default ArticleListContent;
