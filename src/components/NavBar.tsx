import React from "react";
import { Menu } from "antd";
import { MailOutlined, LoginOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const NavBar = () => {
  const handleClick = (e: any) => {
    console.log("click ", e);
  };

  return (
    <Menu onClick={handleClick} mode="horizontal" theme="dark">
      <Menu.Item key="app" icon={<LoginOutlined />}>
        <Link to={"/login"}> Login</Link>
      </Menu.Item>
      <SubMenu key="SubMenu" icon={<PlusOutlined />} title="Companys">
        <Menu.Item key="setting:1">
          <Link to={"/create-company"}>Create</Link>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <Link to={"/"}>Show All </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="SubMenu2" icon={<PlusOutlined />} title="Posts">
        <Menu.Item key="setting:1">
          <Link to={"/create-post"}>Create</Link>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <Link to={"/all-post"}>Show All </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default NavBar;
