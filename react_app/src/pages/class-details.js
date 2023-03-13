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
import React, { useState, useEffect } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ClassAPI } from "../api/classAPI";

function StudentDetail() {
  const [name, setName] = useState("");
  const [enrolledStudentList, setEnrolledStudentList] = useState([]);
  const [allStudentList, setAllStudentList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await ClassAPI.getClassDetails(id);

      if (response) {
        setName(response.name);
      }
    }
    fetchData();
  }, []);

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
                {allStudentList.map((student) => {
                  return <option value={student.id}>{student.name}</option>;
                })}
              </Select>
              <Button colorScheme={"facebook"} leftIcon={<FaPlus />} mt={3}>
                Add Student
              </Button>
            </Card>
          </SimpleGrid>
        </>

        <Card>
          <TableContainer m={3}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Student Name</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {enrolledStudentList.map((student) => {
                  return (
                    <Tr>
                      <Td>{student.name}</Td>
                      <Td>
                        <ButtonGroup variant="solid" size="sm" spacing={3}>
                          <Link href={`/student/${student.id}`}>
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
