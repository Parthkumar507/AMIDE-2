import { json } from "react-router-dom";
import { BASE_URL } from "../config";
import { isLoggedIn } from "../utils/auth";
import { socket } from "../utils/socket";



const createPost = async (post) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + "api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(post),
    });
    if (res.status==400) {
      return ({ message: "Insincere Post detected", error: "Insincere Post" });

    }
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPosts = async () => {
  try {
    const res = await fetch(BASE_URL + "api/posts/");
    // console.log(BASE_URL +"api/posts/")
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};



const getPost = async (postId) => {
  try {
    const res = await fetch(BASE_URL + `api/posts/${postId}`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const upvotePost = async (postId, user) => {
  try {
    socket.emit("upvotePost", postId);
    const res = await fetch(BASE_URL + `api/posts/${postId}/upvote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updatePost = async (postId, data) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + "api/posts/" + postId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (postId) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    const res = await fetch(BASE_URL + "api/posts/" + postId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
import axios from 'axios'
const reportPost = async (postId, reason) => {
  try {
    const user = isLoggedIn();
    if (!user) {
      return new Error("User not logged in");
    }
    // postId=post._id
    const res = await fetch(BASE_URL + "api/posts/report" , {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body:JSON.stringify({ postId, reason }), 
    });
    return res.json();
  } catch (err) {
    console.log(post)
    // console.log(err);
    return { error: "Failed to report post. Please try again later." };
  }
};

const downvotePost = async (postId, user) => {
  try {
    socket.emit("downvotePost", postId);
    const res = await fetch(BASE_URL + `api/posts/${postId}/downvote`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
  upvotePost,
  downvotePost,
  reportPost
};
