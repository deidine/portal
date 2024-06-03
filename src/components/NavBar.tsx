import React, { useEffect, useState } from "react";
import { Menu, Avatar, Button } from "antd";
import { MailOutlined, LoginOutlined, PlusOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const { SubMenu } = Menu;

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  preferred_username: string;
}

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      const { id, email, user_metadata } = data.user;
      setUser({
        id,
        email: email || "",
        full_name: user_metadata.full_name || "",
        avatar_url: user_metadata.avatar_url || "",
        preferred_username: user_metadata.preferred_username || "",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  return (
    <Menu onClick={(e) => console.log("click ", e)} mode="horizontal" theme="light">
      <Menu.Item key="home" icon={<MailOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      {user ? (
        <>
          <Menu.Item key="user" disabled>
            <Avatar src={user.avatar_url} icon={<UserOutlined />} />
            <span style={{ marginLeft: 8 }}>{user.full_name} ({user.preferred_username})</span>
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <Button type="primary" danger onClick={signOut}>
              Sign Out
            </Button>
          </Menu.Item>
          <SubMenu key="companys" icon={<PlusOutlined />} title="Companies">
        <Menu.Item key="create-company">
          <Link to="/create-company">Create</Link>
        </Menu.Item>
        <Menu.Item key="all-companies">
          <Link to="/">Show All</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="posts" icon={<PlusOutlined />} title="Posts">
        <Menu.Item key="create-post">
          <Link to="/create-post">Create</Link>
        </Menu.Item>
        <Menu.Item key="all-posts">
          <Link to="/all-post">Show All</Link>
        </Menu.Item>
      </SubMenu>
        </>
        
      ) : (
        <Menu.Item key="login" icon={<LoginOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}

    </Menu>
  );
};

export default NavBar;
