import { useContext, useState } from 'react';
import { Alert, Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Snackbar, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/system/Box';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../../context/SessionContext';

const useStyles = makeStyles({
  card: {
    maxWidth: 640,
    margin: '0 auto',
    overflow: 'hidden',
  },
  headerBadge: {
    background: 'linear-gradient(90deg, #635bff 0%, #00d4ff 100%)',
    color: '#fff',
    fontWeight: 700,
    padding: '10px 16px',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  full: {
    gridColumn: '1 / -1',
  },
  button: {
    marginTop: 16,
  }
});

const DeliveryDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setSessionData } = useContext(SessionContext);

  const [fullName, setFullName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('US');
  const [method, setMethod] = useState<'standard' | 'express'>('standard');
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const onContinue = () => {
    if (!fullName.trim() || !addressLine1.trim() || !city.trim() || !postalCode.trim() || !country.trim()) {
      setSnackbarMessage('Please complete all required fields.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    setSessionData({
      delivery: {
        fullName,
        addressLine1,
        addressLine2: addressLine2 || undefined,
        city,
        state: state || undefined,
        postalCode,
        country,
        method,
      }
    });
    setLoading(false);
    navigate('/payment-method');
  }

  return (
    <Box sx={{ height: '100%', minWidth: '100%' }}>
      <Card className={classes.card}>
        <div className={classes.headerBadge}>Delivery details</div>
        <CardContent>
          <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
            Enter your shipping information. We support standard and express delivery.
          </Typography>

          <div className={classes.grid}>
            <TextField className={classes.full} label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <TextField className={classes.full} label="Address line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
            <TextField className={classes.full} label="Address line 2 (optional)" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
            <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <TextField label="State / Province" value={state} onChange={(e) => setState(e.target.value)} />
            <TextField label="Postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            <TextField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <FormControl className={classes.full}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Delivery speed</Typography>
              <RadioGroup row value={method} onChange={(e) => setMethod(e.target.value as 'standard' | 'express')}>
                <FormControlLabel value="standard" control={<Radio />} label="Standard (3-5 days)" />
                <FormControlLabel value="express" control={<Radio />} label="Express (1-2 days)" />
              </RadioGroup>
            </FormControl>
          </div>

          <LoadingButton
            className={classes.button}
            loading={loading}
            variant="contained"
            color="primary"
            fullWidth
            onClick={onContinue}
          >
            Continue to payment
          </LoadingButton>
        </CardContent>
      </Card>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeliveryDetails;