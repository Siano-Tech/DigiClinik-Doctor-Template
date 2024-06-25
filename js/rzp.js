var options = {
    "key": "rzp_live_dtkzr1miBlZF2W", // Enter the Key ID generated from the Dashboard
    "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Dr. Manoj Samantaray", //your business name
    "description": "Test Transaction",
    "order_id": "order_OQgSGATxWhzymo", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com", 
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
document.getElementById('rzp-button1').onclick = function(e){

    fetch('https://digi-clinik-backend.vercel.app/api/payments/createOrder', {
        method: 'POST',
        mode: 'no-cors',
        data: JSON.stringify({
            "amount": 100,
        }),
    }).then(data => data.json()).then((d) => {
        console.log(d);
    }).catch(err => console.log(err))
    // rzp1.open();
    e.preventDefault();
}