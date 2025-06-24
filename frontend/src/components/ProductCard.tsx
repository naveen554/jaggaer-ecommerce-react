import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../graphql/mutations";
import { GET_CART, GET_CART_COUNT } from "../graphql/queries";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();

  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    variables: { productId: product.id, quantity: 1 },
    refetchQueries: [{ query: GET_CART }, { query: GET_CART_COUNT }],
  });

  const handleAddToCart = async () => {
    try {
      await addToCart();
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={product.imageUrl}
        alt={product.name}
        sx={{
          objectFit: "contain",
          p: 2,
          backgroundColor: "white",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 500, lineHeight: 1.2 }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minHeight: "40px", mb: 1 }}
        >
          {product.shortDescription}
        </Typography>
        <Box>
          <Rating
            name="read-only"
            value={product.rating}
            precision={0.5}
            readOnly
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-start", p: 2, paddingTop: 0 }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/product/${product.id}`)}
          sx={{ mr: 1 }}
        >
          SHOW DETAILS
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? "ADDING..." : "ADD TO CART"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
