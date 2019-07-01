import React, { PureComponent } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';
import classNames from 'classnames';
import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;

class Page extends PureComponent {

  constructor(props) {
    super(props);
  };

  renderLogo = () => {
    const { global: { logoUrl, appName  } } = this.props
    return (
      <div className={classNames(styles.logo)} >
        <img src={logoUrl} alt="logo" />
        <div>{appName}</div>
      </div>
    );
  };

  renderMenus = () => {
    const { global: { menus }, router: {pathname} } = this.props
    return (
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[pathname]}
        style={{ lineHeight: '63px' }}
      >
        {
          menus.map(item => (
            <Menu.Item key={item.path}>
              <Link href={item.path}>
                <a>{item.name}</a>
              </Link>
            </Menu.Item>
          ))
        }
      </Menu>
    );
  }

  render() {
    const { global, children } = this.props
    return (
      <Layout className="layout">
        <Header className={classNames(styles.header)}>
          <Row>
            <Col span={6}>{this.renderLogo()}</Col>
            <Col span={12}>{this.renderMenus()}</Col>
          </Row>
        </Header>
        <Content className={classNames(styles.content)}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            {children}
          </div>
        </Content>
        <Footer>全局底部</Footer>
      </Layout>
    );
  }
}

export default withRouter(Page);
