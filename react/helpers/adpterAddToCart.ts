import { IItemCart } from "../typings/typings_add_to_cart";
import { ICrossselling } from "../typings/typings_crossselling";
import { IPixel } from "../typings/typings_pixel";

interface IAdpterAddToCartReturn{
  cart: IItemCart
  pixel: IPixel
}

export const adpterAddToCart = (item:ICrossselling):IAdpterAddToCartReturn=>{
  const seller =  item.items[0].sellers[0]
  const commertialOffer =  seller.commertialOffer
  const quantityAvalible = commertialOffer.AvailableQuantity
  const producItem = item.items[0]

  const cart:IItemCart = {
    aditionalInfo: {
      brandName: item.brand,
      __typename: "ItemAdditionalIndo"
    },
    availability: quantityAvalible > 0 ? true : false,
    id: producItem.itemId, // id sku
    imageUrls: {
      at1x: producItem.images[0].imageUrl,
      __typename: "ImageUrls"
    },
    listPrice: commertialOffer.ListPrice,
    measurementUnit: producItem.measurementUnit,
    name: item.productName,
    price: commertialOffer.Price,
    productId: item.productId,
    quantity: 1,
    seller: seller.sellerId, // seller id
    sellingPrice: commertialOffer.Price,
    skuName: item.productName,
    unitMultiplier: producItem.unitMultiplier,
    uniqueId: producItem.itemId, // id do sku
    isGift: false,
    __typename: "Item"
  }

  const pixel: IPixel = {
    skuId: producItem.itemId,
    ean: producItem.ean,
    price: commertialOffer.Price,
    priceIsInt: true,
    name: item.productName,
    quantity: 1,
    productId: item.productId,
    productRefId: item.productReference,
    brand: item.brand,
    imageUrl: producItem.images[0].imageUrl,
    referenceId: producItem.referenceId[0].Value,
    seller: seller.sellerId, // id dof seller
    sellerName: seller.sellerName
  }

  return {
    cart,
    pixel
  }
}
