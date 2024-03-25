import React, { useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Input, Textarea } from "@chakra-ui/react";
import { createCommunity } from "../../api/communities";
import toast from "react-hot-toast";
import { isLoggedIn } from "../../utils/auth";

export const CreateCommunityButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    bio: ""
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

      // Check if the name meets the minimum length requirement
  if (form.name.length < 4) {
    toast.error("Name must be at least 4 characters long.");
    return;
  }

    const data = await createCommunity(form);
    if (!data.error) {
      toast.success("Community created successfully!");
      handleClose();
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Button
        colorScheme={"green"}
        bg={"blue.600"}
        rounded={"full"}
        px={6}
        _hover={{
          bg: "blue.700",
        }}
        fontSize={"10pt"}
        onClick={handleOpen}
      >
        Create Community
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form style={{ width: "100%" }}>
              <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                Name
              </Text>
              <Input
                name="name"
                placeholder="name"
                type="text"
                mb={2}
                onChange={onChange}
              />
              <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
                About Community
              </Text>
              <Textarea
                name="bio"
                onChange={onChange}
                fontSize="10pt"
                placeholder="About Community"
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
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} variant={"outline"}>
              Close
            </Button>
            <Button onClick={onSubmit}>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

