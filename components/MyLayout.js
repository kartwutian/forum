import Header from './Header'
import styles from './index.less'

export default function Layout(props) {
  return (
    <div className={styles.demo}>
      <Header />
      {props.children}
    </div>
  )
}
