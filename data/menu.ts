import MenuItems from "../models/menuItem.model";

export const MenuItemsList: MenuItems[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Stroje",
    disabled: true,
    path: "/stroje",
    submenu: [
      {
        name: "Nowe stroje",
        path: "/nowe-stroje",
      },
      {
        name: "Stroje używane",
        path: "/stroje-uzywane",
      },
    ],
  },
  {
    name: "Korony na kok",
    path: "/korony-na-kok",
  },
  {
    name: "Bielizna",
    disabled: true,
    path: "/bielizna",
    submenu: [
      {
        name: "Body invisible",
        path: "/body",
      },
      {
        name: "Majtki invisible",
        path: "/majtki-invisible",
      },
    ],
  },
  {
    name: "Galeria",
    path: "/galeria",
  },
  {
    name: "O nas",
    path: "/o-nas",
  },
  {
    name: "Sposób mierzenia",
    path: "/sposob-mierzenia",
  },
  {
    name: "Kontakt",
    path: "/kontakt",
  },
];
