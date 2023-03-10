import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import React, { useState } from "react";
import { SidebarContent } from "./components/SidebarContent";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Student from "./pages/student";
import Class from "./pages/class";
import StudentDetail from "./pages/student-details";
import ClassDetail from "./pages/class-details";
import { FaUserPlus } from "react-icons/fa";
import ClassModal from "./components/ClassModal";

export default function App() {
  const sidebar = useDisclosure();

  const [addClassModal, setAddClassModal] = useState(false);
  const [addStudentModal, setAddStudentModal] = useState(false);

  return (
    <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderBottomWidth="1px"
          borderColor="blackAlpha.300"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />

          <div></div>
          <div>
            <Button
              colorScheme={"facebook"}
              mx={2}
              leftIcon={<FaUserPlus />}
              onClick={() => {
                setAddStudentModal(true);
              }}
            >
              Add New Student
            </Button>
            <Button
              colorScheme={"blackAlpha"}
              leftIcon={<FaUserPlus />}
              onClick={() => {
                setAddClassModal(true);
              }}
            >
              Add New Class
            </Button>
          </div>
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Student />} />

              <Route path="/student" element={<Student />} />
              <Route path="/student/:id" element={<StudentDetail />} />

              <Route path="/class" element={<Class />} />
              <Route path="/class/:id" element={<ClassDetail />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </Box>

      <ClassModal
        type="Create"
        isOpen={addClassModal}
        value={""}
        onClose={() => {
          setAddClassModal(false);
        }}
      ></ClassModal>
    </Box>
  );
}
