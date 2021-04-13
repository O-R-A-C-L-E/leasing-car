import { Calculator } from "./calculator.js";

const formCallBtns = document.querySelectorAll("[data-form-call-btn]");
const modal = document.querySelector("#modal");
const form = document.querySelector(".callback__modal");

const navDropDown = document.getElementById("nav__link-drop-down");

navDropDown.addEventListener("mouseenter", function (){
    let dropDown = document.querySelector(".nav__nested-list");
    dropDown.style.display = "flex"
    dropDown.addEventListener("mouseleave", function (){
        dropDown.style.display = "none";
    });
});


const nav = document.querySelector(".nav");
const hamburger = document.querySelector(".header__hamburger");
hamburger.addEventListener("click", function (){
    nav.style.display = "block";

})

nav.addEventListener("click", function (e){
    let menuCloseBtn = document.querySelector(".nav__mobile-menu-close-btn");
    if (e.target === menuCloseBtn){
        nav.classList.add("close-nav");
        setTimeout(() =>{
            nav.style.display = "none";
            nav.classList.remove("close-nav");
        },150);
    }
})


formCallBtns.forEach(btn => {
    btn.addEventListener("click", function (){
        modal.style.display = "block";
        form.classList.add("modal-animation-start");
    })
})

window.addEventListener("click", function (e)  {
    let closeBtn = document.querySelector(".callback__close-btn");
    let formBg = document.querySelector(".modal-background");

    if (e.target === formBg || e.target === closeBtn) {
        form.classList.add("modal-animation-end");
        setTimeout(()=>{
            modal.style.display = "none";
            form.classList.remove("modal-animation-end");
        },150)
    }
})





let slideIndex = 1;
let dots = document.querySelectorAll(".slider__navigation-dot");

showSlides(slideIndex);

dots.forEach((dot) => {
    dot.addEventListener("click", function (){
        let slideIndex = dot.getAttribute("data-slide-index");
        currentSlide(slideIndex);
    });

});

let prevNextSlideBtns = document.querySelectorAll("[data-change-slide]");

prevNextSlideBtns.forEach(btn => {
    btn.addEventListener("click", function (){
        let btnAttrValue = btn.getAttribute("data-change-slide");
        let goToSlideIndex = parseInt(btnAttrValue);
        plusSlides(goToSlideIndex);
    });
});


setInterval(() =>{
    let nextSlideBtnCircle = document.getElementById('animated-circle');
    nextSlideBtnCircle.classList.remove("slider__next-slide-btn-animation")
    prevNextSlideBtns[1].click();
    nextSlideBtnCircle.classList.add('slider__next-slide-btn-animation');
},10000);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".slider__slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("slider__navigation-dot_current", "");
    }
    slides[slideIndex-1].style.display = "flex";
    dots[slideIndex-1].className += " slider__navigation-dot_current";
}



let calcSliders = document.querySelectorAll(".slider__range-slider");
if (calcSliders){
    Calculator.calculate(calcSliders);
}


