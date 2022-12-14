import React, { FC } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

import styles from "./SidebarNav.module.css";
import { makeMenuItem, makeMenuNavLink } from "../../utils/menu";
import { BoxIcon, HeartIcon } from "../Icons";

// set menu Items
const items: MenuProps["items"] = [
  makeMenuItem("Inventory", <BoxIcon />, [
    makeMenuNavLink("Books", "/inventory/books"),
  ]),
  makeMenuItem("Orders", <HeartIcon />, [
    makeMenuNavLink("Add New Order", "/orders/add-new"),
  ]),
];

export const SidebarNav: FC = () => {
  return (
    <div>
    <img src="https://cdn.shopify.com/s/files/1/0598/5524/1423/t/7/assets/queen-city-book-bank-with-piglet-1656429644763_1200x.png?v=1656429642"
    style={{ width: 256 }}
    />
    <Menu
      className={styles.myClass}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      selectable={false}
      items={items}
    />
    </div>
  );
};
