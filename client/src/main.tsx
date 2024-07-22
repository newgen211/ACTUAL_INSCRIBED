import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, CssBaseline, ThemeOptions } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
    palette: {
      
      primary: {
        main: '#283593', // Deep blue color
      },
      secondary: {
        main: '#607d8b', // Soft gray color
      },
      background: {
        default: '#f0f2f5', // Light gray background
      },
      text: {
        primary: '#333333', // Dark text for high contrast
        secondary: '#575757', // Slightly lighter text, good for secondary information
      }
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontSize: 14,
      h1: {
        fontSize: '2.2rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '1.8rem',
        fontWeight: 500,
      },
      body1: {
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // Buttons with normal casing
            padding: '10px 20px',
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: 12, // Rounded corners for cards
          }
        }
      }
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>

);
