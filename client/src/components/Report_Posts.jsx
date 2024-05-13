import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
} from "@chakra-ui/react";

const AllReportPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchReportPosts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}api/posts/getallReportpost`
        );
        console.log("Response is ",response.data)
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching Report posts:", error);
      }
    };

    fetchReportPosts();
  }, []);

  const handleDeletePost = async (post) => {
    try {
      const user=JSON.parse(localStorage.getItem("user"));
      console.log('PostId ',post.postId)
      // await axios.delete(`${BASE_URL}api/posts/${post.postId}`);
      
      const res = await fetch(BASE_URL + `api/posts/${post.postId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
      });
      
      
      // Remove the deleted post from the state      
      // setPosts(posts.filter((post) => post.postId !== post.postId));
      setPosts(posts.filter((item) => item.postId !== post.postId));



    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <Table colorScheme="teal">
        <TableCaption placement="top">Report posts</TableCaption>
        <Thead>
          <Tr>
            <Th
              bg="teal.500"
              color="white"
              fontSize="md"
              fontWeight="bold"
              padding="12px"
            >
              Post Content
            </Th>
            <Th
              bg="teal.500"
              color="white"
              fontSize="md"
              fontWeight="bold"
              padding="12px"
            >
              Reports
            </Th>
            <Th bg="teal.500"
              color="white"
              fontSize="md"
              fontWeight="bold"
              padding="12px">
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post) => (
            <Tr key={post._id}>
              <Td>{post.content}</Td>
              <Td>
                <ul>
                  {post.reports.map((report, index) => (
                    <li key={index}>{report.reason}</li>
                  ))}
                </ul>
              </Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleDeletePost(post)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default AllReportPosts;
