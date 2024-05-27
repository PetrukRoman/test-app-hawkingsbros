export type changeQuantityProduct = {
  userGuid: string;
  newValue: number;
  productId: number;
};
export type productPictures = {
  FileName: string;
  FileExtension: string;
  Image: string;
};
export type cartProduct = {
  Id: number;
  Name: string;
  Description: string;
  Quantity: number;
  Unit: string;
  Currency: string;
  Price: number;
  DiscountedPrice: number;
  Images: productPictures[];
};
