export interface SubMenu {
  name: string;
  path: string;
}

export default interface MenuItem{
  name:string;
  submenu?: SubMenu[];
  path: string;
}