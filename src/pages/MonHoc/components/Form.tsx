import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { formItemLayout, getSubmitText, handleCommonSubmit, handleValuesChange, tailFormItemLayout } from '@/utils/form';
import rules from '@/utils/rules';
import { Button, Card, Col, Form, Input, Row, Spin } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import _ from 'lodash';
import React from 'react';

type MonHoc_Props = {
    model: {edit, record},
    cond: object,
    loading: boolean,
    dispatch: Function,
    form: { validateFieldsAndScroll, getFieldDecorator },
}

class MonHoc extends React.Component<MonHoc_Props> {
    render(){
        const {model, form: { getFieldDecorator }, cond, loading} = this.props;
        return(
            <div className="box">
                <Card
                    bordered={true}
                    title= {
                    <div className="cardTitle">{model.edit ? "Chỉnh sửa" : "Thêm Mới"}</div>
                    }

                >
                    <GridContent>
                        <Row>
                            <Col span={18}>
                                <Form {...formItemLayout}>
                                    <FormItem label="Mã Môn">
                                        {getFieldDecorator('tenMon', {
                                            initialValue: model.edit ? _.get(model.record, 'tenMon', '') : '',
                                            rules: [...rules.ten, ...rules.required]
                                        })(<Input/>)}
                                    </FormItem>
                                    
                                </Form>
                            </Col>
                        </Row>
                    </GridContent>
                </Card>
            </div>
        );
    }
}

const WrappedFormMonHoc = Form.create({name: "MonHocForm", onValuesChange: handleValuesChange})(MonHoc);
export default WrappedFormMonHoc;