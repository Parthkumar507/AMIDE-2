import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa"; // Import the icon you want to use
import {  InputGroup, InputLeftElement } from "@chakra-ui/react";

export const CreatePostBtn = ({ handleSort }) => {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("Sort By");

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={8} // Round border
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
    <InputGroup width="65%">
    <InputLeftElement
      pointerEvents="none"
      color="gray.400"
      fontSize="1.2em"
      children={<FaPen />} // Use the icon component here
    />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
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
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4} // Round border
        mr={4}
        onClick={() => navigate("/submit")}
        // textColor={"red"}
        // width={"55%"}
      />
      </InputGroup>

      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              fontSize="10pt"
              border="1px solid"
              borderRadius={4} // Round border
              bg="gray.50"
              borderColor="gray.200"
              height="36px"
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              // minW={30}
              width={"25%"}
            >
              {sortBy}
            </MenuButton>
            <MenuList bg="gray.50">
              <MenuItem fontSize="10pt" onClick={() => { setSortBy("Latest"); handleSort("createdAt") }}>
                Latest
              </MenuItem>
              <MenuItem fontSize="10pt" onClick={() => { setSortBy("Likes"); handleSort("upvotedBy") }}>
                Likes
              </MenuItem>
              <MenuItem fontSize="10pt" onClick={() => { setSortBy("Comments"); handleSort("commentCount") }}>
                Comments
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};
