import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Heading } from "@chakra-ui/layout";
import React from "react";
import { Fa500Px, FaAdn, FaBook, FaBookDead, FaBookmark, FaLandmark, FaLaptopCode, FaReact, FaSchool } from "react-icons/fa";

const LogoContainer = () => {
  return (
    <Box m={2} p={2}>
      <Heading
        fontWeight="bold"
        letterSpacing="wide"
        fontSize="2xl"
        textTransform="uppercase"
        color={useColorModeValue("messenger.400", "white")}
      >
        <FaReact />
      </Heading>
    </Box>
  );
};

export default LogoContainer;
