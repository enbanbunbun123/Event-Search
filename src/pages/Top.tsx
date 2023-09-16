import { auth } from "../firebase";
import "../stylesheet/top.scss";
import PostForm from "../components/PostForm";
import { useEffect, useState } from "react";
import { getDatabase, off, onValue, ref, remove } from "firebase/database";
import Card from "../components/Card";

const Top: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const postsRef = ref(db, "posts");

    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedPosts = [];
      for (let id in data) {
        loadedPosts.push({ id, ...data[id] });
      }
      setPosts(loadedPosts);
    });

    return () => {
      off(postsRef, "value", unsubscribe);
    };
  }, []);

  const handleDelete = (postId: string) => {
    const db = getDatabase();
    const postRef = ref(db, `posts/${postId}`);
    remove(postRef);
  };

  if (!auth.currentUser) return null;

  return (
    <>
      <div className="Top">
        <PostForm />
        <div className="posts">
          {posts.map((post) => (
            <Card
              key={post.id}
              userName={post.userName}
              text={post.text}
              timestamp={post.timestamp}
              userId={post.userId}
              currentUserId={auth.currentUser?.uid}
              onDelete={handleDelete}
              id={post.id}
              startData={post.startData}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Top;
