import Box from '@mui/system/Box';
import { useState, useContext, useCallback } from 'react';
import { Card, CardContent, TextField, Typography, MenuItem, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';

import { SessionContext } from '../context/SessionContext';
import { createCustomer, createPaymentIntent } from '../api/stripe';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    margin: '0 auto',
  },
  button: {
    marginTop: '20px',
  },
});

const StartPayment: React.FC = () => {
  const { setSessionData } = useContext(SessionContext);
  const classes = useStyles();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number | string>('');
  const [currency, setCurrency] = useState('USD');
  const [errors, setErrors] = useState({ name: '', email: '', amount: '' });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const validateInputData = useCallback(() => {
    const newErrors = { name: '', email: '', amount: '' };
    const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);

    if (!name.trim()) newErrors.name = 'Name is required';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!isEmailValid(email)) newErrors.email = 'Email is not valid';

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0 || Number(amount) > 999 )
      newErrors.amount = 'Amount must be a valid number greater than zero and lower than 999';

    return newErrors;
  }, [name, email, amount]);

  const onNextButton = useCallback(async () => {
    try {
      const inputErrors = validateInputData();

      if (inputErrors.name || inputErrors.email || inputErrors.amount) return setErrors(inputErrors);

      setLoading(true);

      const customer = await createCustomer(email.trim(), name.trim());
      const paymentIntent = await createPaymentIntent(customer.id, amount, currency);

      setSessionData({
        customerId: customer.id,
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      });

      setSnackbarMessage('Customer and payment intent created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setLoading(false);
      navigate('/payment-method');
    } catch (error) {
      setLoading(false);
      
      setSnackbarMessage('An error occurred while creating the payment');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

    }
  }, [name, email, amount, currency, navigate, setSessionData, validateInputData]);

  return (
    <Box sx={{ height: '100%', minWidth: '100%' }}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Start with your payment
          </Typography>

          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={Boolean(errors.amount)}
            helperText={errors.amount}
            margin="normal"
          />

          <TextField
            fullWidth
            select
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            margin="normal"
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="MXN">MXN</MenuItem>
          </TextField>

          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={onNextButton}
            fullWidth
            className={classes.button}
          >
            Next step
          </LoadingButton>
        </CardContent>
      </Card>

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

export default StartPayment;
