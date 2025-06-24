import React from 'react';
import Header from './components/Header';
import AppRoutes from './routes';
import { Toolbar } from '@mui/material';

const App = () => (
  <>
    <Header />
    <Toolbar />
    <AppRoutes />
  </>
);

export default App;
