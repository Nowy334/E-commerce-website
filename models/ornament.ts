export interface Ornament {
  title:string;
  color: string[];
  mainPhoto: any;
  photos: {metadata:any, sys: any, fields:any}[];
  price: number;
  description: string; 
  slug:string; 
}