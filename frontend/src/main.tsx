import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Profil from "./pages/Profil.tsx";
import RestaurantPage from "./pages/RestaurantPage.tsx";
import NewRestaurant from "./pages/NewRestaurant.tsx";
import NewReview from "./pages/NewReview.tsx";
import EditRestaurant from "./pages/EditRestaurant.tsx";
import Navbar from "./components/Navbar.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/new-restaurant" element={<NewRestaurant />} />
        <Route path="/restaurants/:id/review" element={<NewReview />} />
        <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="colored" />
  </StrictMode>
);
