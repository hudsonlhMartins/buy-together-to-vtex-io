import React from "react";
import { FormattedPrice } from 'vtex.formatted-price'
import { Link } from 'vtex.render-runtime'
import { IAdpterProductItemReturn } from "../../helpers/adpterProductItem";
import { useCssHandles } from 'vtex.css-handles'
import { Installments } from "../installments";
import styles from './styles.css'

interface IProductItemProps {
  item: IAdpterProductItemReturn
}

const CSS_HANDLES = [
  'content-product',
  'div-product-img',
  'product-img',
  'product-name',
  'div-product-price',
  'div-product-content-name-price',

] as const
export const ProductItem = ({item}:IProductItemProps)=>{

  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles['content-product']} ${styles['content-product-style']} flex flex-column`}>
     <Link to={item.link} >
        <div className={`${handles['div-product-img']}`}>
          <img className={`${handles['product-img']}`} src={item.imageUrl} alt={item.name} height={"260px"} width={"260px"}/>
        </div>
        <div className={handles['div-product-content-name-price']}>
          <h4 className={`${handles['product-name']}`}>{item.name}</h4>
          <div className={`${handles['div-product-price']}`}>
            <FormattedPrice value={item.sellingPrice} />
            <Installments installments={item.installments}/>
          </div>
        </div>
     </Link>
    </div>
  )
}
