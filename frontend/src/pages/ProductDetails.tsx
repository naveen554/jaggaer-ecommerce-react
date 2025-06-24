import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  IconButton,
  Stack,
  Container,
  Paper,
  Dialog,
  DialogContent,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT, GET_CART_COUNT, GET_CART } from "../graphql/queries";
import { ADD_TO_CART } from "../graphql/mutations";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  thumbnailUrls?: string[];
  shortDescription: string;
  longDescription: string;
  rating: number;
  price: number;
  currency: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [mainDisplayedImage, setMainDisplayedImage] = useState<
    string | undefined
  >(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | undefined>(undefined);

  const { data, loading, error } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { id },
    onCompleted: (data) => {
      if (data?.product) {
        setMainDisplayedImage(data.product.imageUrl);
      }
    },
  });

  const [addToCart, { loading: adding }] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_CART }, { query: GET_CART_COUNT }],
  });

  if (loading)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading product details...
      </Typography>
    );
  if (error || !data?.product)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Error loading product or product not found.
      </Typography>
    );

  const product = data.product;

  const thumbnails =
    product.thumbnailUrls && product.thumbnailUrls.length > 0
      ? product.thumbnailUrls
      : [product.imageUrl, product.imageUrl, product.imageUrl];

  const handleAddToCart = async () => {
    try {
      await addToCart({ variables: { productId: product.id, quantity } });
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const handleOpenModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage(undefined);
  };

  const handleGoBack = () => {
    navigate("/products");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleGoBack} size="small" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleGoBack();
            }}
          >
            Products
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </Box>

      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: "4px", backgroundColor: "white" }}
      >
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              flexShrink: 0,
              width: { xs: "100%", sm: "450px", md: "500px" },
              gap: 2,
            }}
          >
            <Stack
              direction="column"
              spacing={1}
              sx={{
                flexShrink: 0,
                alignSelf: "flex-start",
                width: "80px",
              }}
            >
              {thumbnails.map((thumbUrl, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: "80px",
                    height: "80px",
                    cursor: "pointer",
                  }}
                  onClick={() => setMainDisplayedImage(thumbUrl)}
                >
                  <Box
                    component="img"
                    src={thumbUrl}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      border:
                        mainDisplayedImage === thumbUrl
                          ? "2px solid #1976d2"
                          : "1px solid #e0e0e0",
                      borderRadius: "4px",
                      p: 1,
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                      padding: "4px",
                      fontSize: "1rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(thumbUrl);
                    }}
                  >
                    <SearchIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                position: "relative",
                flexGrow: 1,
                height: "400px",
                border: "1px solid #e0e0e0",
                borderRadius: "4px",
                p: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={mainDisplayedImage}
                alt={product.name}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
                onClick={() => handleOpenModal(mainDisplayedImage || "")}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ flex: 1, pl: { sm: 2, md: 0 } }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {product.shortDescription}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Rating
                value={product.rating}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.rating} average)
              </Typography>
            </Box>
            <Typography
              variant="h5"
              component="p"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              {product.currency || "€"} {product.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              all prices incl. 10% taxes
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e0e0e0",
                  borderRadius: "4px",
                }}
              >
                <IconButton
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  size="small"
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{ minWidth: "30px", textAlign: "center" }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => setQuantity((q) => q + 1)}
                  size="small"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                startIcon={
                  <Box
                    component="img"
                    src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart--v1.png"
                    alt="cart"
                    sx={{ width: "16px", height: "16px" }}
                  />
                }
                onClick={handleAddToCart}
                disabled={adding}
                sx={{
                  minWidth: "150px",
                  py: 1,
                  textTransform: "uppercase",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                {adding ? "ADDING..." : "ADD TO CART"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{ mt: 4, p: 4, borderRadius: "4px", backgroundColor: "white" }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ textTransform: "uppercase", fontWeight: 500 }}
        >
          Description
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {product.longDescription}
        </Typography>
      </Paper>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent
          sx={{
            position: "relative",
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "lightgray",
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={modalImage}
            alt={product.name}
            sx={{
              maxWidth: "90%",
              maxHeight: "90vh",
              objectFit: "contain",
              backgroundColor: "white",
              p: 2,
              borderRadius: "4px",
            }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProductDetails;
