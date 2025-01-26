import { images } from "../assets/images";

import logo1 from "../assets/logo1.png";
import "primeicons/primeicons.css";

// Sidebar item component
const SidebarItem = ({ icon, label, isActive, onClick, open }) => (
  <div
    className={`cursor-pointer flex items-center gap-4 px-5 py-3 rounded-lg transition-all duration-200 ${
      isActive ? "bg-[#D19EDB]" : "hover:bg-[#e2b1ec]"
    } ${open ? "w-full h-[44px]" : "w-[64px] h-[44px]"}`}
    onClick={onClick}
  >
    <img className="w-6 h-6" src={icon} alt={label} />
    {open && <div className="text-white text-lg font-normal">{label}</div>}
  </div>
);

const Sidebar = ({ active, setActive, open, setOpen }) => {
  const sidebarItems = [
    { icon: images.grid, label: "Dashboard" },
    { icon: images.map, label: "Map" },
    { icon: images.unlock, label: "API Keys" },
    { icon: images.sliders, label: "Account Setting" },
    { icon: images.sidebar, label: "Billing" },
    { icon: images.gift, label: "Premium" },
  ];

  return (
    <div className="flex h-full w-full  ">
      <div
        className={`bg-[#00432F]  flex flex-col justify-between ${
          open ? "w-full" : "w-[106px]"
        }`}
      >
        <div className="flex flex-col items-center gap-10 pt-[15px] px-[25px]">
          <div className="flex items-center justify-between gap-0 w-full px-[45px]">
            <img
              className={
                open
                  ? "w-[200px] h-[89.5px] object-cover"
                  : "w-[70px] h-[38.95px]"
              }
              src={open ? images.logo : logo1}
              alt="Amba"
            />
            <i
              className={`pi ${
                open ? "pi-chevron-left" : "pi-chevron-right"
              } cursor-pointer text-white`}
              onClick={() => setOpen(!open)}
            ></i>
          </div>

          <div className="flex flex-col gap-[15px] w-full">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                isActive={active === index}
                onClick={() => setActive(index)}
                open={open}
              />
            ))}
          </div>
        </div>

        <div
          className={`flex items-center gap-4 ${
            open ? "px-[46px] mb-[21px]" : "p-6"
          }`}
        >
          <img
            className="w-[50px] h-[50px] object-cover"
            src={images.download}
            alt="Profile"
          />
          {open && (
            <div>
              <div className="text-white text-lg">John Doe</div>
              <div className="text-white text-sm">+251912345678</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
