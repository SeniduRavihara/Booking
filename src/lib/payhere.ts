import {
  Customer,
  CurrencyType,
  PayhereCheckout,
  CheckoutParams,
} from "@payhere-js-sdk/client";
import { Payhere, AccountCategory } from "@payhere-js-sdk/client";

// Sandbox
Payhere.init("1226628", AccountCategory.SANDBOX);

// Live
// Payhere.init("12xxxxx", AccountCategory.LIVE);

function onPayhereCheckoutError(errorMsg: any) {
  alert(errorMsg);
}

export function checkout() {
  const customer = new Customer({
    first_name: "Demo",
    last_name: "User",
    phone: "+94771234567",
    email: "user@example.com",
    address: "No. 50, Highlevel Road",
    city: "Panadura",
    country: "Sri Lanka",
  });

  const checkoutData = new CheckoutParams({
    returnUrl: "http://localhost:3000/return",
    cancelUrl: "http://localhost:3000/cancel",
    notifyUrl: "http://localhost:8080/notify",
    order_id: "112233",
    itemTitle: "Demo Item",
    currency: CurrencyType.LKR,
    amount: 100,
    platform: "web",
    custom1: "",
    custom2: "",
  });

  const checkout = new PayhereCheckout(
    customer,
    checkoutData,
    onPayhereCheckoutError
  );
  checkout.start();
}
