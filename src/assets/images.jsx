import amba1 from "./Sidebar/Amba 1.png";
import download from "./Sidebar/download.svg";
import gift from "./Sidebar/gift.svg";
import grid from "./Sidebar/grid.png";
import map from "./Sidebar/map.svg";
import sidebar from "./Sidebar/Sidebar.svg";
import sliders from "./Sidebar/sliders.svg";
import unlock from "./Sidebar/unlock.svg";

const images = {
  logo: new URL("/logo.png", import.meta.url).href,
  amba1: amba1,
  download: download,
  gift: gift,
  grid: grid,
  map: map,
  sidebar: sidebar,
  sliders: sliders,
  unlock: unlock,
};

export { images };
