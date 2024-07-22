import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createTheme, CssBaseline, ThemeOptions } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({

  palette: {

    primary: {

      main: "#1760a5",
      light: "skyblue"

    },

    secondary: {

      main: '#15c630'

    }

  }

});

ReactDOM.createRoot(document.getElementById('root')!).render(

    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>

);
