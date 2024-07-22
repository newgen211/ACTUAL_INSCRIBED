import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>

);
