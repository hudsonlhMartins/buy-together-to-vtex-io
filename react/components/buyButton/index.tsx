import React, {useState} from "react";
import { useCssHandles } from 'vtex.css-handles'
import { ICrossselling } from "../../typings/typings_crossselling";
import { Button } from "../../ui/Button";
import { useAddToCart } from "./hooks/addToCart";


interface IBuyButtonProps {
  items: ICrossselling[]
  label?: string
  pixelId?: string
}

const CSS_HANDLES = [
 'add-to-cart'

] as const
export const BuyButton = ({items, label="compre junto", pixelId}:IBuyButtonProps)=>{
  const { handles } = useCssHandles(CSS_HANDLES)
  const {addToCart} = useAddToCart()
  const [loading, setLoading] = useState(false)

  const handleCLick = async ()=>{
    setLoading(true)
    try{
      await addToCart({data:items, eventPixelId: pixelId})
    }catch(err){
      console.log('err', err)
    }

    setLoading(false)
  }
  return (
    <div className={handles['add-to-cart']}>
      <Button
        label={label}
        onClick={()=> handleCLick()}
        loading={loading}
      />
    </div>
  )
}
