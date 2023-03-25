import { Avatar, Dropdown, Menu } from "antd";
import "./AvatarMenu.css";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Paths } from "../../../common/constants/paths";

const AvatarMenu = ({ userId }: any) => {
  const menu = (
    <Menu>
      <Menu.Item key="profile" className="icon">
        <UserOutlined />
        <Link to={Paths.Profile}> Профиль</Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <SettingOutlined />
        <Link to={Paths.ProfileSettings}> Настройки</Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        Выход
      </Menu.Item>
    </Menu>
  );
  const sprite = "gridy";
  return (
    <Dropdown overlay={menu} trigger={["click"]} placement={"bottomLeft"}>
      <Avatar
        shape="circle"
        size={50}
        src={`https://avatars.dicebear.com/api/${sprite}/${userId}.svg`}
        alt="Avatar"
        className="avatar"
      />
    </Dropdown>
  );
};

export default AvatarMenu;
