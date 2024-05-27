import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { menuItem } from "../../types/NavMenuItem";

type DropDownProps = {
  links: menuItem[];
  showDropDown: boolean;
  toggleDropDown: () => void;
};

const Dropdown = ({ links, showDropDown, toggleDropDown }: DropDownProps) => {
  return (
    <div
      className={`absolute top-12 shadow-md border rounded-md border-slate-200 p-4  bg-white duration-75 delay-75 z-50 ${
        showDropDown ? "opacity-1 visible" : " opacity-0 invisible"
      } `}
    >
      <h2>Category</h2>
      <ul>
        {links.map((item) => {
          const id = uuidv4();
          return (
            <li key={id}>
              <Link className="hover:text-indigo-500 duration-75" to={item.to} onClick={toggleDropDown}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Dropdown;
