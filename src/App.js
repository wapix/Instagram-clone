import "./styles.css";
import Header from "./components/Header";
import Post from "./components/Post";
import ImageUpload from "./components/ImageUpload";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data()
        }))
      );
    });
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    console.log(user);
  }, [user]);

  return (
    <div className="App">
      <Header />
      {user && <ImageUpload username={user.displayName} />}
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          imageUrl={post.imageUrl}
          username={post.username}
          desc={post.caption}
          postId={id}
          user={user && user.displayName}
        />
      ))}
    </div>
  );
}
