declare let payhere: any;

export async function paymentGateWay() {
  console.log("Payment Gateway");

  try {
    const response = await fetch(
      " https://us-central1-bookinglk-e6a4e.cloudfunctions.net/generatePayHereHash",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant_id: "1226628",
          order_id: "123456",
          amount: "1000.00",
          currency: "LKR",
        }), // Pass any data needed for generating the hash
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const obj = await response.json();
    alert(JSON.stringify(obj));

    // Payment completed. It can be a successful failure.
    payhere.onCompleted = function onCompleted(orderId: string) {
      console.log("Payment completed. OrderID:" + orderId);
      // Note: validate the payment and show success or failure page to the customer
    };

    // Payment window closed
    payhere.onDismissed = function onDismissed() {
      // Note: Prompt user to pay again or show an error page
      console.log("Payment dismissed");
    };

    // Error occurred
    payhere.onError = function onError(error:  ) {
      // Note: show an error page
      console.log("Error:" + error);
    };

    // Put the payment variables here
    const payment = {
      sandbox: true,
      merchant_id: "1226628", // Replace your Merchant ID
      return_url: "http://localhost/payHereTest/", // Important
      cancel_url: "http://localhost/payHereTest/", // Important
      notify_url: "http://sample.com/notify",
      order_id: "123456",
      items: "Door bell wireles",
      amount: "1000.00",
      currency: "LKR",
      hash: obj.hash, // *Replace with generated hash retrieved from backend
      first_name: "Saman",
      last_name: "Perera",
      email: "samanp@gmail.com",
      phone: "0771234567",
      address: "No.1, Galle Road",
      city: "Colombo",
      country: "Sri Lanka",
      delivery_address: "No. 46, Galle road, Kalutara South",
      delivery_city: "Kalutara",
      delivery_country: "Sri Lanka",
      custom_1: "",
      custom_2: "",
    };

    payhere.startPayment(payment);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
