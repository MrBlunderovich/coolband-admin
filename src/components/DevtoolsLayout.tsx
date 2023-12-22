import { Layout, LayoutProps } from "react-admin";
import { ReactQueryDevtools } from "react-query/devtools";

export const DevtoolsLayout = (props: LayoutProps) => (
  <>
    <Layout {...props} />
    <ReactQueryDevtools initialIsOpen={false} />
  </>
);
