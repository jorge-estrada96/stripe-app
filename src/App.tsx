
import SessionContextProvider from './context/SessionContext'
import AppRouter from './routes';

function App() {
  return (
    <SessionContextProvider>
      <AppRouter />
    </SessionContextProvider>
  );
}

export default App;
