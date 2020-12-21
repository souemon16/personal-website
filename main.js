//---------------- Navigation Menu ------------------
(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);
    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }
    // attach an event handler to document 
    document.addEventListener("click", (event) => {
        if(event.target.classList.contains("link-item")){
            console.log(event.target.hash);
            if(event.target.hash !== ""){
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active "section" 
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // Activate new "section" 
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                // Deactivate existing active navigation menu "link-item" 
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                // activate new navigation menu "link-item" 
                event.target.classList.add("active", "inner-shadow");
                event.target.classList.remove("outer-shadow", "outer-in-shadow");
                // hide navigation menu 
                hideNavMenu();
            }
        }
    })
})();

//---------------- About Section Tabs ------------------

(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener('click', (event) =>{
        if(event.target.classList.contains('tab-item') &&
        !event.target.classList.contains('active')){
            const target = event.target.getAttribute('data-target');
            // Deactivate Exiting Tab Item 
            tabsContainer.querySelector('.active').classList.remove('outer-shadow', 'active');
            // Activate New Tab Item 
            event.target.classList.add('outer-shadow', 'active');
            // Deactivate Exiting Tab Content
            aboutSection.querySelector('.tab-content.active').classList.remove('active');
            // Activate New Tab Content
            aboutSection.querySelector(target).classList.add('active'); 

        }
    })
})()


function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}

//---------------- Portfolio filter and popup ------------------
const filterContainer = document.querySelector(".portfolio-filter"),
portfolioItemsContainer = document.querySelector(".portfolio-items"),
portfolioItems = document.querySelectorAll(".portfolio-item"),
popup = document.querySelector(".portfolio-popup"),
prevBtn = popup.querySelector(".pp-prev"),
nextBtn = popup.querySelector(".pp-next"),
closeBtn = popup.querySelector(".pp-close"),
projectDetailsContainer = popup.querySelector(".pp-details"),
projectDetailBtn = popup.querySelector(".pp-project-details-btn");
let itemIndex, slideIndex, screenshots;

// filter portfolio items 
filterContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains("filter-item") && 
    !event.target.classList.contains("active")){
        // Deactivate existing active 'filter-item'
        filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
        // Activate new 'filter item'
        event.target.classList.add("active", "outer-shadow");
        const target = event.target.getAttribute("data-target");
        portfolioItems.forEach((item) => {
            if(target === item.getAttribute("data-category") || target === "all"){
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        })
    }


});


portfolioItemsContainer.addEventListener("click", (event) => {
    if(event.target.closest(".portfolio-item-inner")){
        const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
        // get the portfolioItem index 
        itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
        screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
        // convert screenshots into array 
        screenshots = screenshots.split(",");
        if(screenshots.length === 1){
            prevBtn.style.display="none";
            nextBtn.style.display="none";
        } else {
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        }
        slideIndex = 0
        popupToggle();
        popupSlideshow();
        popupDetailsToggle()
    }
});

// Close Button 
closeBtn.addEventListener("click", () => {
    popupToggle();
    if(projectDetailsContainer.classList.contains("active")){
        popupDetailsToggle();
    }
})
function popupToggle(){
    popup.classList.toggle("open");
    bodyScrollingToggle();
}
function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    // activate loader untill the popupImg loaded 
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src=imgSrc;
    popupImg.onload = () => {
        // deactive loader after the popupImg loaded 
        popup.querySelector(".pp-loader").classList.remove("active");
    }
    popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + "of" + screenshots.length;
}

// Next Slide 
nextBtn.addEventListener("click", () => {
    if(slideIndex === screenshots.length-1){
        slideIndex= 0;
    } else {
        slideIndex++;
    }
    popupSlideshow();
})

// Prev Slide 
prevBtn.addEventListener("click", () => {
    if(slideIndex === 0){
        slideIndex = screenshots.length-1
    } else {
        slideIndex--
    }
    popupSlideshow();
})

// Get the project details 
function popupDetails (){
    // if portfolio item details not exists 
    if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
        projectDetailBtn.style.display = "none";
        return; /* end function execution */
    } projectDetailBtn.style.display = "block";
    const details = portfolio[itemIndex].querySelector(".portfolio-item-details").innerHTML;
    popup.querySelector(".pp-project-details").innerHTML = details;
    const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
    popup.querySelector(".pp-title h2").innerHTML = title;
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
}

// Popup Details 
projectDetailBtn.addEventListener("click", () => {
    popupDetailsToggle();
})

function popupDetailsToggle() {
    projectDetailBtn.querySelector("i").classList.remove("fa-minus");
    projectDetailBtn.querySelector("i").classList.add("fa-minus");
    if(projectDetailsContainer.classList.contains("active")){
        projectDetailsContainer.classList.remove("active");
        projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
        projectDetailBtn.querySelector("i").classList.remove("fa-plus");
        projectDetailBtn.querySelector("i").classList.add("fa-plus");
        projectDetailsContainer.classList.add("active");
        projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
        popup.scrollTo(0,projectDetailsContainer.offsetTop);
    }
}


//---------------- Testimonial Slider -----------------

(() => {
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth;
    prevSliderBtn = document.querySelector(".testi-slider-nav .prev"),
    nextSliderBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // set width of all slides 
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })
    // set width of SliderContainer 
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextSliderBtn.addEventListener("click", () => {
        if(slideIndex === slides.length-1){
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        slider();
    })

    prevSliderBtn.addEventListener("click", ()=> {
        if(slideIndex === 0){
            slideIndex = slides.length-1;
        } else {
            slideIndex--;
        }
        slider();
    })
    function slider() {
        // deactivate existing active slides 
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        // activate new slide 
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
})();


//---------------- Section Work -----------------
(() => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })
})()



//---------------- Preloader -----------------
window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    }, 600)
})