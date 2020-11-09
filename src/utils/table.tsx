import { Typography } from 'antd';
export function renderParagraph(text: string, rows: number, expandable?: boolean) {
  return (
    <Typography.Paragraph ellipsis={{ rows: rows, expandable: !!expandable }}>
      {text}
    </Typography.Paragraph>
  )
};