import {
  Avatar,
  Grid,
  Layout,
  Menu,
  Col,
  Row,
  Input,
  Button,
  Form,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { User } from "../../types/user.js";

const { useBreakpoint } = Grid;
const { Sider, Content } = Layout;
const settings = [
  { key: "profile", title: "Профиль" },
  { key: "settings", title: "Настройки" },
  { key: "security", title: "Безопасность" },
  { key: "notifications", title: "Уведомления" },
];

function getUser() {
  const userString = localStorage.getItem("user");
  if (!userString) return null;
  return JSON.parse(userString) || null;
}

const Profile = () => {
  const [selectedKey, setSelectedKey] = useState(settings[0].key);
  const [user, setUser] = useState(getUser());
  const { pathname } = useLocation();
  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  return (
    <>
      <Header currentPath={pathname} />
      <div className="body-profile">
        <div className="layout-container-profile">
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                onClick={handleMenuClick}
              >
                {settings.map((item) => (
                  <Menu.Item key={item.key}>{item.title}</Menu.Item>
                ))}
              </Menu>
            </Sider>
            <Content>
              {selectedKey === "profile" && <ProfileSettings user={user} />}
              {selectedKey === "security" && <SecuritySettings />}
              {selectedKey === "notifications" && <NotificationSettings />}
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
};

const schemaChangePwd = Yup.object().shape({
  password: Yup.string().required("Обязательное поле"),
  newPwd: Yup.string()
    .min(8, "мин-макс длина: 8-32")
    .max(32, "мин-макс длина: 8-32")
    .notOneOf([Yup.ref("password")], "Одинаковые пароли")
    .required("Обязательное поле"),
});

type ProfileSettingsProps = {
  user: User;
};

function ProfileSettings({ user }: ProfileSettingsProps) {
  const screens = useBreakpoint();

  const formChangePwdOptions = { resolver: yupResolver(schemaChangePwd) };
  const { register, reset, handleSubmit, formState } =
    useForm(formChangePwdOptions);
  const { errors } = formState;

  const validatorChangePwd = async (_: any, value: any) => {
    try {
      console.log({ value });
      await schemaChangePwd.validate(value);
      return Promise.resolve();
    } catch (error: any) {
      console.error({ error: error.errors });
      throw new Error(error);
    }
  };

  Grid.useBreakpoint();
  const sprite = "gridy";
  return (
    <div className="settings-container">
      <div className="settings-section">
        <Divider orientation="left">Общая информация</Divider>
        <Row gutter={[16, 30]} className="row-profile-place">
          <Col span={24} md={12}>
            <div className="profile-info">
              <div className="avatar-profile-setting">
                <Avatar
                  className="mini-avatar-profile-settings"
                  src={`https://avatars.dicebear.com/api/${sprite}/${user.id}.svg`}
                />
              </div>
              <div className="info">
                <div className="name">
                  {user.firstName || "Имя"} {user.lastName || "Фамилия"}
                </div>
                <div className="email">{user.email}</div>
                <div className="other-info">...</div>
              </div>
            </div>
          </Col>
        </Row>
        <Divider orientation="left">Мои учебные планы</Divider>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <>
      <div className="settings-container">
        <div className="settings-section">
          <Divider orientation="left">Параметры</Divider>
          <Row gutter={[16, 30]} style={{ marginBottom: 30 }}>
            <Col span={24}>
              <div className="name-change">
                <Form layout="inline">
                  <Form.Item name="firstName">
                    <Input placeholder="Имя" />
                  </Form.Item>
                  <Form.Item name="lastName">
                    <Input placeholder="Фамилия" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Сохранить
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
          <div className="settings-section">
            <Row gutter={[16, 30]}>
              <Col span={8}>
                <div className="password-change">
                  <Form>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Введите текущий пароль" },
                      ]}
                    >
                      <Input.Password placeholder="Текущий пароль" />
                    </Form.Item>
                    <Form.Item
                      name="newPwd"
                      dependencies={["password"]}
                      rules={[
                        { min: 8, max: 32, message: "мин-макс длина: 8-32" },
                        { required: true, message: "Введите новый пароль" },
                        ({ getFieldValue }: any): any => ({
                          validator(_: any, value: string) {
                            if (!value || getFieldValue("password") !== value)
                              return Promise.resolve();
                            return Promise.reject(
                              new Error("Пароли не должны совпадать")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Новый пароль" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Изменить пароль
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 30]}></Row>
          </div>
        </div>
      </div>
    </>
  );
}

function NotificationSettings() {
  return <div>/* форма настроек уведомлений */</div>;
}
export default Profile;
