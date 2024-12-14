import React, { useState } from 'react';
import './Checkout.css';
import cardLogo from '../components/card.png'; // Path to your card logo
import netBankingLogo from '../components/netbanking.png'; // Path to your net banking logo
import gpayLogo from '../components/gpay.png'; // Path to your GPay logo
import upiLogo from '../components/upi.png'; // Path to UPI logo
import othersLogo from '../components/others.png'; // Path to other payment methods logo
import { QRCodeCanvas } from 'qrcode.react'; // Updated import

const Checkout = ({ totalCost }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [upiId, setUpiId] = useState('');

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="payment-method">
                <label>
                    <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                    />
                    <img src={cardLogo} alt="Card Payment" className="payment-logo" />
                    Debit/Credit Card
                </label>
                {paymentMethod === 'card' && (
                    <div className="card-details">
                        <label>Card Number:</label>
                        <input type="text" placeholder="1234 5678 9012 3456" />
                        <label>CVV:</label>
                        <input type="text" placeholder="123" />
                        <label>Expiry Date:</label>
                        <input type="text" placeholder="MM/YY" />
                    </div>
                )}

                <label>
                    <input
                        type="radio"
                        value="netbanking"
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                    />
                    <img src={netBankingLogo} alt="Net Banking" className="payment-logo" />
                    Net Banking
                </label>
                {paymentMethod === 'netbanking' && (
                    <div className="net-banking-details">
                        <label>Bank Name:</label>
                        <input type="text" placeholder="Enter your bank name" />
                        <label>Account Number:</label>
                        <input type="text" placeholder="Enter your account number" />
                    </div>
                )}

                <label>
                    <input
                        type="radio"
                        value="gpay"
                        checked={paymentMethod === 'gpay'}
                        onChange={() => setPaymentMethod('gpay')}
                    />
                    <img src={gpayLogo} alt="GPay" className="payment-logo" />
                    Google Pay (GPay)
                </label>
                {paymentMethod === 'gpay' && (
                    <div className="gpay-details">
                        <label>Phone Number:</label>
                        <input type="tel" placeholder="Enter your GPay linked phone number" />
                    </div>
                )}

                <label>
                    <input
                        type="radio"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                    />
                    <img src={upiLogo} alt="UPI Payment" className="payment-logo" />
                    UPI
                </label>
                {paymentMethod === 'upi' && (
                    <div className="upi-details">
                        <label>UPI ID:</label>
                        <input 
                            type="text" 
                            placeholder="example@upi" 
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                        <div className="qr-code">
                            <QRCodeCanvas value={upiId} size={128} /> {/* Fixed usage */}
                        </div>
                    </div>
                )}

                <label>
                    <input
                        type="radio"
                        value="others"
                        checked={paymentMethod === 'others'}
                        onChange={() => setPaymentMethod('others')}
                    />
                    <img src={othersLogo} alt="Others" className="payment-logo" />
                    Other Methods
                </label>
                {paymentMethod === 'others' && (
                    <div className="others-details">
                        <label>Details:</label>
                        <input type="text" placeholder="Enter your payment details" />
                    </div>
                )}
            </div>

            {/* <div className="total-cost">Total Cost: ${totalCost}</div> */}
            <button onClick={() => alert('Payment Successful!')}>Pay Now</button>
        </div>
    );
};

export default Checkout;
