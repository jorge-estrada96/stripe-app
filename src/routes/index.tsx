import { useContext, useMemo } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import StartPayment from '../views/StartPayment';

import ProtectedRoute from './protectedRoute'

import { SessionContext } from '../context/SessionContext'
import { PaymentMethod } from '../views/PaymentMethod';

function AppRouter() {
  const { session } = useContext(SessionContext)

  const hasActivePaymentIntent = useMemo(() => Boolean(session.paymentIntentId), [session])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPayment />} />

        <Route element={<ProtectedRoute hasActivePaymentIntent={hasActivePaymentIntent} />}>
          <Route path="/payment-method" element={<PaymentMethod />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter
