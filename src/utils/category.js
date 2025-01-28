import {
  FaUtensils,
  FaHotel,
  FaShoppingCart,
  FaTree,
  FaGasPump,
} from "react-icons/fa";

// Categories with icon components instead of JSX
const categories = [
  {
    name: "Restaurants",
    tag: "amenity=restaurant",
    IconComponent: FaUtensils, // Store the icon component
    icon: "restaurant",
    iconUrl: "/icons/restaurant.png",
  },
  {
    name: "Hotels",
    tag: "tourism=hotel",
    IconComponent: FaHotel, // Store the icon component
    icon: "hotel",
    iconUrl: "/icons/hotel.png",
  },
  {
    name: "Grocery Stores",
    tag: "shop=supermarket",
    IconComponent: FaShoppingCart, // Store the icon component
    icon: "supermarket",
    iconUrl: "/icons/supermarket.png",
  },
  {
    name: "Parks",
    tag: "leisure=park",
    IconComponent: FaTree, // Store the icon component
    icon: "park",
    iconUrl: "/icons/park.png",
  },
  {
    name: "Fuel Stations",
    tag: "amenity=fuel",
    IconComponent: FaGasPump, // Store the icon component
    icon: "fuel",
    iconUrl: "/icons/fuel.png",
  },
];

export default categories;
