import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Link,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { ClassAPI } from "../api/classAPI";
import ClassModal from "../components/ClassModal";
import ConfirmationModal from "../components/ConfirmationModal";

//This page should show a table of all Classs in the database.s

function Class() {
  const [data, setData] = useState([]);

  const [modifyModal, setModifyModal] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const [activeClass, setActiveClass] = useState(false);

  const header = ["name", "actions"];
  const color1 = useColorModeValue("gray.400", "gray.400");
  const color2 = useColorModeValue("gray.400", "gray.400");

  useEffect(() => {
    async function fetchData() {
      const response = await ClassAPI.getClassSummary();

      if (response) {
        setData(response);
      }
    }
    fetchData();
  }, []);

  const handleEditButton = (classData) => {
    setActiveClass(classData);
    setModifyModal(true);
  };

  const handleDeleteButton = (classData) => {
    setActiveClass(classData);
    setDeleteModal(true);
  };

  return (
    <>
      <Breadcrumb m={5}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/class">Class</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex w="full" m={5} alignItems="center" justifyContent="center">
        <Table
          w="full"
          bg="white"
          display={{
            base: "block",
            md: "table",
          }}
          sx={{
            "@media print": {
              display: "table",
            },
          }}
        >
          <Thead
            display={{
              base: "none",
              md: "table-header-group",
            }}
            sx={{
              "@media print": {
                display: "table-header-group",
              },
            }}
          >
            <Tr>
              {header.map((x) => (
                <Th key={x}>{x}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody
            display={{
              base: "block",
              lg: "table-row-group",
            }}
            sx={{
              "@media print": {
                display: "table-row-group",
              },
            }}
          >
            {/* Row Starts here */}
            {data.map((token, tid) => {
              return (
                <Tr
                  key={tid}
                  display={{
                    base: "grid",
                    md: "table-row",
                  }}
                  sx={{
                    "@media print": {
                      display: "table-row",
                    },
                    gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                    gridGap: "10px",
                  }}
                >
                  {Object.keys(token).map((x) => {
                    if (x != "id")
                      return (
                        <React.Fragment key={`${tid}${x}`}>
                          <Td
                            display={{
                              base: "table-cell",
                              md: "none",
                            }}
                            sx={{
                              "@media print": {
                                display: "none",
                              },
                              textTransform: "uppercase",
                              color: color1,
                              fontSize: "xs",
                              fontWeight: "bold",
                              letterSpacing: "wider",
                              fontFamily: "heading",
                            }}
                          >
                            {x}
                          </Td>
                          <Td
                            color={"gray.900"}
                            fontSize="md"
                            fontWeight="normal"
                          >
                            {token[x]}
                          </Td>
                        </React.Fragment>
                      );
                  })}
                  <Td
                    display={{
                      base: "table-cell",
                      md: "none",
                    }}
                    sx={{
                      "@media print": {
                        display: "none",
                      },
                      textTransform: "uppercase",
                      color: color2,
                      fontSize: "xs",
                      fontWeight: "bold",
                      letterSpacing: "wider",
                      fontFamily: "heading",
                    }}
                  >
                    Actions
                  </Td>
                  <Td>
                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                      <Link href={`/class/${token["id"]}`}>
                        <IconButton
                          colorScheme="blue"
                          icon={<BsBoxArrowUpRight />}
                          aria-label="Up"
                        />
                      </Link>

                      <IconButton
                        colorScheme="green"
                        icon={<AiFillEdit />}
                        aria-label="Edit"
                        onClick={() => handleEditButton(token)}
                      />
                      <IconButton
                        colorScheme="red"
                        variant="outline"
                        icon={<BsFillTrashFill />}
                        aria-label="Delete"
                        onClick={() => handleDeleteButton(token)}
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}

            {/* Row Ends here */}
          </Tbody>
        </Table>

        <ClassModal
          isOpen={activeClass && modifyModal}
          class={activeClass}
          onClose={() => {
            setModifyModal(false);
          }}
        ></ClassModal>

        <ConfirmationModal
          isOpen={activeClass && deleteModal}
          onClose={() => {
            setDeleteModal(false);
          }}
          onYesClick={async () => {
            await ClassAPI.deleteClass(activeClass.id);
            window.location.reload(false);
          }}
        ></ConfirmationModal>
      </Flex>
    </>
  );
}

export default Class;
