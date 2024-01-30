import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const ToggleIcon = ({ isClicked }) => {
  return <>{isClicked ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}</>;
};

export default ToggleIcon;
