import React from "react";
import { Box, Center, Flex, HStack, Stack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoContainer from "./logocontainer";
import NavLink from "./navlink";

const Links = [
  { name: "Student", href: "/student" },
  { name: "Class", href: "/class" },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const CrossIcon = (
    <Center h="100%" w="100%">
      <FaTimes />
    </Center>
  );

  const BarIcon = (
    <Center h="100%" w="100%">
      <FaBars />
    </Center>
  );

  return (
    <Box bg={useColorModeValue("white", "messenger.600")} px={4} shadow={"sm"}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size="md"
          fontSize="lg"
          variant="ghost"
          color="current"
          icon={isOpen ? CrossIcon : BarIcon}
          aria-label={"Open Navigation Menu"}
          display={{ lg: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <LogoContainer />

        <HStack as={"nav"} spacing={4} display={{ base: "none", lg: "flex" }}>
          {Links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              hoverTextColor={"messenger.800"}
              hoverBgColor={"messenger.300"}
            >
              {link.name}
            </NavLink>
          ))}
        </HStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ lg: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                hoverTextColor={"primary.800"}
                hoverBgColor={"primary.100"}
              >
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
