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
import EditReview from "./pages/EditReview.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/new-restaurant" element={<NewRestaurant />} />
        <Route path="/new-review" element={<NewReview />} />
        <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
        <Route path="/edit-review/:id" element={<EditReview />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
