import type { MenuProps } from "antd";
import { v4 as uuid4 } from "uuid";
import { SidebarNavLink } from "../components/SidebarNavLink";

export type MenuItem = Required<MenuProps>["items"][number];

// Menu items getter
export function makeMenuItem(
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    label,
    icon,
    key: uuid4(),
    children,
    type,
  } as MenuItem;
}

export function makeMenuNavLink(
  linkText: string,
  path: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    path,
    label: <SidebarNavLink linkText={linkText} path={path} />,
    key: uuid4(),
    icon,
    children,
    type,
  } as MenuItem;
}
