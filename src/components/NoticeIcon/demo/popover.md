---
order: 2
title: Hello
---


```jsx
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { Tag } from 'antd';

const data = [
];

function onItemClick(item, tabProps) {
  console.log(item, tabProps);
}

function onClear(tabTitle) {
  console.log(tabTitle);
}

function getNoticeData(notices) {
  if (notices.length === 0) {
    return {};
  }
  const newNotices = notices.map(notice => {
    const newNotice = { ...notice };
    // transform id to item key
    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }
    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag color={color} style={{ marginRight: 0 }}>
          {newNotice.extra}
        </Tag>
      );
    }
    return newNotice;
  });
  return newNotices.reduce((pre, data) => {
    if (!pre[data.type]) {
      pre[data.type] = [];
    }
    pre[data.type].push(data);
    return pre;
  }, {});
}

const noticeData = getNoticeData(data);
const Demo = () => (
  <div
    style={{
      textAlign: 'right',
      height: '64px',
      lineHeight: '64px',
      boxShadow: '0 1px 4px rgba(0,21,41,.12)',
      padding: '0 32px',
      width: '400px',
    }}
  >

  </div>
);

ReactDOM.render(<Demo />, mountNode);
```
