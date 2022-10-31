import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import React, { useEffect, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import {
  clearMetadata,
  selectBreadcrumbMeta,
  selectTitle,
} from "../../redux/slices/metadataSlice";

import { CustFC } from "../../types/global";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type LayoutTitleBarProps = {
  title?: string;
};

export const LayoutTitleBar: CustFC<LayoutTitleBarProps> = ({ className }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const breadcrumbMeta = useAppSelector(selectBreadcrumbMeta);
  const title = useAppSelector(selectTitle);

  const breadcrumbs = useMemo(() => {
    let href = "/";

    return router?.pathname
      .split("/")
      .slice(1) // rm empty str
      .map((el) => {
        // checks breadcrumbs metadata Record for matching value. Allows for controlling transformation of query params encountered by the NextJS router
        const meta = breadcrumbMeta[el];
        const transformed = meta?.label ?? el;
        const transformedHref = meta?.href ?? el;

        href += `${transformedHref}/`;

        return {
          href,
          text: transformed.charAt(0).toUpperCase() + transformed.slice(1),
        };
      });
  }, [breadcrumbMeta, router?.pathname]);

  useEffect(() => {
    // clear metadata when pathname changes
    dispatch(clearMetadata());
  }, [dispatch, router.pathname]);

  return (
    <div className="pl-8 pt-5 pb-4 bg-secondary-ivory w-full">
      <div className="mb-6">
        {/* TODO: Add temp loading state while breadcrumb is calculated to prevent flash of [queryParam] to */}
        <Breadcrumb>
          {breadcrumbs?.map((el) => (
            <BreadcrumbItem key={uuid()} href={el.href}>
              {el.text}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </div>
      <div>
        <h2 className="text-xl">
          {/* if title set in global state, use that. If not, and BC have been set, sets title to the last item in the breadcrumb path, def, to "Inv. Tracker" */}
          {title ??
            (breadcrumbs && breadcrumbs[0]
              ? breadcrumbs[breadcrumbs.length - 1].text
              : "Inventory Tracker")}
        </h2>
      </div>
    </div>
  );
};
