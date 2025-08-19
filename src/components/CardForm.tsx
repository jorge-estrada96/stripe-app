import Box from '@mui/system/Box';
import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import { paymentMethod } from '../types';

interface props {
  onCreate: (paymentMethod: paymentMethod) => void
  onError: (message: string) => void
}

const useStyles = makeStyles({
  creditCardContainer: {
    marginTop: '20px',
    marginBottom: '20px'
  },
  headerBadge: {
    background: 'linear-gradient(90deg, #635bff 0%, #00d4ff 100%)',
    color: '#fff',
    fontWeight: 700,
    padding: '10px 16px',
    borderRadius: 12,
  },
  button: {
    marginTop: '10px!important',
  }
});

export const CardForm = (props: props) => {
  const classes = useStyles();
  const stripe: any = useStripe();
  const elements: any = useElements();

  const [isLoading, setLoading] = useState(false);

  const onPaymentButton = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setLoading(false);
      return props.onError(error.type === "card_error" || error.type === "validation_error" ? error.message : "An unexpected error occurred.")
    }

    props.onCreate(paymentMethod)
    setLoading(false);
  }

  return (
    <Box>
      <div className={classes.headerBadge}>Enter your card details</div>
      <CardElement className={classes.creditCardContainer}/>
      <LoadingButton
        className={classes.button}
        loading={isLoading}
        variant="contained"
        color="primary"
        onClick={onPaymentButton}
        fullWidth
      >
      Pay secure
      </LoadingButton>
    </Box>
  );
};