const Post = require("../model/post.model");
const Community = require("../model/community.model");
const axios = require("axios");

const createPost = async (req, res) => {
  try {
    const { title, content, imageUrl, communityId } = req.body;
    const userId = req.user.userId;

    if (!(title && content)) {
      // throw new Error("All input required");
      return res.status(404).json({ message: "All input required" });
    }
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ message: "community not found" });
    }
    console.log('Before calling Flask API');
    // Now, send a request to localhost:5000
    // try
    // {
      const response2 = await axios.post("http://localhost:5000/classifyInsincere", {
        text:content,
        });
        // console.log(response2)

    // }
    // catch(err) {
    //   print(err)
    // }
    // response
    console.log('Response from Flask API:', response2.data);

    // Handle the response from localhost:5000
    // console.log("Response from localhost:5000:", response2.data.result);
    console.log('0')

    if(response2.data.result=='The sentence is Insincere.'){
      console.log('1')
      error='Insincere Post'
      return res.status(400).json({ message: "Insincere Post detected", error: "Insincere Post" });
    }
    // console.log('2')




    const post = await Post.create({
      title,
      content,
      imageUrl,
      user: userId,
      community: communityId,
      upvotedBy: [userId],
      InsincereScore:response2.data.result
    });

    community.posts.push(post);
    await community.save();
    res.json(post);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("community");

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSecPosts = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber);
    const size = 10;
    const posts = await Post.find()
      .skip(size * (pageNumber - 1))
      .limit(size)
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("community");

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;
  console.log(postId)

  try {
    const post = await Post.findById(postId)
      .populate("user")
      .populate("community");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.deleteOne({ _id: postId });

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post) {
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;

      await post.save();

      return res
        .status(200)
        .json({ message: "Post updated successfully", post });
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const searchPosts = async (req, res) => {
  const query = req.query.posts;
  try {
    if (!query) {
      return res.status(400).json({ message: "Missing 'posts' query parameter" });
    }
    const posts = await Post.find({
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
      ],
    })
      .populate("user")
      .populate("community");
    if (!posts) {
      return res.status(404).json({ message: "No matching posts found" });
    }
    res.json(posts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


const upvotePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasUpvoted = post.upvotedBy.includes(userId);
    const hasDownvoted = post.downvotedBy.includes(userId);

    if (hasDownvoted) {
      post.downvotedBy = post.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
    }

    if (hasUpvoted) {
      post.upvotedBy = post.upvotedBy.filter((id) => id.toString() !== userId);
      await post.save();
      return res
        .status(200)
        .json({ message: "Successfully removed upvote from the post", post });
    }

    post.upvotedBy.push(userId);
    await post.save();

    return res
      .status(200)
      .json({ message: "Successfully upvoted the post", post });
  } catch (error) {
    console.error(`Error upvoting post: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const downvotePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const hasUpvoted = post.upvotedBy.includes(userId);
    const hasDownvoted = post.downvotedBy.includes(userId);

    if (hasUpvoted) {
      post.upvotedBy = post.upvotedBy.filter((id) => id.toString() !== userId);
    }

    if (hasDownvoted) {
      post.downvotedBy = post.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
    } else {
      post.downvotedBy.push(userId);
    }

    await post.save();

    return res
      .status(200)
      .json({ message: "Successfully downvoted the post", post });
  } catch (error) {
    console.error(`Error downvoting post: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const reportPost=async(req,res)=>{
  try{
    // const postId = req.params.postId;
    const { postId,reason } = req.body;
    console.log('req.body is ',req.body)
    console.log('postId is ',postId)

    // Find the post by postId
    const post = await Post.findById(postId);

    if (!post) {
      console.log('Post is ',post)
      return res.status(404).json({ error: "Post not found" });
    }
    // Add the report to the post's reports array
    post.reports.push({ reason });
    await post.save();
    return res.status(200).json({ message: "Post reported successfully" });

  }catch(err){

  }
}

const getAllReportPost=async(req,res)=>{
  try {
    // Using setTimeout

    const posts = await Post.find({ reports: { $exists: true, $ne: [] } });

      // Modify the response to include only necessary fields
  const modifiedPosts = posts.map(({ _id: postId, content, reports }) => ({
    postId,
    content,
    reports
  }));


    res.json(modifiedPosts);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {
  createPost,
  getPosts,
  getSecPosts,
  getPostById,
  deletePost,
  updatePost,
  searchPosts,
  upvotePost,
  downvotePost,
  reportPost,
  getAllReportPost
};
