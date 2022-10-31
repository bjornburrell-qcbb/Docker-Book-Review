import { Header } from "antd/lib/layout/layout";
import { ReactNode } from "react";
import { SidebarNav } from "../SidebarNav";

import styles from "./Layout.module.scss";
import { LayoutTitleBar } from "./LayoutTitleBar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <Header />
      <div className="flex grow">
        <SidebarNav />
        <div className={`${styles.contentParent}`}>
          <LayoutTitleBar />
          <main className={`${styles.mainContent}`}>{children}</main>
        </div>
      </div>
    </div>
  );
}
