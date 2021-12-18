export type detailsInterface = {
  name: string;
  company: string;
  description: string;
  price: number;
  discount: number;
  images: imagesInterface[];
};

export interface imagesInterface {
  fullImage: string;
  thumbnail: string;
}
