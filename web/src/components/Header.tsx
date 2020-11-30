import React from "react";
import NextLink from "next/link";
import { Badge, Box, Button, Flex, Heading, Link, Text } from "@chakra-ui/core";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const MenuItems = ({ children }: any) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Header: React.FC = (props) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer()
  });

  let body;

  // data is loading
  if (fetching) {
    body = null;
    // user is no logged in
  } else if (!data?.me) {
    body = (
      <Flex align="center">
        <MenuItems>
          <Button bg="transparent" border="1px">
            <NextLink href="/login">
              <Link fontSize={["13px", "14px", "16px"]}>login</Link>
            </NextLink>
          </Button>
        </MenuItems>
        <Button bg="transparent" border="1px">
          <NextLink href="/register">
            <Link fontSize={["13px", "14px", "16px"]}>Create account </Link>
          </NextLink>
        </Button>
      </Flex>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Button
          bg="transparent"
          border="1px"
          onClick={() => logout()}
          isLoading={logoutFetching}
          fontSize={["13px", "14px", "16px"]}
        >
          Log Out!
          <Badge
            border="none"
            px="2"
            ml={2}
            background="none"
            padding={0}
            fontSize={16}
            color="#805AD5"
            letterSpacing={0.5}
          >
            {data.me.username}
          </Badge>
        </Button>
        {/* <Heading as="h4" size="md" ml={4} letterSpacing={"0.05rem"}>
          {data.me.username}
        </Heading> */}
      </Flex>
    );
  }

  return (
    <Flex
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={[2, 4]}
      bg="#2D3748"
      color="white"
      {...props}
      // w="100%"
    >
      <Heading as="h1" size="lg" letterSpacing={0.7}>
        <NextLink href="/">
          <Link>Reddit</Link>
        </NextLink>
      </Heading>
      <Flex>
        <Button bg="transparent" border="1px" mr={{ base: 6 }}>
          <NextLink href="/create-post">
            <Link fontSize={["13px", "14px", "16px"]}>Create Post</Link>
          </NextLink>
        </Button>
        {body}
      </Flex>
    </Flex>
  );
};

export default Header;
// export default withUrqlClient(createUrqlClient)(Header);
