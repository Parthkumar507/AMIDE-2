import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { isLoggedIn, logoutUser } from "../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { CreateCommunityButton } from "../community/createCommunityButton";

import amidelogo from "../../assests/logo 1.jpg";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const user = isLoggedIn();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?posts=${e.target.value}`);
    }
  };

  return (
    <Box position={"sticky"} top={0} zIndex={10} width={"100%"}>
      <Flex
        // bg={useColorModeValue("white", "gray.800")}
        bg="#c1d6ca"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        // borderBottom={1}
        // borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          marginLeft={"20px"}
          flex={{ base: 1 }}
          align={"center"}
          justify={{ base: "center", md: "start" }}
        >
          <Flex flexDirection="row" alignItems="center">
          <Link to="/">
              <Image
                src={amidelogo}
                alt="Logo"
                boxSize="40px"
                marginRight="10px"
                href="/"
              />
              </Link>
              <Link tp="/">
              <Text
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                fontWeight={"bold"}
                fontSize={"16px"}
                color={useColorModeValue("blue.600", "blue.400")}
                as={"a"}
              >
                Amide
              </Text>
              </Link>
          </Flex>
          <Flex display={{ base: "none", md: "flex" }} ml={8}>
            <DesktopNav />
          </Flex>
          <Flex
            w={{ base: "100%", md: "auto" }}
            minW={{ base: "180px", md: "240px" }}
            display={{ base: "flex" }}
            // ml={}
          >
            <InputGroup marginLeft={"50px"}>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="black" />
              </InputLeftElement>
              <Input
                width={"550px"}
                borderRadius={"full"}
                placeholder="Search Posts"
                onKeyPress={handleKeyPress}
                _placeholder={{ color: "black" }}
              />
            </InputGroup>
          </Flex>
          <Stack direction={"row"} spacing={4} marginLeft={"50px"}>
            <Button
              colorScheme={"green"}
              bg={"blue.600"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "blue.700",
              }}
              fontSize={"10pt"}
            >
              <ExploreNav />
            </Button>
          </Stack>
        </Flex>

        {user ? (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            align={"center"}
            direction={"row"}
            spacing={6}
          >
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"outline"}
                cursor={"pointer"}
                bg={
                  user?.user?.image ? `url(${user.user.image})` : "transparent"
                }
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                w="40px"
                h="40px"
                _hover={{
                  borderColor: "black", // Change border color on hover
                  borderWidth: 3, // Change border width on hover
                }}
              >
                {!user?.user?.image ? (
                  <Avatar size={"sm"} src={"./user.gif"} />
                ) : null}
              </MenuButton>
              <MenuList fontSize={"14px"} overflowY={"hidden"}>
                {/* <MenuItem onClick={() => navigate("/explore")}>Explore</MenuItem> */}
                <MenuItem onClick={() => navigate("/user-profile")}>
                  Profile
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    logoutUser();
                    navigate(0);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"14px"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
            >
              Login
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"14px"}
              borderRadius={"full"}
              fontWeight={600}
              color={"white"}
              bg={"blue.600"}
              href={"/register"}
              _hover={{ bg: "blue.700" }}
            >
              Register
            </Button>
          </Stack>
        )}
      </Flex>

      <MobileNav isOpen={isOpen} />
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      <CreateCommunityButton />
      {/* <ExploreNav/> */}
    </Stack>
  );
};

const ExploreNav = () => {
  const navItems = [{ label: "Explore", href: "/explore" }];

  return (
    <Stack direction="row" spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Link to={navItem.href} style={{ textDecoration: "none" }}>
            <Text
              fontSize="14px"
              fontWeight={500}
              color="white"
              // marginTop="2.5"
              _hover={{ color: "white.800" }}
            >
              {navItem.label}
            </Text>
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ isOpen }) => {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box display={{ md: "none" }}>
      {isOpen && (
        <Stack p={4}>
          <CreateCommunityButton />
          <ExploreNav />
        </Stack>
      )}
    </Box>
  );
};
