import React from "react";
import { FormattedPrice } from 'vtex.formatted-price'
import { IAdpterProductItemReturn } from "../../helpers/adpterProductItem";
export const TotalPrice = ({items}: {items:IAdpterProductItemReturn[]})=>{

  const priceTotal = items.reduce((acc, item)=>{
    return acc + item.sellingPrice
  },0)

  return (
    <>
       <FormattedPrice value={priceTotal} />
    </>
  )
}
