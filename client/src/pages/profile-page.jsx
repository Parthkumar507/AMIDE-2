import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../config";
import toast from "react-hot-toast";
import {Layout} from "../components/layout/index"
import { Box, Flex, Heading, Text, Spinner } from '@chakra-ui/react';
import AllReportPosts from '../components/Report_Posts';


const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userIsAdmin, setuserIsAdmin] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).user._id;
        console.log('UserId ',userId)
        const userIsAdmin = JSON.parse(localStorage.getItem('user')).user.isAdmin;
        console.log('UserIsAdmin ',userIsAdmin)


        // Make an API call to fetch user information
        const response = await axios.get(`${BASE_URL}api/auth/profile/${userId}`); 
        setUserData(response.data);
        setLoading(false);
        setuserIsAdmin(userIsAdmin)
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Something went wrong')
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    <Flex justify="center" align="center" h="100%">
    <Spinner size="xl" color="blue.500" />
  </Flex>  }
  return (  
    <Layout>
      <Flex justify="center" align="center" h="100%">
        <Box p={4} width="100%" maxW="400px">
          {userData && (
            <>
              <Heading as="h1" mb={4} textAlign="center">Profile Page</Heading>
              <Box bg="gray.100" p={4} borderRadius="md">
                <Text fontSize="lg" fontWeight="bold">Username:</Text>
                <Text>{userData.username}</Text>
              </Box>
              <Box bg="gray.100" p={4} borderRadius="md" mt={4}>
                <Text fontSize="lg" fontWeight="bold">Email:</Text>
                <Text>{userData.email}</Text>
              </Box>
              {/* Uncomment below to display password */}
              {/* <Box bg="gray.100" p={4} borderRadius="md" mt={4}>
                <Text fontSize="lg" fontWeight="bold">Password:</Text>
                <Text>{userData.password}</Text>
              </Box> */}
            </>
          )}
        </Box>
      </Flex>
          {userIsAdmin && 
            <AllReportPosts/>
          }

    </Layout>
  );
};

export default ProfilePage;