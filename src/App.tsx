import React from "react";
import "./App.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PostForm from "./pages/PostForm";
import ItemDetail from "./pages/ItemDetail";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Footer from "./components/Footer";
import Ranking from "./pages/Ranking";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user && <Header />}
      <div className="App__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/post-form" element={<PostForm />} />
          <Route path="/item-detail/:id" element={<ItemDetail />} />
          <Route path="/my-page/:userId" element={<MyPage />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
