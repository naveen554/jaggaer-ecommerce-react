import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
  Paper,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CART, GET_CART_COUNT } from "../graphql/queries";
import { REMOVE_FROM_CART, CLEAR_CART } from "../graphql/mutations";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PurchaseConfirmationDialog from "../components/PurchaseConfirmationDialog";

const Cart = () => {
  const navigate = useNavigate();
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_CART);

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    onCompleted: () => refetch(),
    refetchQueries: [{ query: GET_CART_COUNT }],
  });

  const [clearCart] = useMutation(CLEAR_CART, {
    onCompleted: () => refetch(),
    refetchQueries: [{ query: GET_CART_COUNT }],
  });

  const [executePurchaseAndClearCart] = useMutation(CLEAR_CART, {
    onCompleted: () => {
      refetch();
      setOpenPurchaseModal(true);
    },
    refetchQueries: [{ query: GET_CART_COUNT }],
  });

  if (loading)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading cart...
      </Typography>
    );
  if (error)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Error loading cart.
      </Typography>
    );

  const items = data.cart.items;
  const total = data.cart.total;

  const handleRemove = async (id: any) => {
    await removeFromCart({ variables: { itemId: id } });
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const handlePurchase = async () => {
    await executePurchaseAndClearCart();
  };

  const handleClosePurchaseModal = () => {
    setOpenPurchaseModal(false);
  };

  const handleGoToProducts = () => {
    navigate("/products");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleGoToProducts} size="small" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleGoToProducts();
            }}
          >
            Products
          </Link>
          <Typography color="text.primary">Cart</Typography>
        </Breadcrumbs>
      </Box>

      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: "4px", backgroundColor: "white" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
            Cart
          </Typography>
          {items.length > 0 && (
            <Button
              onClick={handleClearCart}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Clear the cart
            </Button>
          )}
        </Box>

        {items.length === 0 ? (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            No items in cart.
          </Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {items.map((item: any, index: any) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ px: 0, py: 2, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 500, lineHeight: 1.2 }}
                    >
                      {item.product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      {item.product.shortDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => handleRemove(item.id)}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
                {index < items.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="p"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Total: {data.cart.currency || "€"} {total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            onClick={handlePurchase}
            disabled={items.length === 0}
            sx={{
              minWidth: "200px",
              py: 1.5,
              textTransform: "uppercase",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            Purchase
          </Button>
        </Box>
      </Paper>

      <PurchaseConfirmationDialog
        open={openPurchaseModal}
        onClose={handleClosePurchaseModal}
      />
    </Container>
  );
};

export default Cart;