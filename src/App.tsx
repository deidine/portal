import CreateCompany from './pages/componeis/CreateCompany';
import AllCompanies from './pages/componeis/AllCompanies';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import NavBar from './components/NavBar';
import CreatePost from './pages/posts/CreatePost';
import AllPosts from './pages/posts/AllPosts';
import { useState } from 'react';
import { Protected } from './Protected';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
function App() {
  const user = useUser();
  const [isSignedIn, setIsSignedIn] = useState(
    user?.email
  );
  return (
   <Router>
    <NavBar/>
   <Routes>
    <Route path="/" element={<AllCompanies/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/create-company" element={<CreateCompany/>}/>
    <Route path="/create-post" element={<CreatePost/>}/>
    <Protected isSignedIn={isSignedIn}>  
    <Route path="/all-post" element={<AllPosts/>}/>
   </Protected>
    </Routes>
    </Router>
  );
}

export default App;