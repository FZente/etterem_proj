import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import type { User } from "../type/User";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { TextField } from "@mui/material";
import AccountMenu from "./Teszt";
import Typography from "@mui/material/Typography";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Box className="top-bar" sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ minHeight: 100, position: "relative" }}>
            <div className="fo-avatar">
              <Avatar
                src="/public/logo.png"
                onClick={() => navigate(`/`)}
                sx={{ width: 50, height: 50, cursor: "pointer" }}
              />
            </div>
            <Typography
              variant="h6"
              component="div"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Éttermek
            </Typography>
            <Box
              sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 1,
                  width: "200px",
                  mr: 2,
                }}
              />

              {localStorage.getItem("loggedIn") === "true" ? (
                <AccountMenu onLogOut={logout} />
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  {" "}
                  <button onClick={() => navigate("/login")}>Login</button>
                  <button onClick={() => navigate("/register")}>
                    Registration
                  </button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
