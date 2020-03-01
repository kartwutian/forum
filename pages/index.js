import React, { PureComponent } from "react";
import { Steps, Carousel, Card, Row, Col } from "antd";

import Layout from "../layouts/BasicLayout";
import Link from "next/link";

import WithDva from "../utils/store";
import classNames from "classnames";
import styles from "./index.less";

const { Step } = Steps;

class Index extends PureComponent {
  static async getInitialProps(props) {
    // first time run in server side
    // other times run in client side ( client side init with default props
    console.log("get init props from index");
    const { pathname, query, isServer, store } = props;
    // dispatch effects to fetch data here
    await props.store.dispatch({ type: "global/queryMenus" });
    return {
      // dont use store as property name, it will confilct with initial store
      pathname,
      query,
      isServer,
      dvaStore: store
    };
  }

  render() {
    const { global, dispatch, isServer } = this.props;
    return (
      <Layout global={global} dispatch={dispatch} isServer={isServer}>
        <Row gutter={16} className={classNames(styles.container)}>
          <Col span={16}>
            <Card>
              <Carousel autoplay>
                <div>
                  <img
                    className={classNames(styles.slider__img)}
                    src="https://r1.ykimg.com/050C00005948874AADBC09648C014ED9?x-oss-process=image/resize,w_290/interlace,1/quality,Q_80/sharpen,100"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className={classNames(styles.slider__img)}
                    src="https://upload.jianshu.io/admin_banners/web_images/4894/23ecc55accf5c6a6c9910be966c125853d1f04a5.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
                    alt=""
                  />
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
              </Carousel>
            </Card>
          </Col>
          <Col span={8}>
            <Card>123</Card>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default WithDva(({ global }) => {
  return { global };
})(Index);
