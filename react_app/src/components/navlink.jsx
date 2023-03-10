import { useColorModeValue } from "@chakra-ui/color-mode";
import { Heading, Link } from "@chakra-ui/layout";
import React from "react";

const NavLink = (props) => {
  return (
    <Link
      px={3}
      py={2}
      rounded={"md"}
      fontWeight="light"
      color={"messenger.800"}
      bg={"messenger.100"}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue(props.hoverTextColor, props.hoverBgColor),
        bg: useColorModeValue(props.hoverBgColor, props.hoverTextColor),
      }}
      href={props.href}
    >
      <Heading fontSize="md"> {props.children}</Heading>
    </Link>
  );
};

export default NavLink;
