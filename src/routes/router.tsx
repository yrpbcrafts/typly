import { Routes, Route } from "react-router-dom";
import { Newsfeed } from "@/pages/welcome/welcome-page";
import { Layout } from "@/layouts/layout";
import { Login } from "@/pages/authentication/login";
import { Register } from "@/pages/authentication/register";
import { Profile } from "@/pages/profile";
import { About } from "@/pages/about";
import { Contact } from "@/pages/contact";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route
        path="/"
        element={
          <Layout>
            <Newsfeed />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
            <Layout>
                <Profile/>
            </Layout>
        }/>

    <Route
        path="/about"
        element={
            <Layout>
                <About/>
            </Layout>
        }/>

    <Route
        path="/contact"
        element={
            <Layout>
                <Contact/>
            </Layout>
        }/>
    </Routes>
  );
};
