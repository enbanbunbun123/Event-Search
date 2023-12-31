import { ref as DatabaseRef, getDatabase, push, set } from "firebase/database";
import { useEffect, useState } from "react";
import { app, auth, storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../stylesheet/postForm.scss";
import {
  ref as StorageRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import BackToHomeButton from "../components/BackToPreviousPage";

const PostForm = () => {
  const [isSignIn, setIsSignIn] = useState<boolean | null>(null);
  const [postText, setPostText] = useState("");
  const [postDescription, setpostDescription] = useState("");
  const userId = auth.currentUser?.uid;
  const userName = auth.currentUser?.displayName;
  const userImage = auth.currentUser?.photoURL;
  const timestamp = new Date().toISOString();
  const [startData, setStartData] = useState<string>("");
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setIsSignIn(true);
      } else {
        setIsSignIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isSignIn === false) {
    console.error("サインインしていません");
  }

  const handleImageChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePost = async () => {
    if (!postText || !startData) {
      window.alert("イベント名と開始予定日は入力必須項目です。");
      return;
    }

    let imageUrl = "";
    if (image) {
      const storageRef = StorageRef(storage, `post-images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      await uploadTask;
      imageUrl = await getDownloadURL(storageRef);
    }

    const db = getDatabase(app);
    const postRef = DatabaseRef(db, "posts");
    const newPostRef = push(postRef);
    set(newPostRef, {
      userId: userId,
      userName: userName,
      userImage: userImage,
      text: postText,
      timestamp: timestamp,
      startData: startData,
      postDescription: postDescription,
      imageUrl: imageUrl,
    });
    setPostText("");
    setStartData("");
    setpostDescription("");
    navigate("/");
  };

  return (
    <>
      <div className="PostForm">
        <BackToHomeButton />
        <div className="PostForm__contents">
          <textarea
            className="PostForm__contents__title"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="イベント名"
          />
          <textarea
            className="PostForm__contents__description"
            value={postDescription}
            onChange={(e) => setpostDescription(e.target.value)}
            placeholder="投稿の説明"
          />
          <label className="PostForm__contents__data">
            <div>開始日 :</div>
            <input
              type="datetime-local"
              value={startData}
              onChange={(e) => setStartData(e.target.value)}
            />
          </label>
          <input
            className="PostForm__contents__image"
            type="file"
            onChange={handleImageChanged}
          />
          <button className="PostForm__post-button" onClick={handlePost}>
            投稿
          </button>
        </div>
      </div>
    </>
  );
};

export default PostForm;
