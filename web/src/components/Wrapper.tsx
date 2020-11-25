import React from "react";
import { Box } from "@chakra-ui/core";

export type WrapperVariant = "small" | "regular";

type WrapperProps = {
  variant?: WrapperVariant;
};

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { children, variant = "regular" } = props;
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "500px"}
      w="100%"
      // m="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
