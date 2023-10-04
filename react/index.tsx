import React from 'react'
import {useProduct}  from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

import { useFetch } from './hooks/useFetch/useFetch'
import { ICrossselling } from './typings/typings_crossselling'
import { adpterProductItem } from './helpers/adpterProductItem'
import { ProductItem } from './components/productItem'
import { IconEqual, IconPlus } from './Icon'
import { TotalPrice } from './components/totalPrice'
import { BuyButton } from './components/buyButton'
import { SkeletonBuyTogether } from './ui/skleton'


interface IBuyTogetherProps  {
  label?: string
  pixelId?: string

}

const CSS_HANDLES = [
  'container-buy-together-products',
  'container-buy-together',
  'wrapper-product-buy-together',
  'icon-plus',
  'icon-equal',
  'title-total',
  'price-total',
  'content-left'

] as const

function BuyTogether({label, pixelId}:IBuyTogetherProps) {
  const {product} = useProduct() ?? {}
  const productId = product?.productId
  const { handles } = useCssHandles(CSS_HANDLES)

  const {data, loading} = useFetch<ICrossselling[]>({
    url: `/api/catalog_system/pub/products/crossselling/similars/${productId}`
  })

  const productItems = adpterProductItem(data)

  if(loading){
    return (
      <SkeletonBuyTogether/>
    )
  }
  if(!data) return <></>

  return(

    <div className={`${handles['container-buy-together']} flex items-center`}>
      <div className={`${handles['container-buy-together-products']} flex items-center`}>
        {productItems?.map((el, index, array )=>(
          <>
            <div className={`${handles['wrapper-product-buy-together']}`} key={el.productId}>
              <ProductItem item={el} />
            </div>
            {((index +1) < array.length) && (
                <span className={`${handles['icon-plus']} mh5`}>
                  <IconPlus/>
                </span>
              )}
          </>
        ))}
      </div>
      <div className={`${handles['content-left']} flex items-center`}>
        <span className={`${handles['icon-equal']} ph5`}>
          <IconEqual/>
        </span>
        <div>
            <p className={`${handles['title-total']}`}>TOTAL COM DESCONTO:</p>
            <strong className={handles['price-total']}>
              <TotalPrice items={productItems}/>
            </strong>
            <BuyButton items={data} pixelId={pixelId} label={label}/>
        </div>
      </div>
    </div>
  )
}

export default BuyTogether
BuyTogether.schema = {
  title: 'botao compre junto',
  type: 'object',
  properties: {
    label: {
      title: 'Label do botao',
      type: 'string',
    },
    pixelId: {
      title: 'pixel id',
      type: 'string',
      description: 'id para abrir o minicart'
    }
  }
}
