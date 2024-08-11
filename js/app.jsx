// Function to update clinic details
export const updateClinicAddress = (clinicData) => {
    
    const domNode = document.getElementById('location-container');
    const root = ReactDOM.createRoot(domNode);
        return(
            clinicData.map((e) => <div key={e.id} class="location-container" id="location-container">
                <iframe class="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8724153948106!2d77.64782467486633!3d12.915920687394388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84bd6d67712958dd%3A0xf2cd0b28c34f9959!2sDigiClinik!5e0!3m2!1sen!2sin!4v1717911487665!5m2!1sen!2sin" width="600" height="450" style="border:0px solid white;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                <div data-w-id="fe5b652c-9ae8-5ed7-18a2-85fffdf0fc89" class="contacts-wrapper location-details">
                <div class="contacts-content-wrapper">
                    <h1 class="heading-banner large fz-26" style="color: white; text-align: center;">{e.clinicName}</h1>
                    <div class="row-contacts">
                    <div class="icon-contacts"><img
                        src="https://assets-global.website-files.com/64c23c6ec82b2204b21af185/64d0e2429480c5b67d55995f_pin_drop_white_36dp.svg"
                        loading="lazy" alt="" /></div>
                    <div class="text-contacts">
                        <p class="white-text font-size-18 m-0">Location</p><a
                        href="https://www.google.com/maps/place/5+Washington+Square+N,+New+York,+NY+10003,+%D0%A1%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D1%96+%D0%A8%D1%82%D0%B0%D1%82%D0%B8+%D0%90%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B8/@40.7311336,-73.9984815,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25990bc23477b:0x57fd6b90fb96784a!8m2!3d40.7311336!4d-73.9959066!16s%2Fg%2F11c5qhgsp2?authuser=0&amp;entry=ttu"
                        target="_blank" class="link-white font-size-15"><b>{e.clinicAddress}</b></a>
                    </div>
                    </div>
                    <div class="row-contacts">
                    <div class="icon-contacts"><img
                        src="https://assets-global.website-files.com/64c23c6ec82b2204b21af185/64d0e26ccce459ad69f506d8_email_white_36dp.svg"
                        loading="lazy" alt="" /></div>
                    <div class="text-contacts">
                        <p class="white-text font-size-18 m-0">Timings</p>
                        <a
                        class="link-white font-size-15"><b>{e.clinicTimings}</b></a>
                    </div>
                    </div>
                    <div class="row-contacts">
                    <div class="icon-contacts"><img
                        src="https://assets-global.website-files.com/64c23c6ec82b2204b21af185/64d0e28d9fc52c0f23a7a19c_phone_white_36dp.svg"
                        loading="lazy" alt="" /></div>
                    <div class="text-contacts">
                        <p class="white-text font-size-18 m-0">Phone</p>
                        <a href='tel:${e.clinicPhoneNo}' class="link-white font-size-15">{e.clinicPhoneNo}</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>)
        )
}