import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BsFlag } from "react-icons/bs";
import toast from "react-hot-toast";
import InputItem from "../ui/input";
import { reportPost } from "../../api/posts";
// This post is postID

const ReportPostModal = ({ postId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [reason, setReason] = useState("");

  const handleReport = async () => {
    if (!reason) {
      toast.error("Please provide a reason for reporting the post.");
      return;
    }

    const data = await reportPost(postId, reason);
    if (!data.error) {
      toast.success("Post reported successfully!");
      onClose();
    } else {
      toast.error("Failed to report the post. Please try again later.");
    }
  };

  return (
    <>
      <Flex as={"button"} onClick={onOpen} align="center">
        <Icon as={BsFlag} mr={2} />
        <Text fontSize="9pt">Report</Text>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Report Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                Reason for reporting:
              </Text>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                fontSize="10pt"
                placeholder="Enter your reason here..."
                _placeholder={{ color: "gray.500" }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                bg={"gray.50"}
                ht="100px"
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} leftIcon={<FiArrowLeft />}>
              Back
            </Button>
            <Button colorScheme="red" onClick={handleReport}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportPostModal;
