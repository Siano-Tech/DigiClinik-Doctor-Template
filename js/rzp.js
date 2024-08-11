document.getElementById('rzp-button1').onclick = function(e){

    axios.post('https://digi-clinik-backend.vercel.app/api/payments/createOrder',{
        headers: { 'Access-Control-Allow-Origin': '*' },
        "amount": 1
    }).then((d) => {
        if(d.data.status === 'success') {
            var options = {
                "key": "rzp_live_dtkzr1miBlZF2W", // Enter the Key ID generated from the Dashboard
                "amount": d.data?.msg?.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Dr. Manoj Samantaray", //your business name
                "description": "Test Transaction",
                "order_id": d.data?.msg?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
                    alert('Payment Success');
                    console.log('Payment Success');
                },
            };
            var rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', function (response){
                alert(response.error.description);
                console.log('Payment failed');
            });
            rzp1.open();
        }

    }).catch(err => console.log(err));
      
    e.preventDefault();
}