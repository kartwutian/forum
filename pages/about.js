import React, {PureComponent} from 'react'
import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import WithDva from '../utils/store';

class Index extends PureComponent {
  static async getInitialProps(props) {
    // first time run in server side
    // other times run in client side ( client side init with default props
    console.log('get init props from about');
    const {
      pathname, query, isServer, store,
    } = props;
    // dispatch effects to fetch data here
    await props.store.dispatch({ type: 'global/queryMenus' });
    return {
      // dont use store as property name, it will confilct with initial store
      pathname, query, isServer, dvaStore: store,
    };
  }

  render(){
    return (
      <Layout>
        <h1>{this.props.name}</h1>
      </Layout>
    )
  }
}

export default WithDva(({global}) => { return {...global }; })(Index);