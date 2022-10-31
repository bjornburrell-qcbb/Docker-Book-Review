import React, { PropsWithChildren, FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./SidebarNavLink.module.css";

export interface Props extends PropsWithChildren {
  path: string;
  linkText: string;
}

export const SidebarNavLink: FC<Props> = ({ path, linkText }) => {
  const router = useRouter();

  return (
    <>
      <Link href={path}>
        <a
          className={`${router.pathname === path ? styles.active : ""} ${
            styles.link
          } relative w-full h-full inline-block`}
        >
          {linkText}
        </a>
      </Link>
    </>
  );
};
