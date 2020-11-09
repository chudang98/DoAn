import TableBase from '@/components/Table/Table.tsx';
import { IColumn } from '@/utils/interfaces';
import { Icon, Tree, Button } from 'antd';
import uuidv1 from 'uuid/v1';
import { connect } from 'dva';
import React from 'react';
import FormEmployee from './components/FormEmployee';
import Form from './components/Form';
import FormShowInfor from './components/FormShowInfor';
import styles from './index.css';
import { IQuanTriState } from '@/pages/QuanTri/model';
import { Record } from 'immutable';
import router from 'umi/router';
type Props = {
  // showInfor: boolean;
  // treeRecord: [];
  quantri: IQuanTriState;
  loading: boolean;
  dispatch: Function;
};

// type States = {
//   showInfor: boolean,
//   treeRecord: Array<object>
// }

const { TreeNode } = Tree;
@connect(({ quantri, loading }) => ({
  quantri,
  loading: loading.models.quantri,
}))
class QuanTri extends React.Component<Props> {
  state = {
    showInfor: false,
    showButton: false,
    // dataChildren: {}
  };

  componentDidMount() {
    const { modelName, cond } = this.props;
    this.setState({
      showInfor: true,
    });
    this.props.dispatch({
      type: `quantri/getTreeAndDanhSach`,
      payload: {
        page: 1,
        limit: 10,
        cond,
      },
    });
    // this.setState({
    //   dataChildren: this.props.quantri.dataTree[0],
    // });
    // console.log("data children");
    // console.log(this.state.dataChildren)
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            icon={<Icon type="folder" style={{ color: '#F2C94C' }} />}
            title={item.title}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          icon={<Icon type="folder" style={{ color: '#F2C94C' }} />}
          key={item.key}
          {...item}
        />
      );
    });

  // handle click khi click vào
  onSelect = (selectedKeys, info) => {
    this.setState({ showInfor: true });
    this.props.quantri.dataTree.forEach(value => {
      if (info.selectedNodes[0].props.title == value.tenDonVi) {
        this.props.dispatch({
          type: `quantri/getSpecifitedUni`,
          payload: {
            id: value._id,
            page: 1,
            limit: 10,
          },
        });
      }
    });
  };

  // Handle edit khi click vao nut edit
  handleEdit = record => {
    this.props.dispatch({
      type: 'quantri/changeState',
      payload: {
        showDrawer: true,
        edit: true,
        record,
        key: uuidv1(),
        isTouched: false,
      },
    });
  };

  // Handle add Don Vi
  handleAdd = () => {
    this.props.dispatch({
      type: 'quantri/changeState',
      payload: {
        showDrawer: true,
        edit: false,
        key: uuidv1(),
        isTouched: false,
        isFormEmploee: false,
      },
    });
  };

  // Handle add nhan vien
  handleAddEmployee = () => {
    this.props.dispatch({
      type: 'quantri/changeState',
      payload: {
        isFormEmploee: true,
        showDrawer: true,
        edit: false,
      },
    });
  };
  // Hanlde khi click vao row
  handleRow = (record, index) => {
    this.props.dispatch({
      type: 'quantri/changeState',
      payload: {
        isShowInfor: true,
      },
    });
  };
  render() {
    //  bien tam thoi de dua du lieu vao from khi chua post
    const fakeRecord = {
      idCapTren: 'abc',
      tenDonVi: 'Khoa cntt',
      moTa: '',
      loaiDonVi: 'co don vi chu quan',
      diaChi: 'P201 A1',
      soDienThoai: '012346655',
      fax: 'abcd',
      nhiemVu: '',
      updatedAt: '',
    };
    // Hàm render children cho table
    const renderChildren = data => {
      return (
        <div className={styles.description}>
          <div className={styles.description_detail}>
            <h2>{data.tenDonVi}</h2>
            <p>Địa Chỉ Đơn Vị: Tầng 1 nhà A1- HVBCVT</p>
            <p>Điện Thoại Đơn Vị: (04)123456789</p>
            <p>Số fax</p>
            <p>Chức Năng- nhiệm vụ</p>
          </div>
          <div className={styles.description_buttons}>
            <Button size="large" onClick={() => this.handleEdit(fakeRecord)}>
              <Icon type="form" style={{ color: 'red', fontSize: '20px' }} />
            </Button>
            <Button type="primary" size="large" onClick={() => this.handleAddEmployee()}>
              <Icon type="user-add" />
              Thêm nhân sự
            </Button>
          </div>
        </div>
      );
    };

    // Handle khi click vào từng cell
    const onCell = record => {
      console.log(record);
      return {
        onClick: e => {
          router.push({
            pathname: '/slink/admin/ThongTin',
            query: {
              record,
            },
          });
        },
      };
    };

    // cột của bảng
    const columns: IColumn[] = [
      {
        title: 'STT',
        dataIndex: 'index',
        align: 'center',
        width: '30px',
        onCell,
      },
      {
        title: 'Họ và tên',
        dataIndex: 'hoTen',
        align: 'center',
        width: '80px',
      },
      {
        title: <div style={{ background: 'red' }}>Chức Danh chinh</div>,
        dataIndex: 'chucVu',
        align: 'center',
        width: '150px',
      },
      {
        title: 'Ảnh',
        // dataIndex: 'srcImage',
        align: 'center',
        width: '150px',
        render: (text, record) => (
          <div>
            <img src={record.srcImage} alt="" style={{ width: '120px', height: '160px' }} />
          </div>
        ),
      },
    ];
    // const {quantri: {treeRecord}} = this.props

    return (
      <div className={styles.section_main}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>{this.props.quantri.checkedRecord.tenDonVi}</p>
          <Button type="default" onClick={() => this.handleAdd()}>
            <Icon type="plus-circle" style={{ color: 'red' }} /> Thêm đơn vị
          </Button>
        </div>
        <div className={styles.main}>
          <Tree showIcon={true} className={styles.tree} onSelect={this.onSelect}>
            {this.renderTreeNodes(this.props.quantri.treeRecord)}
          </Tree>
          <div className={styles.infor_section}>
            {this.state.showInfor && (
              <TableBase
                model={this.props.quantri}
                modelName="quantri"
                loading={this.props.loading}
                dispatch={this.props.dispatch}
                columns={columns}
                cond={{}}
                Form={this.props.quantri.isFormEmploee ? FormEmployee : Form}
                children={renderChildren(this.props.quantri.checkedRecord)}
                title={''}
                hasCreate={false}
                tableProp={{
                  scroll: { x: 1000 },
                  // onRow : this.handleRow(record, index)
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default QuanTri;
