import { Entry, Asset } from "contentful";

interface FieldsBanner {
  title: string;
  buttonName: string;
  description: string;
  image: Asset;
  images: Array<Asset>;
  label: string;
  path: string;
}

export type Banner = Entry<FieldsBanner>;

interface FieldsOrnamentsColor {
  color: string;
  image: Asset;
  slug: string;
}

export type OrnamentsColor = Entry<FieldsOrnamentsColor>;
