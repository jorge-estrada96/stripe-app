import axios from "axios";
import { API_URL } from "../config";
import { customer, paymentIntent, paymentMethod } from "../types";

export const createCustomer = async (
  email: string,
  name: string
): Promise<customer> => {
  const response = await axios.post(`${API_URL}/v1/stripe/customers`, {
    email,
    name,
  });

  return response.data;
};

export const createPaymentMethod = async (
  paymentMethodId: string,
  customerId: string | undefined
): Promise<paymentMethod> => {
  const response = await axios.post(`${API_URL}/v1/stripe/payment-methods`, {
    paymentMethodId,
    customerId,
  });

  return response.data;
};

export const createPaymentIntent = async (
  customerId: string,
  amount: number | string,
  currency: string
): Promise<paymentIntent> => {
  const response = await axios.post(`${API_URL}/v1/stripe/payment-intents`, {
    customerId,
    amount,
    currency,
  });

  return response.data;
};

export const confirmPaymentIntent = async (
  paymentIntentId: undefined | string,
  paymentMethodId: string
): Promise<paymentIntent> => {
  const response = await axios.patch(
    `${API_URL}/v1/stripe/payment-intents/${paymentIntentId}/confirm`,
    {
      paymentMethodId,
    }
  );

  return response.data;
};
