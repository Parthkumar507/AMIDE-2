import React from "react";
import { Stack, Input, Textarea, Flex, Button } from "@chakra-ui/react";

const TextInputs = ({ textInputs, onChange, handleCreatePost, loading }) => {
  return (
    <Stack spacing={3} width="100%">
    <Input
      name="title"
      value={textInputs.title}
      onChange={onChange}
      placeholder="Title"
      borderRadius="md" // Rounded corners
      border="1px solid"
      borderColor="gray.300" // Border color
      _placeholder={{ color: "gray.500" }}
      _focus={{
        outline: "none",
        borderColor: "blue.400", // Border color on focus
        background:"white"
      }}
      fontSize="sm" // Adjust font size
      height="34px" // Adjust height
    />
    <Textarea
      name="content"
      value={textInputs.content}
      onChange={onChange}
      placeholder="Text (optional)"
      borderRadius="md" // Rounded corners
      border="1px solid"
      borderColor="gray.300" // Border color
      _placeholder={{ color: "gray.500" }}
      _focus={{
        outline: "none",
        borderColor: "blue.400", // Border color on focus
        background:"white"
      }}
      fontSize="sm" // Adjust font size
      height="100px"
    />
    <Flex justify="flex-end">
      <Button
        height="34px"
        padding="0px 30px"
        disabled={!textInputs.title}
        isLoading={loading}
        onClick={handleCreatePost}
      >
        Post
      </Button>
    </Flex>
  </Stack>
  
  );
};
export default TextInputs;
