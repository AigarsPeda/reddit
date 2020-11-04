import { Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/core";
import React from "react";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header: React.FC = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Reddit
        </Heading>
      </Flex>

      <Box
        display="flex"
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        justifyContent="space-between"
      >
        <Flex>
          <MenuItems>
            <Link href="/">Home</Link>
          </MenuItems>
          <MenuItems>
            <Link href="/login">login</Link>
          </MenuItems>
        </Flex>

        <Box>
          <Button bg="transparent" border="1px">
            <Link href="/register">Create account</Link>
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Header;
