import React from "react";
import Header from "./Header";
import Wrapper, { WrapperVariant } from "./Wrapper";

type LayoutProps = {
  variant?: WrapperVariant;
};

const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <>
      <Header />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
