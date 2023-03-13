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
  const [enrolledClassList, setEnrolledClassList] = useState([]);
  const [allClassList, setAllClassList] = useState([]);

  const [activeClassId, setActiveClassId] = useState();
  const [unenrollConfirmationModal, setUnenrollConfirmationModal] =
    useState(false);
  const [enrollConfirmationModal, setEnrollConfirmationModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await StudentAPI.getStudentDetail(id);
      const classes = await ClassAPI.getClassSummary();

      if (response) {
        setName(response.name);
        setEnrolledClassList(response.enrolledClasses);
      }

      if (classes) {
        setAllClassList(classes);
      }
    }
    fetchData();
  }, []);

  const handleWithdrawButton = async (classId) => {
    setActiveClassId(classId);
    setUnenrollConfirmationModal(true);
  };

  const handleEnrollButton = () => {
    setEnrollConfirmationModal(true);
  };

  const unenrollFunction = async () => {
    await ClassAPI.removeStudentFromClass(activeClassId, id);
    window.location.reload(false);
  };

  const enrollFunction = async () => {
    await ClassAPI.addStudentToClass(activeClassId, id);
    window.location.reload(false);
  };

  return (
    <>
      <Breadcrumb m={5}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/student">Student Detail</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SimpleGrid minChildWidth="20em" spacing="3em" m={5}>
        <>
          <SimpleGrid minChildWidth="100%" spacing="1em">
            <Card p={5}>
              <Stat>
                <StatLabel>Student Name</StatLabel>
                <StatNumber>{name}</StatNumber>
              </Stat>
            </Card>
            <Card p={5}>
              <Select
                placeholder="Select option"
                onChange={(e) => {
                  setActiveClassId(e.target.value);
                }}
              >
                {allClassList.map((classes) => {
                  return <option value={classes.id}>{classes.name}</option>;
                })}
              </Select>
              <Button
                colorScheme={"facebook"}
                leftIcon={<FaPlus />}
                mt={3}
                onClick={handleEnrollButton}
              >
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
                          <Button
                            colorScheme="red"
                            variant="outline"
                            aria-label="Delete"
                            leftIcon={<FaSignOutAlt />}
                            onClick={() => handleWithdrawButton(classes.id)}
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
