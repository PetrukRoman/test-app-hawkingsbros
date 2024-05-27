import { NavLink } from "react-router-dom";
import { useState } from "react";
import arrowDownIcon from "../../assets/chevron.svg";
import { navMenuItem } from "../../types/NavMenuItem";
import Dropdown from "../Dropdown";

const NavBar = ({ links }: { links: navMenuItem[] }) => {
  const [openDropdownId, setOpenDropdownId] = useState<null | number>(null);

  const handleOpenDropdown = (id: number) => {
    setOpenDropdownId(id);
  };
  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  return (
    <nav className="flex h-full">
      <ul className="flex gap-2 items-center">
        {links.map((link, index) => {
          return link.submenu ? (
            <li
              className="group h-full flex items-center relative "
              key={index}
              onMouseEnter={() => handleOpenDropdown(index)}
              onMouseLeave={handleCloseDropdown}
            >
              <button
                className=" h-full  px-2 flex items-center gap-0.5   group-hover:opacity-75 duration-75"
                onClick={() => handleOpenDropdown(index)}
              >
                {link.title}
                <img className="h-5 w-5 mt-1 object-contain" src={arrowDownIcon} alt="arrow-down" />
              </button>
              <Dropdown toggleDropDown={handleCloseDropdown} showDropDown={openDropdownId === index} links={link.submenu} />
            </li>
          ) : (
            <li className="h-full flex " key={index}>
              <NavLink className=" h-full flex px-2 items-center hover:text-indigo-500 duration-75" to={link.to as string}>
                {link.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default NavBar;
