

// Function to get the last segment of the URL path
function getId() {
    const pathArray = window.location.search.split('=')?.pop();
    return pathArray.length > 0 ? pathArray : null;
}

// Get the last URL segment
const id = getId() ?? '8e691157-d606-440d-aa61-60ab5fd6d42d';
let editControl = false;
document.getElementById('saveButton').style.display = 'none';
let clinicData, selectedTheme, selectedThemeIndex, selectedFont, selectedFontIndex;


// const domNode = document.getElementById('app');
// const root = ReactDOM.createRoot(domNode);
// root.render('<h1>Develop. Preview. Ship.</h1>');

if(id) {
    // document.getElementById('edit-notification-bar').style.display = 'block';
    // document.querySelectorAll('[contenteditable=false]').forEach((e) => { e.setAttribute('contenteditable', 'true') });
    // editControl = true;
    // document.styleSheets[0].insertRule('image-cover:hover { opacity: 0.5; }', 0);
    // document.styleSheets[0].cssRules[0].style.opacity= '0.5';
    // toggleEditControl();
    // document.querySelectorAll('[contenteditable=false]').forEach((e) => { 
    //     e.classList.add('content-to-edit');
    // });
    getDetails();
}

function getDetails() {
    axios.post('http://localhost:5000/api/clinic/clinicData',{
        headers: { 'Access-Control-Allow-Origin': '*' },
        "id": id
    }).then((d) => {
        console.log(d);
        if(d.status === 200) {
            if(d.data.data) {
                if(d.data.data.doctorName) {
                    clinicData = d.data.data;
                    const {doctorName, speciality, experience, patientsConsulted, ratings, clinicGallery} = d.data.data;
                    const {headerTitle, heroTitle, heroSubTitle, qualification, about, doctorPic, diagnosis, procedures} = d.data.data;
                    const {kh1, kh2, kh3, dm, dmName, dmDesignation, selectedFont, selectedTheme, city} = d.data.data;
                    const {heroDoctorName, workExperience, qualificationDets, awards} = d.data.data;
                    document.getElementById('header-title').textContent = headerTitle ?? doctorName;
                    // document.getElementById('hero-title').textContent = `Trusted Skin Care by Dr. ${doctorName} – Leading Dermatologist in ${city}`;
                    // document.getElementById('hero-sub-title').textContent = heroSubTitle;
                    document.getElementById('customersServed').textContent = patientsConsulted;
                    document.getElementById('ratings').textContent = ratings + '/5';
                    document.getElementById('doctorDetails-Pic').setAttribute('src', doctorPic);
                    document.getElementById('doctorDetails-Name').textContent = doctorName;
                    document.getElementById('doctorDetails-Speciality').textContent = `Consultant ${speciality}`;
                    document.getElementById('doctorDetails-Experience').textContent = experience + ' Years of Experience';
                    document.getElementById('doctorDetails-Qualification').textContent = qualification;
                    const exp = workExperience.map(e => e.hospitalName).join(' and ');
                    const abt = `Dr. ${doctorName} is a distinguished dermatologist with over ${experience} years of experience in treating various skin conditions. A graduate of ${qualificationDets[0].collegeName}, Dr. ${doctorName} refined their skills at renowned institutions like ${exp}, where they earned a reputation for delivering exceptional patient care. Specializing in ${speciality}, Dr. ${doctorName} is dedicated to using the latest dermatological advancements to provide personalized treatment plans tailored to each patient's unique needs.`
                    document.getElementById('doctorDetails-About').textContent = abt ?? about;
                    document.getElementById('dm-pic').setAttribute('src', doctorPic);
                    const dmname = dmName ?? doctorName;;
                    document.getElementById('dm-name').textContent = 'Dr. ' + dmname;
                    document.getElementById('dm-designation').textContent = dmDesignation ?? speciality;
                    document.getElementById('clinic-loc').textContent = `Conveniently located in ${city}, our clinic offers comprehensive dermatological care with easy access and modern facilities.`;

                    updatePopularTreatments(diagnosis);
                    updatePopularTreatmentsMobile(diagnosis);
                    updatePopularDiagnosis(procedures);
                    updateClinicImages(clinicGallery);
                    updateClinicAddress(d.data.data);
    
                    // if(heroTitle) {
                        document.getElementById('hero-title').innerHTML = `Trusted Skin Care by <span class="blue-text" id="hero-doctorName" contenteditable="false">Dr. ${heroDoctorName ?? doctorName}</span> – Leading Dermatologist in <span class="blue-text" id="city" contenteditable="false">${city}</span>`;
                    // }
                    // if(heroSubTitle) {
                        
                        document.getElementById('hero-sub-title').textContent = heroSubTitle ?? `Dr. ${heroDoctorName ?? doctorName}, with over ${experience} years of experience in dermatology, has been transforming the skin health of patients in ${city}. Having previously served at esteemed hospitals such as ${exp}, Dr. ${doctorName} combines deep expertise with a personalized approach to provide top-tier skin care tailored to your unique needs.`;
                    // }
                    // if(kh1) {
                        const k1 = `Dr. ${doctorName} completed their medical education at ${qualificationDets?.pop()?.collegeName}, graduating with a ${qualificationDets?.pop()?.qualification} in ${qualificationDets?.pop()?.yog}. This comprehensive education laid a strong foundation for their extensive expertise in the field of dermatology.`
                        document.getElementById('keyHighlights-1').textContent = kh1 ?? k1;
                    // }
                    // if(kh2) {
                        const k2 = `Dr. ${doctorName} began their career at ${workExperience?.pop()?.hospitalName}, where they worked from ${workExperience?.pop()?.workYrs} till now. During their time at these esteemed institutions, Dr. ${doctorName} gained invaluable experience and developed a reputation for excellence in dermatological care.`
                        document.getElementById('keyHighlights-2').textContent = kh2 ?? k2;
                    // }
                    // if(kh3) {
                        document.getElementById('keyHighlights-3').textContent = awards;
                    // }
                    if(dm) {
                        document.getElementById('doctor-message').textContent = dm;
                    }
                    if(selectedTheme) {
                        setSelectedTheme(d.data.data)
                    }
                    if(selectedFont) {
                        setSelectedFont(d.data.data)
                    }
                    addEditControls()
                }
            }
        }
    });
}

function addEditControls() {
    // if(id) {
    //     document.getElementById('edit-notification-bar').style.display = 'block';
    //     document.querySelectorAll('[contenteditable=false]').forEach((e) => { e.setAttribute('contenteditable', 'true') });
    //     editControl = true;
    //     document.styleSheets[0].insertRule('image-cover:hover { background-color: red; }', 0);
    //     ocument.styleSheets[0].cssRules[0].style.backgroundColor= 'red';
    // }

    document.getElementById('edit-notification-bar').style.display = 'none';
    document.getElementById('footer-nav-bar').style.display = 'none';
    document.getElementById('announcement-bar').style.display = 'block';
    document.getElementById('main-menu-bar').style.display = 'block';
    document.getElementById('edit-menu-bar').style.display = 'none';
    document.getElementById('editButton').style.display = 'none';
}

function setSelectedTheme(clinicData) {
    const {selectedTheme, selectedThemeIndex} = clinicData;
    const htmlElement = document.documentElement;
    htmlElement.classList.add(selectedTheme);
}

function setSelectedFont(clinicData) {
    const {selectedFont} = clinicData;
    document.body.style.fontFamily = selectedFont;
}

function updatePopularTreatmentsMobile(clinicData) {
    const gridCardWrapper = document.querySelector('.popular-diagnosis-mobile');

    // Clear existing content
    gridCardWrapper.innerHTML = '';
  
    // Loop through clinicData and create grid card items
    clinicData.forEach(data => {
      const gridCardItem = document.createElement('div');
      gridCardItem.classList.add('grid-card-item');
  
      const imgElement = document.createElement('img');
      imgElement.src = data.imgUrl;
      imgElement.alt = data.altText ?? data.name;
      imgElement.loading = 'lazy';
      imgElement.classList.add('banner-image');
  
      gridCardItem.appendChild(imgElement);
      gridCardWrapper.appendChild(gridCardItem);
    });
}

function updatePopularTreatments(clinicData) {
    const categoryGrid = document.querySelector('.category-grid');
    
    // Clear existing content
    categoryGrid.innerHTML = '';
    categoryGrid.classList.add('py-3');

    // Loop through clinicData and create image elements
    clinicData.forEach(data => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('category-card');
        
        const imgElement = document.createElement('img');
        imgElement.classList.add('team-member-image-two');
        imgElement.setAttribute('src', data.imgUrl);
        imgElement.setAttribute('loading', 'lazy');
        imgElement.setAttribute('alt', '');

        const titleElement = document.createElement('h6');
        titleElement.textContent = data.name;

        cardDiv.appendChild(imgElement);
        cardDiv.appendChild(titleElement);
        categoryGrid.appendChild(cardDiv);
    });
}

function updatePopularDiagnosis(clinicData) {
    const clinicServiceList = document.querySelector('.popular-diagnosis');
  
    // Clear existing content
    clinicServiceList.innerHTML = '';
  
    // Loop through clinicData and create service items
    clinicData.forEach(service => {
      const serviceItemDiv = document.createElement('div');
      serviceItemDiv.setAttribute('role', 'listitem');
      serviceItemDiv.classList.add('srvc-item', 'w-dyn-item');
  
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('description-srvc');
  
      const serviceLink = document.createElement('a');
      serviceLink.href = service.link;
      serviceLink.classList.add('image-srvc', 'w-inline-block');
  
      const serviceImage = document.createElement('img');
      serviceImage.alt = `Service Image - ${service.name}`;
      serviceImage.loading = 'lazy';
      serviceImage.src = service.imgUrl;
      serviceImage.sizes = "(max-width: 479px) 94vw, (max-width: 767px) 96vw, (max-width: 991px) 46vw, (max-width: 1279px) 30vw, 370px";
      serviceImage.classList.add('image-cover');
  
      const backgroundImageDiv = document.createElement('div');
      backgroundImageDiv.classList.add('bgr-image-srvc');
  
      const serviceNameHeading = document.createElement('h6');
      serviceNameHeading.classList.add('pt-1');
      serviceNameHeading.style.paddingLeft = "5px";
      serviceNameHeading.textContent = service.name;
  
      const serviceDescription = document.createElement('p');
      serviceDescription.classList.add('font-size-15', 'mb-50', 'home-2-banner', 'text-left');
      serviceDescription.textContent = service.description ?? 'We deeply comprehend the distinct healthcare requirements of children, and our mission is to offer compassionate and expert medical care for your little ones.';
  
      const learnMoreLink = document.createElement('a');
      learnMoreLink.href = service.link;
      learnMoreLink.classList.add('link-with-icon');
      learnMoreLink.textContent = "Learn More";
  
      const learnMoreIcon = document.createElement('span');
      learnMoreIcon.classList.add('text-button-icon');
      learnMoreIcon.innerHTML = ""; // Assuming this is a font icon
  
      // Append elements
      learnMoreLink.appendChild(learnMoreIcon);
      serviceLink.appendChild(serviceImage);
      serviceLink.appendChild(backgroundImageDiv);
      descriptionDiv.appendChild(serviceLink);
      descriptionDiv.appendChild(serviceNameHeading);
      descriptionDiv.appendChild(serviceDescription);
      descriptionDiv.appendChild(learnMoreLink);
      serviceItemDiv.appendChild(descriptionDiv);
      clinicServiceList.appendChild(serviceItemDiv);
    });
}

// Function to update the image elements with new URLs
function updateClinicImages(imageArray) {
    const container = document.querySelector('.collection-list-3');

    // Clear existing images
    container.innerHTML = '';

    // Iterate through the new images and create new elements
    imageArray.forEach((imageUrl, idx) => {
        // Create the outer div
        const outerDiv = document.createElement('div');
        outerDiv.setAttribute('role', 'listitem');
        outerDiv.classList.add('w-dyn-item', 'w-dyn-repeater-item');

        // Create the anchor element
        const anchor = document.createElement('a');
        anchor.setAttribute('href', '#');
        anchor.classList.add('lightbox-shop-details', 'w-inline-block', 'w-lightbox');

        // Create the image element
        const img = document.createElement('img');
        img.setAttribute('alt', '');
        img.setAttribute('loading', 'lazy');
        img.classList.add('image-cover', 'hover');
        img.setAttribute('src', imageUrl);
        img.setAttribute('sizes', '(max-width: 479px) 94vw, (max-width: 767px) 96vw, (max-width: 991px) 48vw, (max-width: 1279px) 21vw, 282.5625px');
        img.setAttribute('srcset', `${imageUrl}-500.jpg 500w, ${imageUrl}-800.jpg 800w, ${imageUrl}-1080.jpg 1080w, ${imageUrl}.jpg 1280w`);

        // Append the image to the anchor
        anchor.appendChild(img);

        const div1 = document.createElement('div');
        div1.classList.add('middle', 'primary-button' ,'w-button');
        div1.setAttribute('id', idx);
        const div2 = document.createElement('div');
        div2.classList.add('text');
        div2.textContent = 'Change Image';
        div1.appendChild(div2);

        anchor.appendChild(div1);


        // Create the script element for lightbox (if needed)
        const script = document.createElement('script');
        script.setAttribute('type', 'application/json');
        script.classList.add('w-json');
        script.textContent = JSON.stringify({
            items: [
                {
                    url: imageUrl,
                    type: 'image'
                }
            ],
            group: 'More Images'
        });

        // Append the script to the anchor
        anchor.appendChild(script);

        // Append the anchor to the outer div
        outerDiv.appendChild(anchor);

        // Append the outer div to the container
        container.appendChild(outerDiv);
    });
}

// Function to update clinic details
function updateClinicAddress(clinicData) {
    
    const container = document.querySelector('.clinic-location');

    // Clear the existing content inside the container
    container.innerHTML = '';

    const locationContainer = document.createElement('div');
    locationContainer.classList.add('location-container');

    // Create and append the map iframe
    const mapIframe = document.createElement('iframe');
    mapIframe.className = 'google-map';
    mapIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8724153948106!2d77.64782467486633!3d12.915920687394388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84bd6d67712958dd%3A0xf2cd0b28c34f9959!2sDigiClinik!5e0!3m2!1sen!2sin!4v1717911487665!5m2!1sen!2sin', // Replace with the new map URL;
    mapIframe.width = '600';
    mapIframe.height = '450';
    mapIframe.style.border = '0px solid white';
    mapIframe.allowFullscreen = '';
    mapIframe.loading = 'lazy';
    mapIframe.referrerPolicy = 'no-referrer-when-downgrade';
    locationContainer.appendChild(mapIframe);

    // Create and append the contacts wrapper
    const contactsWrapper = document.createElement('div');
    contactsWrapper.className = 'contacts-wrapper location-details';
    contactsWrapper.innerHTML = `
        <div class="contacts-content-wrapper">
            <h1 class="heading-banner large fz-26" style="color: white; text-align: center;">${clinicData.clinicName}</h1>
            <div class="row-contacts">
                <div class="icon-contacts">
                    <img src="https://assets-global.website-files.com/64c23c6ec82b2204b21af185/64d0e2429480c5b67d55995f_pin_drop_white_36dp.svg" loading="lazy" alt="">
                </div>
                <div class="text-contacts">
                    <p class="white-text font-size-18 m-0">Location</p>
                    <a href="${clinicData.clinicAddress}" target="_blank" class="link-white font-size-15"><b>${clinicData.clinicAddress}</b></a>
                </div>
            </div>
            <div class="row-contacts">
                <div class="icon-contacts">
                    <img src="https://assets-global.website-files.com/64c23c6ec82b2204b21af185/64d0e26ccce459ad69f506d8_email_white_36dp.svg" loading="lazy" alt="">
                </div>
                <div class="text-contacts">
                    <p class="white-text font-size-18 m-0">Timings</p>
                    <a class="link-white font-size-15"><b>${clinicData.clinicTimings}</b></a>
                </div>
            </div>
            <div class="row-contacts">
                <div class="icon-contacts">
                    <img src="https://assets-global.website-files.com/64c23c6ec82b2204b21af185/64d0e28d9fc52c0f23a7a19c_phone_white_36dp.svg" loading="lazy" alt="">
                </div>
                <div class="text-contacts">
                    <p class="white-text font-size-18 m-0">Phone</p>
                    <a href="tel:${clinicData.clinicPhoneNo}" class="link-white font-size-15">${clinicData.clinicPhoneNo}</a>
                </div>
            </div>
        </div>
    `;
    locationContainer.appendChild(contactsWrapper);
    container.appendChild(locationContainer);
}

function publish() {
    const headerTitle = document.getElementById('header-title').textContent;
    const heroDoctorName = document.getElementById('hero-doctorName').textContent;
    const heroTitle = document.getElementById('hero-title').textContent;
    const heroSubTitle = document.getElementById('hero-sub-title').textContent;
    const patientsConsulted = document.getElementById('customersServed').textContent;
    const ratings = document.getElementById('ratings').textContent?.split('/5')[0];
    const doctorName = document.getElementById('doctorDetails-Name').textContent;
    const qualification = document.getElementById('doctorDetails-Qualification').textContent;
    const speciality = document.getElementById('doctorDetails-Speciality').textContent;
    const experience = document.getElementById('doctorDetails-Experience').textContent.split('Years')[0].trim();
    const about = document.getElementById('doctorDetails-About').textContent;
    const kh1 = document.getElementById('keyHighlights-1').textContent;
    const kh2 = document.getElementById('keyHighlights-2').textContent;
    const kh3 = document.getElementById('keyHighlights-3').textContent;
    const dm = document.getElementById('doctor-message').textContent;
    const city = document.getElementById('city').textContent;
    const faq = getFAQData();
    console.log(faq);
    
    
    const formData = {
        headerTitle,
        heroTitle,
        heroSubTitle,
        patientsConsulted,
        ratings,
        doctorName,
        qualification,
        speciality,
        experience,
        about,
        kh1,
        kh2,
        kh3,
        dm,
        faq,
        selectedTheme,
        selectedThemeIndex,
        selectedFont,
        selectedFontIndex,
        city,
        heroDoctorName,
        uid: id
    };

    console.log('Data to publish : ', formData);

    axios.post('http://localhost:5000/api/clinic/saveForm', formData, {
        headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((d) => {
        console.log('Publish response : ', d);
        if(d.status === 200) {
            getDetails();
        }
    });
}

// Function to get FAQ data
function getFAQData() {
    const faqData = [];
  
    for (let i = 1; i <= 8; i++) {
        // Get the question element by ID
        let questionElement = document.getElementById(`faq${i}q`);
        // Get the answer element by ID
        let answerElement = document.getElementById(`faq${i}a`);
        
        // Create an object with the question and answer
        let faqObject = {
            id: `faq${i}`,
            question: questionElement ? questionElement.textContent.trim() : '',
            answer: answerElement ? answerElement.textContent.trim() : ''
        };
        
        // Push the object to the faqArray
        faqData.push(faqObject);
    }
  
    return faqData;
}

function toggleEditControl() {
    // In edit mode
    if(editControl) {
        editControl = false;
        document.getElementById('edit-notification-bar').style.display = 'none';
        // document.getElementById('main-navbar').style.marginTop = '0';
        document.querySelectorAll('[contenteditable=true]').forEach((e) => { 
            e.setAttribute('contenteditable', 'false');
            e.classList.remove('content-to-edit');
        });
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('main-menu-bar').style.display = 'block';
        document.getElementById('edit-menu-bar').style.display = 'none';
        publish();
    } 
    // In normal mode
    else {
        editControl = true;
        document.getElementById('edit-notification-bar').style.display = 'block';
        // document.getElementById('main-navbar').style.marginTop = '35px';
        document.querySelectorAll('[contenteditable=false]').forEach((e) => { 
            e.setAttribute('contenteditable', 'true');
            e.classList.add('content-to-edit');
        });
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('saveButton').style.display = 'block';
        document.getElementById('main-menu-bar').style.display = 'none';
        document.getElementById('edit-menu-bar').style.display = 'block';
    }

    // document.getElementById('edit-notification-bar').style.display = 'none';
    // document.getElementById('footer-nav-bar').style.display = 'none';
    // document.getElementById('announcement-bar').style.display = 'block';
    // document.getElementById('main-menu-bar').style.display = 'block';
}

const baseUrl = 'https://digi-clinik-backend.vercel.app/';
const newsLetterApi = baseUrl + "api/newsletters/subs/create";
const contactUsApi = baseUrl + "api/contacts/create";
const appointmentsApi = baseUrl + "api/appointments/create";
const getInTouchApi = baseUrl + "api/getintouch";
const clientId = id ?? "admin";

function convertFormToJSON(form) {
    let array = $(form).serializeArray();
    let json = {};
    $.each(array, function() {
        json[this.name] = this.value || "";
    });
    console.log(json)
    return json;
}

function disableSubmitButton() {
    $('.w-button').prop('value', 'Please wait...');
    $('.w-button').prop('disabled', true);
}

function enableSubmitButton() {
    $('.w-button').prop('value', 'Submit');
    $('.w-button').prop('disabled', false);
}

// Newsletter Subscriptions form function.
$(`form[action="${newsLetterApi}"]`).each(function(i, el) {
    let form = $(el);
    form.submit(function(e) {
        e.preventDefault();
        form = $(e.target);
        let data = convertFormToJSON(form);
        console.log('formData : ', data);
        let action = newsLetterApi;
        //form.attr("action");
        disableSubmitButton()
        $.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                "client_id": clientId
            },
            contentType: "application/json",
            dataType: "json",
            success: function() {
                let parent = $(form.parent());
                enableSubmitButton()
                // Hide the form
                parent.children("form").css("display", "none");
                // Display the "Done" block
                parent.children(".w-form-done").css("display", "block");
            },
            error: function() {
                let parent = $(form.parent());
                enableSubmitButton()
                // Display the "Failed" block
                parent.find(".w-form-fail").css("display", "block");
            },
        });
    });
});

// Contact Us form function.
$(`form[action="${contactUsApi}"]`).each(function(i, el) {
    let form = $(el);
    form.submit(function(e) {
        e.preventDefault();
        form = $(e.target);
        let data = convertFormToJSON(form);
        console.log('formData : ', data);
        let action = contactUsApi;
        //form.attr("action");
        disableSubmitButton()
        $.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                "client_id": clientId
            },
            contentType: "application/json",
            dataType: "json",
            success: function() {
                let parent = $(form.parent());
                enableSubmitButton()
                // Hide the form
                parent.children("form").css("display", "none");
                // Display the "Done" block
                parent.children(".w-form-done").css("display", "block");
            },
            error: function() {
                let parent = $(form.parent());
                enableSubmitButton()
                // Display the "Failed" block
                parent.find(".w-form-fail").css("display", "block");
            },
        });
    });
});

// Appointments form function.
$(`form[action="${appointmentsApi}"]`).each(function(i, el) {
    let form = $(el);
    form.submit(function(e) {
        e.preventDefault();
        form = $(e.target);
        let data = convertFormToJSON(form);
        console.log('formData : ', data);
        let action = appointmentsApi
        //form.attr("action");
        disableSubmitButton()
        $.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                "client_id": clientId
            },
            contentType: "application/json",
            dataType: "json",
            success: function() {
                let parent = $(form.parent());
                // Hide the form
                enableSubmitButton()
                parent.children("form").css("display", "none");
                // Display the "Done" block
                parent.children(".w-form-done").css("display", "block");
            },
            error: function() {
                let parent = $(form.parent());
                enableSubmitButton()
                // Display the "Failed" block
                parent.find(".w-form-fail").css("display", "block");
            },
        });
    });
});

// Get In Touch form function.
$(`form[action="${getInTouchApi}"]`).each(function(i, el) {
    let form = $(el);
    form.submit(function(e) {
        e.preventDefault();
        form = $(e.target);
        let data = convertFormToJSON(form);
        console.log('formData : ', data);
        let action = contactUsApi
        //form.attr("action");
        disableSubmitButton()
        $.ajax({
            url: action,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                "client_id": 'digiclinik-form-builder'
            },
            contentType: "application/json",
            dataType: "json",
            success: function() {
                let parent = $(form.parent());
                // Hide the form
                enableSubmitButton()
                parent.children("form").css("display", "none");
                // Display the "Done" block
                parent.children(".w-form-done").css("display", "block");
            },
            error: function() {
                let parent = $(form.parent());
                enableSubmitButton()
                // Display the "Failed" block
                parent.find(".w-form-fail").css("display", "block");
            },
        });
    });
});
   
function openWhatsApp() {
    const phone = clinicData.phoneNo;
    window.open(`https://wa.me/${phone}`)
}


function requestCallback() {
    axios.post
}

const themes = ['light-theme', 'pastel-theme', 'earthy-theme', 'monochrome-theme', 'vibrant-theme', 'root'];
let currentThemeIndex = 0;

const themeSwitcher = document.getElementById('themeSwitcher');
const htmlElement = document.documentElement;

themeSwitcher.addEventListener('click', () => {
    // Remove the current theme class
    htmlElement.classList.remove(themes[currentThemeIndex]);

    // Update the index to the next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    // Add the new theme class
    htmlElement.classList.add(themes[currentThemeIndex]);

    // Optionally, update the button text
    themeSwitcher.textContent = `${themes[(currentThemeIndex) % themes.length]}`;
    selectedTheme = themes[currentThemeIndex];
    selectedThemeIndex = currentThemeIndex;
});

let fonts = [
    "'Poppins', sans-serif",
    "'Open Sans', sans-serif",
    "'Nunito Sans', sans-serif",
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    "'Roboto', sans-serif",
    "sans-serif"
  ];
  
let currentFontIndex = 0;
  
function changeFont() {
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    document.body.style.fontFamily = fonts[currentFontIndex];
    selectedFont = fonts[currentFontIndex];
    selectedFontIndex = currentFontIndex;
}

// function switchTheme() {
//   currentThemeIndex = (currentThemeIndex + 1) % themes.length;
//   let theme = themes[currentThemeIndex];
  
//   for (let variable in theme) {
//     document.documentElement.style.setProperty(variable, theme[variable]);
//   }
// }