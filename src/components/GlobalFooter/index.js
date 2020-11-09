import React from 'react';
import classNames from 'classnames';
import {Row, Col} from 'antd';
import styles from './index.less';

const GlobalFooter = () => {
  const list1 = ['Văn phòng UBND tỉnh', 
            'Ban Quản lý các KCN',
            'Công an tỉnh', 
            'Sở Công thương',
            'Sở Giáo dục và Đào tạo', 
            'Sở Giao thông Vận tải',
            'Sở Kế hoạch và Đầu tư',
            'Sở Khoa học và Công nghệ', 
            'Sở Lao động TBXH', 
            'Sở Nội vụ'];
  const list2 = ['Sở Ngoại vụ',
            'Sở Nông nghiệp và PTNT', 
            'Sở Tài chính',
            'Sở Tài nguyên và Môi trường',
            'Sở Tư pháp',
            'Sở Thông tin và Truyền thông',
            'Sở Văn hoá, Thể thao và Du lịch',
            'Sở Xây dựng',
            'Sở Y tế',
            'Thanh tra tỉnh'];
  const list3 = ['Thành phố Thái Bình',  
            'Huyện Đông Hưng',
            'Huyện Hưng Hà',
            'Huyện Kiến Xương', 
            'Huyện Quỳnh Phụ',
            'Huyện Tiền Hải',
            'Huyện Thái Thuỵ', 
            'Huyện Vũ Thư'];
  const list4 = ['Đoàn TNCS Hồ Chí Minh',
            'Hội Chữ thập đỏ',
            'Liên đoàn Lao động tỉnh',
            'Liên hiệp các hội KHKT',
            'Hội Phụ nữ',
            'Hội Cựu chiến binh',
            'Hội Nông dân'];
  const list5 = ['Hội Văn học nghệ thuật',
            'Hội Nhà báo',
            'Hội Khuyến học',
            'Hội Người mù',
            'Hội Người cao tuổi',
            'Hội bảo trợ người tàn tật và trẻ mồ côi',
            'Mặt trận tổ quốc'];

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <Row gutter={24} className={styles.row1}> 
          <Col xs={24} sm={8} md={8}>
            <div className={styles.title}>DANH SÁCH SỞ, NGÀNH</div>
            <Row>
              <Col span={12} style={{padding: 0}}>
                <ul className={styles.itemLi}>
                  {list1.map((name, index) =>
                    <li key={index}>{name}</li>)}
                </ul>
              </Col>
              <Col span={12}>
                <ul className={styles.itemLi}>
                  {list2.map((name, index) =>
                    <li key={index}>{name}</li>)}
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={6} md={6}>
            <div className={styles.title}>HUYỆN/THÀNH PHỐ</div>
            <div>
              <ul className={styles.itemLi}>
                {list3.map((name, index) =>
                  <li key={index}>{name}</li>)}
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={10} md={10}>
            <div className={styles.title}>CÁC TỔ CHỨC KHÁC</div>
            <Row>
              <Col span={12}>
                <ul className={styles.itemLi}>
                  {list4.map((name, index) =>
                    <li key={index}>{name}</li>)}
                </ul>
              </Col>
              <Col span={12}>
                <ul className={styles.itemLi}>
                  {list5.map((name, index) =>
                    <li key={index}>{name}</li>)}
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className={styles.container2}>  
        <Row className={styles.row2}>
          <Col span={12}>
            <div className={styles.textNor}>Cổng thông tin điện tử tỉnh Thái Bình</div>
            <div className={styles.textNor}>Cơ quan thường trực: Sở Thông tin và Truyền thông tỉnh Thái Bình</div>
            <div className={styles.textDes}>Địa chỉ: Số 431- Trần Hưng Đạo - Thành phố Thái Bình</div>
          </Col>
          <Col span={12}>
            <div className={styles.textNor}>Số lượt truy cập</div>
            <div style={{fontSize: 20}}>580.136</div>
            <div className={styles.textNor}>Chịu trách nhiệm chính: Ông Vũ Tiến Khoái</div>
            <div className={styles.textNor}>Giám đốc Sở Thông tin và Truyền thông Thái Bình</div>
            <div className={styles.textDes}>Điện thoại: (0227).3732047; Fax: (0227).3743787</div>
            <div className={styles.textDes}>Email: banbientapcong@thaibinh.gov.vn</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GlobalFooter;