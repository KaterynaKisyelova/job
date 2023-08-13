import Wrapper from "../assets/wrappers/SmallSidebar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";
import { AppDispatch, RootState } from "../store";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
