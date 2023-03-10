import { Box, Flex, Text, Icon, Center } from "@chakra-ui/react";
import { FaBook, FaPersonBooth } from "react-icons/fa";
import Logo from "./logo";
import { NavItem } from "./Navitem";

export const SidebarContent = (props) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg="brand.600"
    borderColor="blackAlpha.300"
    borderRightWidth="1px"
    w="60"
    {...props}
  >
    <Flex px="4" py="5" align="center" width={'100%'}>
      <Logo fill='white' stroke='white' />
    </Flex>

    <Flex
      direction="column"
      as="nav"
      fontSize="sm"
      color="gray.600"
      aria-label="Main Navigation"
    >
      <NavItem href="student" icon={FaPersonBooth}>Student</NavItem>
      <NavItem href="class" icon={FaBook}>Class</NavItem>
    </Flex>
  </Box>
);