import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#635bff',
      light: '#8f88ff',
      dark: '#3a34c4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00d4ff',
      light: '#66e3ff',
      dark: '#00a4c2',
      contrastText: '#001219',
    },
    background: {
      default: '#f7f9fc',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(99, 91, 255, 0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: 12,
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #635bff 0%, #7c6cff 40%, #00d4ff 100%)',
        },
      },
    },
  },
});

export default theme;