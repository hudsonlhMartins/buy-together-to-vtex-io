export interface IItemCart {
  aditionalInfo: AditionalInfoType
  availability?: boolean
  id?: string
  imageUrls?: ImageUrlsType,
  listPrice?: number,
  measurementUnit?: string
  name?: string
  price?: number
  productId?: string
  quantity?: number
  seller?: string | number // seller id
  sellingPrice?: number
  skuName?: string
  unitMultiplier?: number
  uniqueId?: string // id do product
  isGift?: boolean
  __typename: "Item"
}
type AditionalInfoType = {
  brandName?: string,
  __typename: "ItemAdditionalIndo"
}
type ImageUrlsType = {
  at1x?: string
  __typename: "ImageUrls"
}
