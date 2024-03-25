import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import InputItem from "../components/ui/input";
import { login } from "../api/users";
import { useNavigate } from "react-router-dom";
import usePageMeta from "../utils/meta";
import { loginUser } from "../utils/auth";
import toast from "react-hot-toast";
import { BASE_URL } from "../config";

export const LoginPage = () => {
  usePageMeta("Amide | Login");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const onSubmit = async (event) => {
    console.log('ON submit Login ')
    event.preventDefault();
    if (formError) setFormError("");
    // if (!form.email.includes("@")) {
    //   toast.error("Please enter a valid email");
    //   return
    // }

    const data = await login(form);
    // console.log('ON submit Login1 ')

    if (!data.token) {
    console.log('ON submit Login 2')

      toast.error("Something went wrong!");
      setFormError(data.error);
    } else {
    console.log('ON submit Login 3')
      loginUser(data);
      toast.success("Logged in successfully!");
      navigate("/explore");
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const googleAuth = () => {
    window.open(`${BASE_URL}api/auth/google/callback`, "_self");
  };

  return (
    <Layout>
      <Container
        maxW={"300px"}
        height={"80vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={10}
      >
        <Heading>Login</Heading>

        <form style={{ width: "100%" }} onSubmit={onSubmit}>
          <InputItem
            name="username"
            placeholder="Username"
            type="text"
            mb={2}
            onChange={onChange}
          />
          <InputItem
            name="password"
            placeholder="password"
            type="password"
            onChange={onChange}
          />
          <Button
            width="100%"
            height="36px"
            mb={2}
            mt={2}
            type="submit"
            //   isLoading={loading}
          >
            Log In
          </Button>
        </form>

          <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>New here?</Text>
            <Text
              color="blue.500"
              fontWeight={700}
              cursor="pointer"
              as={"a"}
              href="/register"
            >
              SIGN UP
            </Text>
          </Flex>
        <Button
          width="100%"
          height="36px"
          mb={2}
          mt={2}
          onClick={googleAuth}
          //   isLoading={loading}
        >
          Log In with Google
        </Button>
      </Container>
    </Layout>
  );
};
