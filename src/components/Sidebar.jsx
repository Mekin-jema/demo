import { images } from "../assets/images";

import "primeicons/primeicons.css";

// Sidebar item component
const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <div
    className={`cursor-pointer flex  items-center gap-4 px-5 py-3 rounded-lg transition-all duration-200 ${
      isActive ? "bg-[#4AA381]" : "hover:bg-[#357b60] "
    } ${open ? "w-full h-[44px]" : "w-[64px] h-[44px]"} `}
    onClick={onClick}
  >
    <img className="w-6 h-6" src={icon} alt={label} />
    <div className="text-white text-lg font-normal">{label}</div>
  </div>
);

const Sidebar = ({ active, setActive, open, setOpen }) => {
  const sidebarItems = [
    { icon: images.grid, label: "Dashboard" },
    { icon: images.map, label: "Map" },
    { icon: images.unlock, label: "API Keys" },
    { icon: images.sliders, label: "Account Setting" },
    { icon: "", label: "Billing" },
    { icon: images.gift, label: "Premium" },
  ];

  return (
    <div className="flex h-full w-full  ">
      {open ? (
        <div className=" bg-[#00432F] rounded-2xl flex flex-col justify-between w-full">
          <div className="flex flex-col items-center gap-10 pt-[15px] px-[25px]">
            <div className="flex items-center justify-between gap-4 w-full px-[45px] ">
              <img
                className="w-[200px] h-[89.5px] object-cover"
                src={images.logo}
                alt="Amba"
              />
              <div>
                {open ? (
                  <i
                    className="pi pi-chevron-left cursor-pointer text-white "
                    onClick={() => setOpen(!open)}
                  ></i>
                ) : (
                  <i
                    className="pi pi-chevron-right cursor-pointer text-white"
                    onClick={() => setOpen(!open)}
                  ></i>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[15px] w-full">
              {sidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  isActive={active === index}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 ml-[46px] mr-[47px] mb-[21px]">
            <img
              className="w-[50px] h-[50px] object-cover"
              src={images.download}
              alt="Profile"
            />
            <div>
              <div className="text-white text-lg">John Doe</div>
              <div className="text-white text-sm">+251912345678</div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" bg-[#00432F] rounded-2xl flex flex-col justify-between ml-0 h-full w-full">
          <div className="flex flex-col items-center gap-10 mt-[15px] ml-[16px] mr-[17px] px-[10.5px]">
            <div className="flex items-center justify-between   ">
              <img
                className="w-[80px] h-[71.6px] "
                src={images.amba1}
                alt="Amba"
              />
              <div>
                {open ? (
                  <i
                    className="pi pi-chevron-left cursor-pointer text-white "
                    onClick={() => setOpen(!open)}
                  ></i>
                ) : (
                  <i
                    className="pi pi-chevron-right cursor-pointer text-white"
                    onClick={() => setOpen(!open)}
                  ></i>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
              {sidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  isActive={active === index}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 p-6">
            <img
              className="w-[50px] h-[50px] object-cover"
              src={images.download}
              alt="Profile"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
