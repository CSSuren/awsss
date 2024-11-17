import React, { useState, useEffect } from "react";
import axios from "axios";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/posts", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/post",
        { message },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 201) {
        setMessage("");
        fetchPosts();
      }
    } catch (error) {
      console.error("Error posting message", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const styles = {
    container: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "32px 24px",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
      color: "white",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      boxSizing: "border-box",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(10px)",
      textAlign: "center",
    },
    heading: {
      fontSize: "1.5rem",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "8px",
      color: "#fff",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      resize: "none",
      height: "80px",
    },
    button: {
      alignSelf: "center",
      fontFamily: "inherit",
      color: "#fff",
      background: "linear-gradient(90deg, #e81cff, #40c9ff)",
      border: "none",
      padding: "12px 16px",
      fontSize: "inherit",
      cursor: "pointer",
      borderRadius: "8px",
      width: "100%",
      transition: "all 0.3s ease",
    },
    postsContainer: {
      marginTop: "20px",
    },
    post: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Forum</h1>
      <form onSubmit={handlePostSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <textarea
            placeholder="Write something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          disabled={loading}
          onMouseOver={(e) =>
            (e.target.style.background = "linear-gradient(90deg, #40c9ff, #e81cff)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "linear-gradient(90deg, #e81cff, #40c9ff)")
          }
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
      <div style={styles.postsContainer}>
        {posts.map((post, index) => (
          <div key={post.id || index} style={styles.post}>
            <p>
              <strong>{post.username}</strong>: {post.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
