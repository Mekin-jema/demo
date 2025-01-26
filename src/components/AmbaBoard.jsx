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
  const [open, setOpen] = useState(false);
  return (
    <div className=" w-full h-screen bg-white flex ">
      <div
        className={`fixed z-20 top-0 ${
          open ? "w-[300px] " : "w-[118px] "
        } ml-[19px] my-[12px] h-[100%] `}
      >
        <Sidebar
          active={active}
          setActive={setActive}
          open={open}
          setOpen={setOpen}
        />
      </div>
      <div className={`flex-1 h-[90%] ml-[300px] `}>
        {active === 0 && <Board />}
        {active === 1 && <Map setOpen={setOpen} />}

        {active === 2 && <ApiClients />}
        {active === 3 && <AccountSettings />}
        {active === 4 && <Billing />}
        {active === 5 && <Premium />}
      </div>
    </div>
  );
};

export default AmbaBoard;
