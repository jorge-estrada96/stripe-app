import { useCallback, useContext, useMemo, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography, Snackbar, Alert } from '@mui/material';
import Box from '@mui/system/Box';

import { STRIPE_PUBLIC_KEY } from '../config';
import { SessionContext } from '../context/SessionContext';
import { CardForm } from '../components/CardForm';
import { createPaymentMethod, confirmPaymentIntent } from '../api/stripe';
import { paymentMethod } from '../types';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    margin: '0 auto',
  },
});

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export const PaymentMethod = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { session } = useContext(SessionContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const options = useMemo(
    (): StripeElementsOptions => ({
      clientSecret: session.clientSecret,
    }),
    [session]
  );

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const onError = useCallback((message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  }, []);

  const onCreatePaymentMethod = useCallback(
    async (paymentMethod: paymentMethod) => {
      try {
        await createPaymentMethod(paymentMethod.id, session.customerId);
        await confirmPaymentIntent(session.paymentIntentId, paymentMethod.id);
        
        setSnackbarMessage('Your payment was completed successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        navigate('/')
      } catch {
        onError('An unexpected error occurred.');
      }
    },
    [onError, session, navigate]
  );

  return (
    <Box sx={{ height: '100%', minWidth: '100%' }}>
      <Elements stripe={stripePromise} options={options}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Payment
            </Typography>
            <CardForm onCreate={onCreatePaymentMethod} onError={onError} />
          </CardContent>
        </Card>
      </Elements>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
