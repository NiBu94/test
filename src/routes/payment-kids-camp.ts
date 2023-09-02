import { Router } from 'express';
import { sendSaferpayRequest, pollPaymentStatus } from '../services/saferpay-api';

const paymentKidsCamp = Router();

paymentKidsCamp.post('/payment-kids-camp', async (req, res, next) => {
  try {
    const priceMap = {
      5: { 1: 75, 2: 150, 3: 225, 4: 290, 5: 290 },
      4: { 1: 75, 2: 150, 3: 225, 4: 240 },
      3: { 1: 75, 2: 150, 3: 180 },
    };
    let price = 0;
    const bookedWeeks = req.body.bookedWeeks;
    for (const key in bookedWeeks) {
      if (Object.prototype.hasOwnProperty.call(bookedWeeks, key)) {
        const maxDays = bookedWeeks[key].maxDays;
        const priceObj = priceMap[maxDays];
        const days = bookedWeeks[key].bookedDays.length;
        price += priceObj[days];
      }
    }
    // Example Price: 100 CHF => 1.00 CHF
    const data = await sendSaferpayRequest(price * 100);
    pollPaymentStatus(data.Token);
    res.json({ redirectURL: data.RedirectUrl });
  } catch (e) {
    next(e);
  }
});

export default paymentKidsCamp;
