import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  AccountSettings,
  ApiClients,
  Billing,
  Board,
  Map,
  Premium,
} from "../pages";

export const AmbaBoard = () => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(true);
  return (
    <div className=" w-full h-[982px] bg-white flex ">
      <div
        className={` ${
          open ? "w-[300px] " : "w-[118px] "
        } ml-[19px] mt-[12px] h-[953px]`}
      >
        <Sidebar
          active={active}
          setActive={setActive}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <div className={`flex-1 h-[953px]  m-0 `}>
        {active === 0 && <Board />}
        {active === 1 && <Map />}

        {active === 2 && <ApiClients />}
        {active === 3 && <AccountSettings />}
        {active === 4 && <Billing />}
        {active === 5 && <Premium />}
      </div>
    </div>
  );
};

export default AmbaBoard;
