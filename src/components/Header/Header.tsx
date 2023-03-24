import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Paths } from "../../common/constants/paths";
import "./Header.css";
import AvatarMenu from "./AvatarMenu/AvatarMenu";

export interface HeaderProps {
  currentPath: string;
}

const Header = ({ currentPath }: HeaderProps) => {
  const userString = localStorage.getItem("user");
  const user = userString && JSON.parse(userString);
  console.log({ user: user.email });

  return (
    <>
      <div className="header-line">
        <AvatarMenu userId={user?.id} />
      </div>
      <div className="menu">
        <Menu mode="horizontal" selectedKeys={[currentPath]}>
          <Menu.Item key={Paths.AcademicPlans}>
            <Link to={Paths.AcademicPlans}>Учебные планы</Link>
          </Menu.Item>
          <Menu.Item key={Paths.Disciplines}>
            <Link to={Paths.Disciplines}>Дисциплины</Link>
          </Menu.Item>
          <Menu.Item key={Paths.Competencies}>
            <Link to={Paths.Competencies}>Компетенции</Link>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};
export default Header;
