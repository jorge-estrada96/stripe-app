import SessionContextProvider from './context/SessionContext'
import AppRouter from './routes';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import AppLayout from './components/AppLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionContextProvider>
        <AppLayout>
          <AppRouter />
        </AppLayout>
      </SessionContextProvider>
    </ThemeProvider>
  );
}

export default App;
