import React from "react";
import { Grid, Container, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../graphql/queries";

const ProductsList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading products</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {data.products.map((product: any) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsList;
