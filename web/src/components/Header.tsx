import React from "react";
import { Button, Flex, Heading, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

const MenuItems = ({ children }: any) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header: React.FC = (props) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();

  let body;

  // data is loading
  if (fetching) {
    body = null;
    // user no logged in
  } else if (!data?.me) {
    body = (
      <Flex align="center">
        <MenuItems>
          <NextLink href="/login">
            <Link>login</Link>
          </NextLink>
        </MenuItems>
        <Button bg="transparent" border="1px">
          <NextLink href="/register">
            <Link>Create account </Link>
          </NextLink>
        </Button>
      </Flex>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Heading as="h4" size="md" mr={4} letterSpacing={"0.05rem"}>
          {data.me.username}
        </Heading>
        <Button
          bg="transparent"
          border="1px"
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          Log Out!
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#2D3748"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"0.05rem"}>
          <NextLink href="/">
            <Link>Reddit</Link>
          </NextLink>
        </Heading>
      </Flex>

      {body}
    </Flex>
  );
};

export default Header;
