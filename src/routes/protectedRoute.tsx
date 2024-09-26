import { Outlet } from 'react-router-dom'
import StartPayment from '../views/StartPayment';

interface Params {
  hasActivePaymentIntent: boolean,
}
const ProtectedRoute = (params:Params):any => {
  if (!params.hasActivePaymentIntent) return <StartPayment />;

  return <Outlet />
}

export default ProtectedRoute
