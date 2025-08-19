import { PropsWithChildren } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7ff 0%, #eef9ff 40%, #fff5f7 100%)' }}>
      <AppBar position="static" elevation={0} sx={{
        background: 'linear-gradient(90deg, #635bff 0%, #15b2d3 60%, #00d4ff 100%)'
      }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            FlowPay
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 6 }}>
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;