import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import { Layout } from "../components/layout";
import usePageMeta from "../utils/meta";

const Feature = ({ title, text, icon }) => {
  usePageMeta();

  return (
    <Stack
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      textAlign={"center"}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export const Homepage = () => {
  return (
    <Layout>
      <Container maxW={"4xl"} height={"auto"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 16, md: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "4xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Enhancing Online Discussions <br />
            <Text as={"span"} color={"blue.400"}>
              with Intelligent Moderation
            </Text>
          </Heading>
          <Text color={"gray.500"} mx={"auto"} mt={6}>
            A Comprehensive Platform for Productive Discussions: Combating Hate Speech and Insincere Questions to Foster a Safer and More Inclusive Online Environment
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
            mt={8}
          >
            <Button
              colorScheme={"green"}
              bg={"blue.400"}
              rounded={"full"}
              px={6}
              as={"a"}
              href="/explore"
              _hover={{
                bg: "blue.500",
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Box py={{ base: 10, md: 0.5 }} px={{ base: 4, md: 16 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "3xl", md: "5xl" }}
          lineHeight={"110%"}
          textAlign={"center"}
          mb={8}
        >
          Key Features
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={10}
          mt={4}
        >
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Insincere Question Detection"}
            text={
              "Predictive model to determine sincerity of questions in online forums."
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Hate Speech Classification"}
            text={
              "Robust machine learning model for hate speech classification."
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={"Full Stack Web Application"}
            text={
              "Create communities, engage in discourse, and integrate moderation models."
            }
          />
        </SimpleGrid>
      </Box>
    </Layout>
  );
};
