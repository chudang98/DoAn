import React from 'react';
import { Drawer } from 'antd';
import { connect } from 'dva';
import { withRouter } from 'umi';
import router from 'umi/router';
import queryString from 'query-string';
import PropTypes from 'prop-types';

const propTypes = {
  isOpenName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
/**
 *
 * @param {isOpenName, title} props
 * 
 * isOpenName: tên Key của State để xác định Drawer có open hay không
 * Ex: <SimpleDrawer isOpenName='openCongVan' title='Quản trị công văn> <FormAbc/> </SimpleDrawer/>
 * Thi khi đó ở Component nào đó muốn mở drawer thì gọi queryString ở router nhuư sau: ?openCongVan=true'
 *
 */
const SimpleDrawer = props => {
  const { isOpenName, location } = props;
  const onClose = () => {
    router.push({
      pathname: location.pathname,
      query: {
        [isOpenName]: false,
        data: JSON.stringify({}),
      },
    });
  };

  const parsed = queryString.parse(location.search);
  return (
    <Drawer
      title={<div className="cardTitle">{props.title}</div>}
      width={720}
      onClose={onClose}
      visible={parsed[isOpenName] === 'true' || false}
    >
      {props.children}
    </Drawer>
  );
};

SimpleDrawer.propTypes = propTypes;

export default withRouter(SimpleDrawer);
