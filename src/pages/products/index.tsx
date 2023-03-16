import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import dynamic from 'next/dynamic'

// Component
import Layout from '@/components/Layout'
import LoadingIndicator from '@/components/LoadingIndicator'
const Product = dynamic(() => import('@/components/Product'), {
  loading: () => <LoadingIndicator />,
})

// Constant
import { API, TProduct } from '@/constants/common'

// Styles
import styles from './Product.module.css'

// Utils
import { fetcher } from '@/utils'
import { useMemo } from 'react'

interface ProductProps {
  products: TProduct[]
}

const Products = ({ products }: ProductProps) => {
  const router = useRouter()
  const querySearch = router.query.search
  const category = router.query.category
  const { product, none_product, text_alert_info, text_alert } = styles

  const { data, error } = useSWR(
    `${API}/products/?search=${querySearch ? `${querySearch}` : ''}`,
    fetcher,
  )

  if (error) return { notFound: true }
  if (!products) return <LoadingIndicator />

  const filteredProducts = useMemo(() => {
    if (category) {
      return products.filter((product: TProduct) =>
        product.category.includes(category as string),
      )
    }
    return products
  }, [category, products])

  return (
    <Layout>
      {filteredProducts && filteredProducts.length ? (
        <div className={product}>
          {filteredProducts.map((product: TProduct) => (
            <Product
              id={product.id}
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              imageSize="small"
            />
          ))}
        </div>
      ) : (
        <div className={none_product}>
          <div className={text_alert_info}>
            <h1 className={text_alert}>There are no products!!</h1>
          </div>
        </div>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<ProductProps> = async () => {
  const products = await fetcher(`${API}/products`)

  return {
    props: { products },
  }
}

export default Products
