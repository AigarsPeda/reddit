import React from "react";
import { Box } from "@chakra-ui/core";

type WrapperProps = {
  variant?: "small" | "regular";
};

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { children, variant = "regular" } = props;
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "500px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
