import { adpterAddToCart } from "../../../helpers/adpterAddToCart";
import { ICrossselling } from "../../../typings/typings_crossselling";
import { OrderItems } from "vtex.order-items";
import { usePixel } from "vtex.pixel-manager";
import type { PixelData } from "vtex.pixel-manager/react/PixelEventTypes"

interface IAddToCartProps {
  eventPixelId?: string
  data: ICrossselling[]
}

const FAKE_TIMER_OPEN_MINICART = 2 * 1000
const sleepFake = async (fn:()=>void)=>{
  return new Promise((resolve, _)=>{
    setTimeout(()=>{
      resolve(fn())
    },FAKE_TIMER_OPEN_MINICART)
  })
}
export const useAddToCart = ()=>{
  const { push } = usePixel();
  const {useOrderItems} = OrderItems
  const { addItems } = useOrderItems();


  const addToCart = async({data,eventPixelId}:IAddToCartProps) =>{
    const elementsCart = data.map(el =>{
      return adpterAddToCart(el)
    })

    const itemCart = elementsCart.map(el => el.cart)

    await addItems(itemCart);

    if(!eventPixelId) return

    const pixelEventItems = elementsCart.map(el => el.pixel)

    const pixelEvent:PixelData = {
      id: eventPixelId ? eventPixelId : "",
      event: "addToCart",
      items: pixelEventItems,
    };

     await sleepFake(()=>push(pixelEvent))
  }

  return {
    addToCart
  }
}
