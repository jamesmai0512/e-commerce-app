import { Suspense, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import useSWR from 'swr'

// Component
import Layout from '@/components/Layout'
import LoadingIndicator from '@/components/LoadingIndicator'
const Button = dynamic(() => import('@/components/Button'))
const InputNumber = dynamic(() => import('@/components/Input/InputNumber'))
const Input = dynamic(() => import('@/components/Input'))
const BoxInfo = dynamic(() => import('@/components/Box/BoxInfo'))

// Types
import { API, imageRoute, ORDERSTEPS, TProduct } from '@/constants/common'
import { CartItem } from '../carts'

// Image
const BigChair = imageRoute('BigChair')

// Utils
import { fetcher } from '@/utils'

// Styles
import styles from './Product.module.css'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props {
  product: TProduct
}

const ProductDetailPage = ({ product }: Props) => {
  const {
    product_detail,
    product_detail_content,
    product_detail_content_title,
    product_detail_content_price,
    product_detail_content_description,
    product_detail_content_description_content,
    product_detail_content_description_list_content,
    product_detail_content_dimensions,
    product_detail_content_dimensions_size,
    cart_function_item,
    input_amount,
    introduce_brand,
    order_step,
    email_form,
    form_text,
    form_text_title,
    form_text_description,
    form_email_submit,
  } = styles
  const router = useRouter()
  const [value, setValue] = useState(1)
  const [carts, setCarts] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchCartsData = async () => {
      const cartsData = await fetcher(`${API}/carts`)
      setCarts(cartsData)
    }

    fetchCartsData()
  }, [])

  const addProductToCart = useCallback(
    async (newValue: number, event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      try {
        const existingCartItem = carts.find(
          (item: CartItem) => item.productId === product.id,
        )
        let updatedQuantity = newValue
        if (existingCartItem) {
          updatedQuantity += existingCartItem.quantity
          const response = await fetch(`${API}/carts/${existingCartItem.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: newValue,
            }),
          })
          if (!response.ok) {
            throw new Error('Unable to add product to cart')
          }
        } else {
          const response = await fetch(`${API}/carts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: product.id,
              quantity: newValue,
              price: product.price,
            }),
          })
          if (!response.ok) {
            throw new Error('Unable to add product to cart')
          }
        }
        router.push('/carts')
      } catch (error) {
        return {
          notFound: true,
        }
      }
    },
    [product.id, router],
  )

  const onIncrease = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      if (value < 10) {
        const newValue = value + 1
        setValue(newValue)
      }
    },
    [value],
  )

  const onDecrease = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      if (value > 0) {
        const newValue = value - 1
        setValue(newValue)
      }
    },
    [value],
  )

  return (
    <Layout>
      <Suspense fallback={<LoadingIndicator />}>
        <div className={product_detail}>
          <div>
            <Image
              src={BigChair}
              alt="product-image"
              loading="eager"
              width={721}
              height={759}
            />
          </div>
          <div className={product_detail_content}>
            <h1 className={product_detail_content_title}>{product.title}</h1>
            <h2 className={product_detail_content_price}>£{product.price}</h2>
            <h4 className={product_detail_content_description}>Description</h4>
            <div className={product_detail_content_description_content}>
              <p>
                A timeless design, with premium materials features as one of our
                most popular and iconic pieces. The dandy chair is perfect for
                any stylish living space with beech legs and lambskin leather
                upholstery.
              </p>
              <ul className={product_detail_content_description_list_content}>
                <li>Premium material</li>
                <li>Handmade upholstery</li>
                <li>Quality timeless classic</li>
              </ul>
            </div>
            <h4>Dimensions</h4>
            <div className={product_detail_content_dimensions}>
              <div className={product_detail_content_dimensions_size}>
                Height <br />
                110cm
              </div>
              <div className={product_detail_content_dimensions_size}>
                Width <br />
                75cm
              </div>
              <div className={product_detail_content_dimensions_size}>
                Depth <br />
                50px
              </div>
            </div>
            <form
              onSubmit={(event) => addProductToCart(value, event)}
              className={cart_function_item}
            >
              <div className={input_amount}>
                <h4>Amount</h4>
                <InputNumber
                  value={value}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              </div>

              <Button type="submit" background="purple" text="Add to cart" />
            </form>
          </div>
        </div>
        <h1 className={introduce_brand}>What makes our brand different</h1>
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

        <div className={email_form}>
          <div className={form_text}>
            <h1 className={form_text_title}>
              Join the club and get the benefits
            </h1>
            <p className={form_text_description}>
              Sign up for our newsletter and receive exclusive offers on new
              ranges, sales, pop up stores and more
            </p>
            <form className={form_email_submit}>
              <Input background="light" placeholder="your@email.com" />
              <Button background="purple" text="Sign Up" />
            </form>
          </div>
        </div>
      </Suspense>
    </Layout>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const products = await fetcher(`${API}/products`)
    const paths = products.map((product: TProduct) => ({
      params: { productId: String(product.id) },
    }))
    return { paths, fallback: false }
  } catch (error) {
    console.error(error)
    return { paths: [], fallback: true }
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const { productId } = params || {}
    const product = await fetcher(`${API}/products/${productId}`)
    return {
      props: {
        product,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}

export default ProductDetailPage
