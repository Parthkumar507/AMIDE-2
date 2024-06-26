import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import CommentInput from "./comment-input";
import CommentItem from "./comment-item";
import { createComment, getPostComments } from "../../../api/comment";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Comments = ({ user, post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (post?._id) {
      getPostComments(post?._id).then((data) => {
        setComments(data);
        setLoading(false);
      });
    }
  }, [post]);

  const onCreateComment = async () => {
    try {
      const data = await createComment(post?._id, {
        content: comment,
      });
      console.log("Data from createComment:", data);
      if (data.error === "Toxic Comment") 
      {
        // console.log('00002')

        toast.error("Toxic comment detected. Please revise your comment.");
      }
      else if (data) {
        console.log('00000')
        toast.success("Comment created successfully!");
        navigate(0);
      } else {
        console.log('00001')
        toast.error("Comment creation failed!");
      }
    } catch (error) {
      // Handle specific error conditions
        toast.error("Failed to create comment. Please try again later.");
    }
  };


  return (
    <Box bg="white" pt={4} borderRadius="0px 0px 4px 4px">
      <Flex direction="column" mb={6} fontSize="10pt" width="100%">
        <CommentInput
          comment={comment}
          setComment={setComment}
          loading={false}
          user={user}
          onCreateComment={onCreateComment}
        />
      </Flex>
      <Stack spacing={6} py={2}>
        {loading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {!!comments.length ? (
              <>
                {comments.map((item) => (
                  <Box
                    border={2}
                    borderStyle={"solid"}
                    borderColor={"gray.100"}
                    py={2}
                    px={2}
                    key={item._id}
                  >
                    <CommentItem
                      key={item._id}
                      comment={item}
                      onDeleteComment={() => {}}
                      isLoading={false}
                      userId={user?.userId}
                    />
                  </Box>
                ))}
              </>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
