import {
  Button,
  ButtonGroup,
  Card,
  IconButton,
  Select,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";

function StudentDetail() {
  const [name, setName] = useState("Placeholder");
  const [enrolledClassList, setEnrolledClassList] = useState([
    { id: "enrolledClassId", name: "Class Name - Enrolled Class" },
  ]);
  const [allClassList, setAllClassList] = useState([
    { id: "allcllassId", name: "Class Name - All Class" },
  ]);

  return (
    <>
      <SimpleGrid minChildWidth="20em" spacing="3em">
        <>
          <SimpleGrid minChildWidth="100%" spacing="1em">
            <Card p={5}>
              <Stat>
                <StatLabel>Name</StatLabel>
                <StatNumber>{name}</StatNumber>
              </Stat>
            </Card>
            <Card p={5}>
              <Select placeholder="Select option">
                {allClassList.map((classes) => {
                  return <option value={classes.id}>{classes.name}</option>;
                })}
              </Select>
              <Button colorScheme={"facebook"} leftIcon={<FaPlus />} mt={3}>
                Add Class
              </Button>
            </Card>
          </SimpleGrid>
        </>

        <Card>
          <TableContainer m={3}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Class Name</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {enrolledClassList.map((classes) => {
                  return (
                    <Tr>
                      <Td>{classes.name}</Td>
                      <Td>
                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                          <Link href={`/class/${classes.id}`}>
                            <IconButton
                              colorScheme="blue"
                              icon={<BsBoxArrowUpRight />}
                              aria-label="Up"
                            />
                          </Link>
                          <IconButton
                            colorScheme="red"
                            variant="outline"
                            icon={<FaSignOutAlt />}
                            aria-label="Delete"
                          />
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Card>
      </SimpleGrid>
    </>
  );
}

export default StudentDetail;
