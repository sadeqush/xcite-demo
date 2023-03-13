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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ClassAPI } from "../api/classAPI";
import { StudentAPI } from "../api/studentAPI";
import ConfirmationModal from "../components/ConfirmationModal";

function StudentDetail() {
  const [name, setName] = useState("");
  const [enrolledStudentList, setEnrolledStudentList] = useState([]);
  const [allStudentList, setAllStudentList] = useState([]);

  const [activeStudentId, setActiveStudentId] = useState();

  const [unenrollConfirmationModal, setUnenrollConfirmationModal] =
    useState(false);

  const [enrollConfirmationModal, setEnrollConfirmationModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await ClassAPI.getClassDetails(id);
      const students = await StudentAPI.getStudentSummary();

      if (response) {
        setName(response.name);
        setEnrolledStudentList(response.enrolledStudents);
      }

      if (students) {
        setAllStudentList(students);
      }
    }
    fetchData();
  }, []);

  const handleWithdrawButton = async (studentId) => {
    setActiveStudentId(studentId);
    setUnenrollConfirmationModal(true);
  };

  const handleEnrollButton = () => {
    setEnrollConfirmationModal(true);
  };

  const unenrollFunction = async () => {
    await ClassAPI.removeStudentFromClass(id, activeStudentId);
    window.location.reload(false);
  };

  const enrollFunction = async () => {
    await ClassAPI.addStudentToClass(id, activeStudentId);
    window.location.reload(false);
  };

  return (
    <>
      <Breadcrumb m={5}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/class">Class Detail</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SimpleGrid minChildWidth="20em" spacing="3em" m={5}>
        <>
          <SimpleGrid minChildWidth="100%" spacing="1em">
            <Card p={5}>
              <Stat>
                <StatLabel>Class Name</StatLabel>
                <StatNumber>{name}</StatNumber>
              </Stat>
            </Card>
            <Card p={5}>
              <Select
                placeholder="Select option"
                onChange={(e) => {
                  setActiveStudentId(e.target.value);
                }}
              >
                {allStudentList.map((student) => {
                  return <option value={student.id}>{student.name}</option>;
                })}
              </Select>
              <Button
                colorScheme={"facebook"}
                leftIcon={<FaPlus />}
                mt={3}
                onClick={handleEnrollButton}
              >
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
                          <Button
                            colorScheme="red"
                            variant="outline"
                            aria-label="Delete"
                            leftIcon={<FaSignOutAlt />}
                            onClick={() => handleWithdrawButton(student.id)}
                          >
                            Withdraw
                          </Button>
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

      {/* Unenroll Confirmation modal */}
      <ConfirmationModal
        isOpen={unenrollConfirmationModal}
        onClose={() => {
          setUnenrollConfirmationModal(false);
        }}
        onYesClick={() => {
          unenrollFunction();
        }}
      ></ConfirmationModal>

      {/* Enroll Confirmation modal */}
      <ConfirmationModal
        isOpen={enrollConfirmationModal}
        onClose={() => {
          setEnrollConfirmationModal(false);
        }}
        onYesClick={() => {
          enrollFunction();
        }}
      ></ConfirmationModal>
    </>
  );
}

export default StudentDetail;
