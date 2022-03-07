import MenuItems from "../models/menuItem.model";

export const MenuItemsList: MenuItems[] = [
  {
    name: "Home",
    path: "/",
  },

  {
    name: "O nas",
    path: "/o-nas",
  },

  {
    name: "Galeria",
    path: "/galeria",
  },

  {
    name: "Na sprzedaż",
    submenu: [
      {
        name: "Stroje startowe",
        path: "/stroje-startowe",
      },
      {
        name: "Ozdoby do wlosow",
        path: "/ozdoby-do-wlosow",
      },
      {
        name: "Body",
        path: "/body",
      },
    ],
    path: "/na-sprzedaz",
  },

  {
    name: "Zamówienia",
    submenu: [
      {
        name: "Złóż zamówienie",
        path: "/",
      },
      {
        name: "Sposób mierzenia",
        path: "/sposob-mierzenia",
      },
    ],
    path: "/zamowienia",
  },

  {
    name: "Kontakt",
    path: "/kontakt",
  },
];
