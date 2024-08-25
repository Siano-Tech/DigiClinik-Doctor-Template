const env = window.location.hostname.includes('127') ? 'dev' : 'prod';
const apis = {
    dev: {
        details: 'http://localhost:5000/api/clinic/clinicData',
        saveForm: 'http://localhost:5000/api/clinic/saveForm'
    },
    prod: {
        details: 'https://website-builder-server.vercel.app/api/clinic/clinicData',
        saveForm: 'https://website-builder-server.vercel.app/api/clinic/saveForm'
    }
}

// Function to get the last segment of the URL path
function getId() {
    const pathArray = window.location.search.split('=')?.pop();
    return pathArray.length > 0 ? pathArray : null;
}

// Get the last URL segment
const id = getId() ?? '8e691157-d606-440d-aa61-60ab5fd6d42d';
let editControl = false;
let clinicData, userSelectedTheme='root', userSelectedThemeIndex, userSelectedFont, userSelectedFontIndex;

// Globalising diagnosis & procedures
let diagnosisG, proceduresG;

document.getElementById('saveButton').style.display = 'none';
document.querySelectorAll('[contenteditable=false]').forEach((e) => { 
    e.classList.add('text-blur');
});


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
    getDetails();
}

function getDetails() {
    axios.post(apis[env].details,{
        headers: { 'Access-Control-Allow-Origin': '*' },
        "id": id
    }).then((d) => {
        console.log(d);
        if(d.status === 200) {
            if(d.data.data) {
                if(d.data.data.doctorName) {
                    clinicData = d.data.data;
                    const {navbarTitle, doctorName, city, heroTitle, heroSubTitle, speciality, experience, qualification, workExperience, patientsConsulted, ratings} = d.data.data;
                    const {heroBookAppointmentTitle, heroBookAppointmentSubtitle, clinicAddr} = d.data.data;
                    const {proceduresTitle, proceduresSubtitle, procedures} = d.data.data;
                    const {doctorDetailsName, doctorDetailsSpeciality, doctorDetailsQualification, doctorDetailsAbout, doctorPic, qualificationDets} = d.data.data;
                    const {khHeader, khData, treatmentsTitle, treatmentsSubtitle, treatmentsData, diagnosis} = d.data.data;
                    const {testimonialTitle, testimonialSubtitle, testimonialsData} = d.data.data;
                    const {impactTitle, impactSubtitle, impactNumbers, impactNumbersDesc, impactPercentage, impactPercentageDesc, impactExperience, impactExperienceDesc} = d.data.data;
                    const {locationsTitle, locationsSubtitle, doctorMessage, dmName, dmDesignation} = d.data.data;
                    const {faqTitle, faqSubtitle, faqData, getintouchTitle, galleryTitle, gallerySubtitle, clinicGallery} = d.data.data;
                    const {newsletterTitle, newsletterSubtitle, footerTitle, footerDescription, copyrightText} = d.data.data;
                    const {selectedTheme, selectedFont, phoneNo, clinicName} = d.data.data;
                    
                    diagnosisG = diagnosis;
                    proceduresG = procedures;
                    document.getElementById('navbar-title').textContent = navbarTitle ?? doctorName;

                    // Popover data
                    document.getElementById('popup-name').setAttribute('value', clinicData?.doctorName);
                    document.getElementById('popup-phone-no').setAttribute('value', clinicData?.phoneNo);

                    let defHeroTitle = `Trusted Skin Care by ${doctorName} – Leading Dermatologist in ${city}`;
                    document.getElementById('hero-title').textContent = heroTitle ?? defHeroTitle;
                    
                    let hospitalsWorked = workExperience.map(e => e.hospitalName).join(' and ');
                    let defHeroSubtitle = `${doctorName}, with over ${experience} years of experience in dermatology, has been transforming the skin health of patients in ${city}. Having previously served at esteemed organisations such as ${hospitalsWorked}, ${doctorName} combines deep expertise with a personalized approach to provide top-tier skin care tailored to your unique needs.`;
                    document.getElementById('hero-subtitle').textContent = heroSubTitle ?? defHeroSubtitle;

                    document.getElementById('ratings').textContent = ratings ?? '4.5' + '/5';
                    document.getElementById('customers-served').textContent = patientsConsulted;

                    document.getElementById('hero-book-appointment-title').textContent = heroBookAppointmentTitle ?? `Book Your Appointment at ${clinicAddr[0].clinicName} Today`;
                    document.getElementById('hero-book-appointment-title-1').textContent = heroBookAppointmentTitle ?? `Book Your Appointment at ${clinicAddr[0].clinicName} Today`;
                    let defApptSubtitle = `Schedule a consultation with ${doctorName} at ${clinicAddr[0].clinicName} and take the first step towards healthier, glowing skin. Quick and easy booking available`
                    document.getElementById('hero-book-appointment-subtitle').textContent = heroBookAppointmentSubtitle ?? defApptSubtitle;

                    if(proceduresTitle) {
                        document.getElementById('procedures-title').textContent = proceduresTitle;
                    }
                    if(proceduresSubtitle) {
                        document.getElementById('procedures-subtitle').textContent = proceduresSubtitle;
                    }
                    updatePopularDiagnosis(procedures);
                    updatePopularDiagnosisMobile(procedures);

                    if(doctorPic) {
                        document.getElementById('doctor-details-pic').setAttribute('src', doctorPic);
                    }
                    document.getElementById('doctor-details-name').textContent = doctorDetailsName ?? doctorName;
                    document.getElementById('doctor-details-speciality').textContent = doctorDetailsSpeciality ?? `Consultant ${speciality}`;
                    document.getElementById('doctor-details-qualification').textContent = doctorDetailsQualification ?? qualification;
                    document.getElementById('doctor-details-experience').textContent = experience + ' Years of Experience';
                    let defDetAbout = `${doctorName} is a distinguished dermatologist with over ${experience} years of experience in treating various skin conditions. A graduate of ${qualificationDets[0].collegeName}, ${doctorName} refined their skills at renowned institutions like ${hospitalsWorked}, where they earned a reputation for delivering exceptional patient care.`
                    document.getElementById('doctor-details-about').textContent = doctorDetailsAbout ?? defDetAbout;

                    if(khHeader) {
                        document.getElementById('key-highlights-header').textContent = khHeader;
                    }
                    updateKhData(khData, d.data.data)

                    if(treatmentsTitle) {
                        document.getElementById('treatments-title').textContent = treatmentsTitle;
                    }
                    let defSubtitle = `Explore a range of skin conditions expertly managed by ${doctorName}. From common issues like acne and eczema to more complex concerns, our personalized treatment plans are designed to address your specific needs and restore your skin’s health and confidence.`
                    document.getElementById('treatments-subtitle').textContent = treatmentsSubtitle ?? defSubtitle;

                    if(!treatmentsData || treatmentsData.length === 0) {
                        updatePopularTreatments(diagnosis);
                    } else {
                        updatePopularTreatments(treatmentsData);
                    }

                    if(testimonialTitle) {
                        document.getElementById('testimonial-title').textContent = testimonialTitle;
                    }
                    // Hidden by default
                    // if(testimonialSubtitle) {
                    //     document.getElementById('testimonial-subtitle').textContent = testimonialSubtitle;
                    // }
                    updateTestimonialData(testimonialsData, doctorName)


                    if(impactTitle) {
                        document.getElementById('impact-title').textContent = impactTitle;
                    }
                    if(impactSubtitle) {
                        document.getElementById('impact-subtitle').textContent = impactSubtitle;
                    }
                    let defImpactNumbers = patientsConsulted + '+';
                    document.getElementById('impact-numbers').textContent = impactNumbers ?? defImpactNumbers;
                    if(impactNumbersDesc) {
                        document.getElementById('impact-numbers-desc').textContent = impactNumbersDesc;
                    }
                    
                    if(impactPercentage) {
                        document.getElementById('impact-percentage').textContent = impactPercentage;
                    }
                    if(impactPercentageDesc) {
                        document.getElementById('impact-percentage-desc').textContent = impactPercentageDesc;
                    }
                    let defExp = experience + '+'
                    document.getElementById('impact-experience').textContent = impactExperience ?? defExp;
                    if(impactExperienceDesc) {
                        document.getElementById('impact-experience-desc').textContent = impactExperienceDesc;
                    }

                    if(locationsTitle) {
                        document.getElementById('locations-title').textContent = locationsTitle;
                    }
                    let defLocSubtitle = `Conveniently located in ${city}, our clinic offers comprehensive dermatological care with easy access and modern facilities.`    
                    document.getElementById('locations-subtitle').textContent = locationsSubtitle ?? defLocSubtitle;

                    if(doctorPic) {
                        document.getElementById('dm-pic').setAttribute('src', doctorPic);
                    }
                    if(doctorMessage) {
                        document.getElementById('doctor-message').textContent = doctorMessage;
                    }
                    document.getElementById('dm-name').textContent = dmName ?? doctorName;
                    document.getElementById('dm-designation').textContent = dmDesignation ?? qualification + ' | Consultant ' + speciality;

                    if(faqTitle) {
                        document.getElementById('faq-title').textContent = faqTitle;
                    }
                    if(faqSubtitle) {
                        document.getElementById('faq-subtitle').textContent = faqSubtitle;
                    }
                    updateFaqData(faqData, clinicData);


                    if(getintouchTitle) {
                        document.getElementById('getintouch-title').textContent = getintouchTitle;
                    }
                    if(galleryTitle) {
                        document.getElementById('gallery-title').textContent = galleryTitle;
                    }
                    // if(gallerySubtitle) {
                    let defGallerySubtitle = `See the results of our treatments and procedures at ${clinicName}. Real transformations, real care.`
                    document.getElementById('gallery-subtitle').textContent = gallerySubtitle ?? defGallerySubtitle;
                    // }

                    if(newsletterTitle) {
                        document.getElementById('newsletter-title').textContent = newsletterTitle;
                    } 
                    if(newsletterSubtitle) {
                        document.getElementById('newsletter-subtitle').textContent = newsletterSubtitle;
                    } 
                    
                    let defFooterTitle = doctorName
                    document.getElementById('footer-title').textContent = footerTitle ?? defFooterTitle;
                    let defFooterDesc = `Start your path to wellness today with ${clinicAddr[0].clinicName}!`
                    document.getElementById('footer-description').textContent = footerDescription ?? defFooterDesc;
                    let defCopyrightText = `© ${doctorName}. All Rights Reserved 2024.`
                    document.getElementById('copyright-text').textContent = defCopyrightText ?? copyrightText;

                    // document.getElementById('bookappointment-title').textContent = `Book Your Appointment at ${clinicAddr[0]?.clinicName} Today`;
                    // document.getElementById('bookappointment-desc').textContent = `Schedule a consultation with ${doctorName} at ${clinicAddr[0]?.clinicName} and take the first step towards healthier, glowing skin. Quick and easy booking available`;
                    // // document.getElementById('hero-title').textContent = `Trusted Skin Care by ${doctorName} – Leading Dermatologist in ${city}`;
                    // // document.getElementById('hero-sub-title').textContent = heroSubTitle;
                    // document.getElementById('customersServed').textContent = patientsConsulted;
                    // document.getElementById('ratings').textContent = ratings + '/5';
                    // document.getElementById('doctorDetails-Pic').setAttribute('src', doctorPic);
                    // document.getElementById('doctorDetails-Name').textContent = doctorName;
                    // document.getElementById('doctorDetails-Speciality').textContent = `Consultant ${speciality}`;
                    // document.getElementById('doctorDetails-Experience').textContent = experience + ' Years of Experience';
                    // document.getElementById('doctorDetails-Qualification').textContent = qualification;
                    // const exp = workExperience.map(e => e.hospitalName).join(' and ');
                    // const abt = `${doctorName} is a distinguished dermatologist with over ${experience} years of experience in treating various skin conditions. A graduate of ${qualificationDets[0].collegeName}, ${doctorName} refined their skills at renowned institutions like ${exp}, where they earned a reputation for delivering exceptional patient care. Specializing in ${speciality}, ${doctorName} is dedicated to using the latest dermatological advancements to provide personalized treatment plans tailored to each patient's unique needs.`
                    // document.getElementById('doctorDetails-About').textContent = abt ?? about;
                    // document.getElementById('dm-pic').setAttribute('src', doctorPic);
                    // const dmname = dmName ?? doctorName;;
                    // document.getElementById('dm-name').textContent = '' + dmname;
                    // document.getElementById('dm-designation').textContent = dmDesignation ?? speciality ;
                    // document.getElementById('impact-numbers').textContent = patientsConsulted + '+' ?? '100+';
                    // document.getElementById('impact-percentage').textContent = '90%';
                    // document.getElementById('impact-experience').textContent = experience;
                    // document.getElementById('clinic-loc').textContent = `Conveniently located in ${city}, our clinic offers comprehensive dermatological care with easy access and modern facilities.`;

                    // updatePopularTreatments(procedures);
                    // updatePopularTreatmentsMobile(procedures);
                    // updatePopularDiagnosis(diagnosis);
                    updateClinicImages(clinicGallery);
                    updateClinicAddress(d.data.data);
                    if(selectedTheme) {
                        userSelectedTheme = selectedTheme;
                        setSelectedTheme(d.data.data)
                    }
                    if(selectedFont) {
                        userSelectedFont = selectedFont;
                        userSelectedFontIndex = selectedFontIndex
                        setSelectedFont(d.data.data)
                    }
                    addEditControls()
                }
            }
        }
    }).catch((e) => {
        console.log('No data found for the id - ', id);
        document.querySelectorAll('[contenteditable=false]').forEach((e) => { 
            e.classList.remove('text-blur');
        });
    });
}

function populateDialog() {
    // setTimeout(() => {
    //     // Popover data
    //     document.getElementById('popup-name').setAttribute('value', clinicData?.doctorName);
    //     document.getElementById('popup-phone-no').setAttribute('value', clinicData?.phoneNo);
    // }, 0);
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

    document.querySelectorAll('[contenteditable=false]').forEach((e) => { 
        e.classList.remove('text-blur');
    });
}

function setSelectedTheme(clinicData) {
    const {selectedTheme} = clinicData;
    const htmlElement = document.documentElement;
    htmlElement.classList.add(selectedTheme);
    document.getElementById(selectedTheme).classList.add('selected');
}

function setSelectedFont(clinicData) {
    const {selectedFont, selectedFontIndex} = clinicData;
    document.body.style.fontFamily = selectedFont;
    document.getElementById('font-palette-'+selectedFontIndex??0).classList.add('selected');
}

function updatePopularDiagnosisMobile(clinicData) {
    if(!clinicData || clinicData.length === 0) {
        return;
    }

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

function updatePopularDiagnosis(clinicData) {
    if(!clinicData || clinicData.length === 0) {
        return;
    }
    const categoryGrid = document.querySelector('.category-grid');
    
    // Clear existing content
    categoryGrid.innerHTML = '';
    categoryGrid.classList.add('py-3');

    // Loop through clinicData and create image elements
    clinicData.forEach((data, idx) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('category-card');
        
        const imgElement = document.createElement('img');
        imgElement.classList.add('team-member-image-two');
        imgElement.setAttribute('src', proceduresG[idx].imgUrl);
        imgElement.setAttribute('loading', 'lazy');
        imgElement.setAttribute('alt', '');

        const titleElement = document.createElement('h6');
        titleElement.textContent = data.name;

        cardDiv.appendChild(imgElement);
        cardDiv.appendChild(titleElement);
        categoryGrid.appendChild(cardDiv);
    });
}

function updatePopularTreatments(clinicData) {
    if(!clinicData || clinicData.length === 0) {
        return;
    }
    const clinicServiceList = document.querySelector('.popular-treatments');
  
    // Clear existing content
    clinicServiceList.innerHTML = '';
  
    // Loop through clinicData and create service items
    clinicData.forEach((service, idx) => {
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
      serviceImage.setAttribute('id','treatments-imgUrl-'+(idx+1));
  
      const backgroundImageDiv = document.createElement('div');
      backgroundImageDiv.classList.add('bgr-image-srvc');
  
      const serviceNameHeading = document.createElement('h6');
      serviceNameHeading.classList.add('pt-1');
      serviceNameHeading.style.paddingLeft = "5px";
      serviceNameHeading.setAttribute('id','treatments-title-'+(idx+1));
      serviceNameHeading.setAttribute('contenteditable','false');
      serviceNameHeading.textContent = service.name;
  
      const serviceDescription = document.createElement('p');
      serviceDescription.classList.add('font-size-15', 'mb-50', 'home-2-banner', 'text-left');
      serviceDescription.setAttribute('id','treatments-desc-'+(idx+1));
      serviceDescription.setAttribute('contenteditable','false');
      serviceDescription.textContent = service.description ?? 'We deeply comprehend the distinct healthcare requirements of children, and our mission is to offer compassionate and expert medical care for your little ones.';
  
    //   const learnMoreLink = document.createElement('a');
    //   learnMoreLink.href = service.link;
    //   learnMoreLink.classList.add('link-with-icon');
    //   learnMoreLink.textContent = "Learn More";
  
    //   const learnMoreIcon = document.createElement('span');
    //   learnMoreIcon.classList.add('text-button-icon');
    //   learnMoreIcon.innerHTML = ""; // Assuming this is a font icon
  
    //   // Append elements
    //   learnMoreLink.appendChild(learnMoreIcon);
      serviceLink.appendChild(serviceImage);
      serviceLink.appendChild(backgroundImageDiv);
      descriptionDiv.appendChild(serviceLink);
      descriptionDiv.appendChild(serviceNameHeading);
      descriptionDiv.appendChild(serviceDescription);
    //   descriptionDiv.appendChild(learnMoreLink);
      serviceItemDiv.appendChild(descriptionDiv);
      clinicServiceList.appendChild(serviceItemDiv);
    });
}

// Function to update the image elements with new URLs
function updateClinicImages(imageArray) {
    if(!imageArray || imageArray.length === 0) {
        return;
    }
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
        // img.setAttribute('sizes', '(max-width: 479px) 94vw, (max-width: 767px) 96vw, (max-width: 991px) 48vw, (max-width: 1279px) 21vw, 282.5625px');
        // img.setAttribute('srcset', `${imageUrl}-500.jpg 500w, ${imageUrl}-800.jpg 800w, ${imageUrl}-1080.jpg 1080w, ${imageUrl}.jpg 1280w`);

        // Append the image to the anchor
        anchor.appendChild(img);

        // const div1 = document.createElement('div');
        // div1.classList.add('middle', 'primary-button' ,'w-button');
        // div1.setAttribute('id', idx);
        // const div2 = document.createElement('div');
        // div2.classList.add('text');
        // div2.textContent = 'Change Image';
        // div1.appendChild(div2);

        // anchor.appendChild(div1);


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

function updateKhData(khData, clinicData) {
  
    // Show default Key Highlights
    if(!khData || khData.length === 0) {
        const {workExperience, qualificationDets, doctorName} = clinicData;
        let colleges = qualificationDets.map(e => e.collegeName).join(' and ');
        let hospitalsWorked = workExperience.map(e => e.hospitalName).join(' and ');
        let defKh1Desc, defKh2Desc;
        if(qualificationDets.length === 1) {
            defKh1Desc = `${doctorName} completed their medical education at ${qualificationDets[0].collegeName}, graduating with a ${qualificationDets[0].qualification} in ${qualificationDets[0].yog}. This comprehensive education laid a strong foundation for their extensive expertise in the field of dermatology.`;
        } else if(qualificationDets.length === 2) {
            defKh1Desc = `${doctorName} completed their medical education at ${qualificationDets[0].collegeName}, graduating with a ${qualificationDets[0].qualification} in ${qualificationDets[0].yog}. They further specialized in dermatology, obtaining their ${qualificationDets[1].qualification} in ${qualificationDets[1].yog}. This comprehensive education laid a strong foundation for their extensive expertise in the field of dermatology.`;
        }

        if(workExperience.length === 1) {
            defKh2Desc = `${doctorName} began their career at ${workExperience[0].hospitalName}, where they worked from ${workExperience[0].workYrs}. During their time at these esteemed institutions, ${doctorName} gained invaluable experience and developed a reputation for excellence in dermatological care.`
        } else if(qualificationDets.length === 2) {
            defKh2Desc = `${doctorName} began their career at ${workExperience[0].hospitalName}, where they worked from ${workExperience[0].workYrs}. They then continued their professional journey at ${workExperience[1].hospitalName}, serving from ${workExperience[1].workYrs}. During their time at these esteemed institutions, ${doctorName} gained invaluable experience and developed a reputation for excellence in dermatological care.`
        }

        let defKhData = [
            {
                id: 1,
                title: 'Educational Excellence',
                desc: defKh1Desc
            },
            {
                id: 2,
                title: 'Extensive Experience',
                desc: defKh2Desc
            },
            {
                id: 3,
                title: 'Awards and Recognitions',
                desc: 'Awards and Recognitions'
            },
        ];

        defKhData.forEach((kh, index) => {
            // Create the accordion-wrap div
            let id = kh.id;
            let titleId = 'key-highlights-title-'+id;
            let descId = 'key-highlights-desc-'+id;
      
            document.getElementById(titleId).textContent = kh.title;
            document.getElementById(descId).textContent = kh.desc;
        });
    } 
    // Show Key Highlights from databse
    else {
        khData.forEach((kh, index) => {
          // Create the accordion-wrap div
          let id = kh.id;
          let titleId = 'key-highlights-title-'+id;
          let descId = 'key-highlights-desc-'+id;
    
          document.getElementById(titleId).textContent = kh.title;
          document.getElementById(descId).textContent = kh.desc;
        });
    }

}

function updateFaqData(faqData, clinicData) {
  
    if(!faqData || faqData.length === 0) {
        const { clinicName, doctorName, clinicPhoneNo, city } = clinicData;
        let defData = [
            {
                id: 1,
                question: `What types of skin conditions do you treat at ${clinicName}?`,
                answer: `At ${clinicName}, ${doctorName} specializes in treating a wide range of skin conditions, including acne, eczema, psoriasis, rosacea, skin cancer, hyperpigmentation, alopecia, vitiligo, warts, and contact dermatitis.`,
            },
            {
                id: 2,
                question: `How do I know if I need to see a dermatologist?`,
                answer: `If you are experiencing persistent skin issues such as acne, unusual moles, rashes, hair loss, or any other skin, hair, or nail conditions, it’s advisable to see a dermatologist. ${doctorName} at ${clinicName} in ${city} can help diagnose and treat these concerns effectively.`,
            },
            {
                id: 3,
                question: `How can I book an appointment with ${doctorName}?`,
                answer: `You can book an appointment with ${doctorName} by using our online booking system or by calling our clinic directly at ${clinicPhoneNo}. Alternatively, you can visit our Book Appointment page for more information.`,
            },
            {
                id: 4,
                question: `What should I expect during my first consultation?`,
                answer: `During your first consultation at ${clinicName}, ${doctorName} will review your medical history, discuss your skin concerns, and perform a thorough examination. Based on the findings, a personalized treatment plan will be recommended to address your specific needs.`,
            },
            {
                id: 5,
                question: `How long does it take to see results from dermatological treatments?`,
                answer: `The time it takes to see results varies depending on the treatment and the condition being addressed. Some treatments, like chemical peels, may show results within a week, while others, such as acne or hair loss treatments, may take several weeks to months. ${doctorName} will provide you with a realistic timeline during your consultation.`,
            },
            {
                id: 6,
                question: `What should I bring to my first appointment with ${doctorName}?`,
                answer: `For your first appointment, please bring any relevant medical records or previous skin treatment history. This will help Dr. ${doctorName} provide the most accurate diagnosis and treatment plan.`,
            },
            {
                id: 7,
                question: `How do I prepare for a skin treatment or procedure at ${clinicName}?`,
                answer: `Preparation depends on the specific treatment or procedure. Generally, you should follow any pre-appointment instructions provided by our office, which may include avoiding certain medications or skincare products. Our staff will provide detailed instructions when you schedule your appointment.`,
            },
            {
                id: 8,
                question: `What are the benefits of seeing a dermatologist versus using over-the-counter products?`,
                answer: `Seeing a dermatologist like ${doctorName} at ${clinicName} ensures that your skin concerns are properly diagnosed and treated with professional-grade products and techniques. Over-the-counter products may not be as effective or tailored to your specific needs, potentially leading to prolonged issues or even worsening of the condition.`,
            },
        ];
        defData.forEach((data, index) => {
            // Create the accordion-wrap div
            let id = data.id;
            let qid = 'faq'+id+'q';
            let aid = 'faq'+id+'a';

            document.getElementById(qid).textContent = data.question;
            document.getElementById(aid).textContent = data.answer;
      
            // document.getElementById(contentId).textContent = data.content?.replace("[Doctor's Name]", doctorName);
            // document.getElementById(authorId).textContent = data.author;
        });
    } else {
        // Iterate over the FAQ data
        faqData.forEach((faq, index) => {
          // Create the accordion-wrap div
          let id = faq.id;
          let qid = id+'q';
          let aid = id+'a';
    
          document.getElementById(qid).textContent = faq.question;
          document.getElementById(aid).textContent = faq.answer;
        });
    }

}

function updateTestimonialData(testimonialData, doctorName) {
    if(!testimonialData || testimonialData.length === 0) {

        let defData = [
            {
                id: 1,
                content: `"${doctorName} transformed my skin with their expert acne treatment. After trying numerous products with no success, I finally found relief and clear skin. Their personalized approach made all the difference."`,
                author: 'Aarav Patel',
            },
            {
                id: 2,
                content: `"${doctorName} provided excellent care for my psoriasis. Their thorough explanation of the condition and the tailored treatment plan helped manage my symptoms effectively. I feel much better now."`,
                author: 'Rohan Gupta',
            },
            {
                id: 3,
                content: `"Receiving treatment for skin cancer from ${doctorName} was a relief. Their professionalism, clear communication, and effective treatment plan gave me confidence and hope. I’m very thankful."`,
                author: 'Vikram Singh',
            },
            {
                id: 4,
                content: `"I struggled with eczema for years, and ${doctorName} was a game-changer. The treatment plan and advice provided have brought me incredible relief and improved my quality of life."`,
                author: 'Priya Sharma',
            },
            {
                id: 5,
                content: `"I was struggling with rosacea, but ${doctorName}'s expertise made a huge difference. The customized treatment plan has significantly reduced redness and improved my skin’s appearance."`,
                author: 'Ananya Rao',
            },
            {
                id: 6,
                content: `"${doctorName} addressed my hyperpigmentation issue with remarkable expertise. The results have been fantastic, and I appreciate their thorough and attentive care."`,
                author: 'Neha Patel',
            },
        ];
        defData.forEach((data, index) => {
            // Create the accordion-wrap div
            let id = data.id;
            let contentId = 'testimonial-content-'+id;
            let authorId = 'testimonial-author-'+id;
      
            document.getElementById(contentId).textContent = data.content?.replace("[Doctor's Name]", doctorName);
            document.getElementById(authorId).textContent = data.author;
        });
    } else {
        // Iterate over the FAQ data
        testimonialData.forEach((testimonial, index) => {
          // Create the accordion-wrap div
          let id = testimonial.id;
          let contentId = 'testimonial-content-'+id;
          let authorId = 'testimonial-author-'+id;
    
          document.getElementById(contentId).textContent = testimonial.content?.replace("[Doctor's Name]", doctorName);
          document.getElementById(authorId).textContent = testimonial.author;
        });
    }
}

function publish() {

    const navbarTitle = document.getElementById('navbar-title').textContent;

    const heroTitle = document.getElementById('hero-title').textContent;
    const heroSubTitle = document.getElementById('hero-subtitle').textContent;
    const ratings = document.getElementById('ratings').textContent?.split('/5')[0];
    const patientsConsulted = document.getElementById('customers-served').textContent;
    let heroBookAppointmentTitle = document.getElementById('hero-book-appointment-title').textContent;
    heroBookAppointmentTitle = document.getElementById('hero-book-appointment-title-1').textContent;
    const heroBookAppointmentSubtitle = document.getElementById('hero-book-appointment-subtitle').textContent;
    
    const proceduresTitle = document.getElementById('procedures-title').textContent;
    const proceduresSubtitle = document.getElementById('procedures-subtitle').textContent;
    
    const doctorDetailsName = document.getElementById('doctor-details-name').textContent;
    const doctorDetailsSpeciality = document.getElementById('doctor-details-speciality').textContent;
    const doctorDetailsQualification = document.getElementById('doctor-details-qualification').textContent;
    const experience = document.getElementById('doctor-details-experience').textContent.split('Years')[0].trim();
    const doctorDetailsAbout = document.getElementById('doctor-details-about').textContent;
    
    const khHeader = document.getElementById('key-highlights-header').textContent;
    const khData = getKHData();

    const treatmentsTitle = document.getElementById('treatments-title').textContent;
    const treatmentsSubtitle = document.getElementById('treatments-subtitle').textContent;
    const treatmentsData = getTreatmentsData();

    const testimonialTitle = document.getElementById('testimonial-title').textContent;
    const testimonialSubtitle = document.getElementById('testimonial-subtitle').textContent;
    const testimonialsData = getTestimonialData();

    const impactTitle = document.getElementById('impact-title').textContent;
    const impactSubtitle = document.getElementById('impact-subtitle').textContent;
    const impactNumbers = document.getElementById('impact-numbers').textContent;
    const impactNumbersDesc = document.getElementById('impact-numbers-desc').textContent;
    const impactPercentage = document.getElementById('impact-percentage').textContent;
    const impactPercentageDesc = document.getElementById('impact-percentage-desc').textContent;
    const impactExperience = document.getElementById('impact-experience').textContent;
    const impactExperienceDesc = document.getElementById('impact-experience-desc').textContent;

    const locationsTitle = document.getElementById('locations-title').textContent;
    const locationsSubtitle = document.getElementById('locations-subtitle').textContent;
    
    const doctorMessage = document.getElementById('doctor-message').textContent;
    const dmName = document.getElementById('dm-name').textContent;
    const dmDesignation = document.getElementById('dm-designation').textContent;

    const faqTitle = document.getElementById('faq-title').textContent;
    const faqSubtitle = document.getElementById('faq-subtitle').textContent;
    const faqData = getFAQData();

    const getintouchTitle = document.getElementById('getintouch-title').textContent;

    const galleryTitle = document.getElementById('gallery-title').textContent;
    const gallerySubtitle = document.getElementById('gallery-subtitle').textContent;

    const newsletterTitle = document.getElementById('newsletter-title').textContent;
    const newsletterSubtitle = document.getElementById('newsletter-subtitle').textContent;

    const footerTitle = document.getElementById('footer-title').textContent;
    const footerDescription = document.getElementById('footer-description').textContent;
    const copyrightText = document.getElementById('copyright-text').textContent;
    
    const formData = {
        navbarTitle,
        heroBookAppointmentTitle,
        heroBookAppointmentSubtitle,
        ratings,
        patientsConsulted,
        heroTitle,
        heroSubTitle,
        proceduresTitle,
        proceduresSubtitle,
        doctorDetailsName,
        doctorDetailsSpeciality,
        doctorDetailsQualification,
        experience,
        doctorDetailsAbout,
        khHeader,
        khData,
        treatmentsTitle,
        treatmentsSubtitle,
        treatmentsData,
        testimonialTitle,
        testimonialSubtitle,
        testimonialsData,
        impactTitle,
        impactSubtitle,
        impactNumbers,
        impactNumbersDesc,
        impactPercentage,
        impactPercentageDesc,
        impactExperience,
        impactExperienceDesc,
        locationsTitle,
        locationsSubtitle,
        doctorMessage,
        dmName,
        dmDesignation,
        faqTitle,
        faqSubtitle,
        faqData,
        getintouchTitle,
        galleryTitle,
        gallerySubtitle,
        newsletterTitle,
        newsletterSubtitle,
        footerTitle,
        footerDescription,
        copyrightText,
        userSelectedTheme,
        userSelectedFont,
        uid: id
    };

    console.log('Data to publish : ', formData);

    axios.post(apis[env].saveForm, formData, {
        headers: { 'Access-Control-Allow-Origin': '*' },
    }).then((d) => {
        console.log('Publish response : ', d);
        if(d.status === 200) {
            getDetails();
        }
    });
}

// Function to get Key Highlight data
function getKHData() {
    const KHData = [];
  
    for (let i = 1; i <= 3; i++) {
        // Get the question element by ID
        let title = document.getElementById(`key-highlights-title-${i}`);
        // Get the answer element by ID
        let desc = document.getElementById(`key-highlights-desc-${i}`);
        
        // Create an object with the question and answer
        let KHObject = {
            id: i,
            title: title ? title.textContent.trim() : '',
            desc: desc ? desc.textContent.trim() : ''
        };
        
        // Push the object to the faqArray
        KHData.push(KHObject);
    }
  
    return KHData;
}

// Function to get treatments data
function getTreatmentsData() {
    const treatmentData = [];
  
    for (let i = 1; i <= diagnosisG.length; i++) {
        let imgUrl = document.getElementById(`treatments-imgUrl-${i}`);
        let title = document.getElementById(`treatments-title-${i}`);
        let desc = document.getElementById(`treatments-desc-${i}`);
        
        // Create an object with the question and answer
        let treatmentObj = {
            id: i,
            imgUrl: imgUrl.src,
            name: title ? title.textContent.trim() : '',
            desc: desc ? desc.textContent.trim() : '',
        };
        
        // Push the object to the faqArray
        treatmentData.push(treatmentObj);
    }
  
    return treatmentData;
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

// Function to get FAQ data
function getTestimonialData() {
    const testimonialData = [];
  
    for (let i = 1; i <= 6; i++) {
        // Get the question element by ID
        let content = document.getElementById(`testimonial-content-${i}`);
        // Get the answer element by ID
        let author = document.getElementById(`testimonial-author-${i}`);
        
        // Create an object with the question and answer
        let testimonialObject = {
            id: i,
            content: content ? content.textContent.trim() : '',
            author: author ? author.textContent.trim() : ''
        };
        
        // Push the object to the faqArray
        testimonialData.push(testimonialObject);
    }
  
    return testimonialData;
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

        // Changing layout of some elements
        document.getElementsByClassName('background-video')[0].style.height = '700px';
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

// Required by switchTheme Method
const themes = ['light-theme', 'pastel-theme', 'earthy-theme', 'monochrome-theme', 'vibrant-theme', 'root'];
// let currentThemeIndex = 0;

// const themeSwitcher = document.getElementById('themeSwitcher');
// const htmlElement = document.documentElement;

// themeSwitcher.addEventListener('click', () => {
//     // Remove the current theme class
//     htmlElement.classList.remove(themes[currentThemeIndex]);

//     // Update the index to the next theme
//     currentThemeIndex = (currentThemeIndex + 1) % themes.length;

//     // Add the new theme class
//     htmlElement.classList.add(themes[currentThemeIndex]);

//     // Optionally, update the button text
//     themeSwitcher.textContent = `${themes[(currentThemeIndex) % themes.length]}`;
//     selectedTheme = themes[currentThemeIndex];
//     selectedThemeIndex = currentThemeIndex;
// });

let fonts = [
    "",
    "'Poppins', sans-serif",
    "'Open Sans', sans-serif",
    "'Nunito Sans', sans-serif",
    "'Courier', sans-serif",
    "'Arial', sans-serif"
];
  
let currentFontIndex = 0;
  
function switchFont(index) {
    // currentFontIndex = (currentFontIndex + 1) % fonts.length;
    document.body.style.fontFamily = fonts[index];
    document.getElementById('font-palette-'+index).classList.add('selected');
    document.getElementById('font-palette-'+(userSelectedFontIndex??0)).classList.remove('selected');
    userSelectedFont = fonts[index];
    userSelectedFontIndex = index;
}

// function toggleFaqAccordion(ev) {
//     let id;
//     if(ev) {
//         id = ev.target.id.split('faq').pop().replace('q', 'a')
//         document.getElementById(id).style.display=document.getElementById(id).style.display === 'block' ? 'none' : 'block'
//     }
// }

function switchTheme(theme) {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove(userSelectedTheme);
    htmlElement.classList.add(theme);
    document.getElementById(userSelectedTheme).classList.remove('selected');
    document.getElementById(theme).classList.add('selected');
    userSelectedTheme = theme;
}

// First change all the html elements to edit and add id's to them
// Clear the user data from database and add new data in website builder form save it and open the redirected site
// Append all the data from dataabase to applicable fields by editing and replacing the content necessary
// Append data tio fields and in fields where there's array data involved append the correct ids and assign contenteditable attributes
// Check all the data is correctly appended to the UI
// Now edit and check if the data is saved correctly retrieving from correct fields
// Also check if the saved data is correctly populated on to the screen
// For first time appending use default template data and for data from database, use data from databse istead of std data