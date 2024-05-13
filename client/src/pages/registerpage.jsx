import React, { useState } from "react";
import { Layout } from "../components/layout";
import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import InputItem from "../components/ui/input";
import { register } from "../api/users";
import { useNavigate } from "react-router-dom";
import usePageMeta from "../utils/meta";
import { loginUser } from "../utils/auth";
import toast from "react-hot-toast";
import { BASE_URL } from "../config";

export const RegisterPage = () => {
  usePageMeta("Amide | Register");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      toast.error("Enter a Valid Email")
      return;
    }
    if (form.password.length<8) {
      toast.error("Minimum Password length is 8")
      return;
    }
    if (form.username.length<4) {
      toast.error("Minimum Username length is 4")
      return;
    }
    if (form.username.length>30) {
      toast.error("Username length should not be greater than 30")
      return;
    }
    const { success, data, error }  = await register(form);
    if(success)
    {
      if (!data.token) {
        toast.error("Something went wrong!");
        setFormError(data.error);
      } else {
        console.log('In Register after success, data is',data)
        loginUser(data);
        toast.success("Registered successfully!");
        navigate("/");
      }
  }else{
    toast.error(error);

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

    // Display formError with toast if it's not empty
    // if (formError) {
    //   toast.error(formError);
    // }
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
        <Heading>Register</Heading>
        <form style={{ width: "100%" }} onSubmit={onSubmit}>
          <InputItem
            name="username"
            placeholder="UserName"
            type="text"
            mb={2}
            onChange={onChange}
          />
          <InputItem
            name="email"
            placeholder="Email"
            type="text"
            mb={2}
            onChange={onChange}
          />
          <InputItem
            name="password"
            placeholder="Password"
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
            Register
          </Button>
          <Flex fontSize="9pt" justifyContent="center">
            <Text mr={1}>Have an account?</Text>
            <Text
              color="blue.500"
              fontWeight={700}
              cursor="pointer"
              as={"a"}
              href="/login"
            >
              LOG IN
            </Text>
          </Flex>
        </form>
        <Button
          width="100%"
          height="36px"
          mb={2}
          mt={2}
          onClick={googleAuth}
          //   isLoading={loading}
        >
          Register with Google
        </Button>
      </Container>
    </Layout>
  );
};
