import React, { FC } from "react";

export type Props<P> = P & { className?: string; children?: React.ReactNode };
export type CustFC<P = Record<string, unknown>> = FC<Props<P>>;
