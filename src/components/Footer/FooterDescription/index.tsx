import { CATEGORIES, MENU, OURCOMPANY } from '../../../constants/common'

// Styles
import styles from '../Footer.module.css'

const FooterDescription = () => {
  const { description, title, title_item, list_item } = styles
  return (
    <div className={description}>
      <div className={list_item}>
        <h3 className={title}>Menu</h3>
        {MENU.map((i) => (
          <p className={title_item} key={i}>
            {i}
          </p>
        ))}
      </div>
      <div className={list_item}>
        <h3 className={title}>Categories</h3>
        {CATEGORIES.map((i) => (
          <p className={title_item} key={i}>
            {i}
          </p>
        ))}
      </div>
      <div className={list_item}>
        <h3 className={title}>Our company</h3>
        {OURCOMPANY.map((i) => (
          <p className={title_item} key={i}>
            {i}
          </p>
        ))}
      </div>
    </div>
  )
}

export default FooterDescription
