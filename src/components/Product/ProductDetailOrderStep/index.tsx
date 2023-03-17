import dynamic from 'next/dynamic'

// Component
const BoxInfo = dynamic(() => import('@/components/Box/BoxInfo'))

// Types
import { imageRoute, ORDERSTEPS, TProduct } from '@/constants/common'

// Image
const BigChair = imageRoute('BigChair')

// Styles
import styles from './Product.module.css'

interface Props {
  product: TProduct
}

const ProductDetailOrderStep = ({ product }: Props) => {
  const { order_step } = styles

  return (
    <div className={order_step}>
      {ORDERSTEPS.map((i) => (
        <BoxInfo
          key={i.id}
          icon={i.icon}
          title={i.title}
          description={i.description}
        />
      ))}
    </div>
  )
}
export default ProductDetailOrderStep
