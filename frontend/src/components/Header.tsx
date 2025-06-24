import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CART_COUNT } from "../graphql/queries";

const Header = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_CART_COUNT);

  const cartCount = data?.cartCount ?? 0;

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          E-Commerce
        </Typography>
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <Badge badgeContent={loading ? 0 : cartCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
