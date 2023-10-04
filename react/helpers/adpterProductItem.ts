import { ICrossselling, Installment } from "../typings/typings_crossselling"

export interface IAdpterProductItemReturn {
    name: string;
    productId: string;
    imageUrl: string;
    sellingPrice: number;
    listPrice: number;
    installments: Installment[];
    link: string
}
export const adpterProductItem = (products:ICrossselling[]):IAdpterProductItemReturn[]=>{

  const productsItem = products?.map(el=>({
    name: el.productName,
    productId: el.productId,
    imageUrl: el.items[0].images[0].imageUrl,
    sellingPrice: el.items[0].sellers[0].commertialOffer.Price,
    listPrice: el.items[0].sellers[0].commertialOffer.ListPrice,
    installments: el.items[0].sellers[0].commertialOffer.Installments,
    link: el.link
  }))


  return productsItem
}
