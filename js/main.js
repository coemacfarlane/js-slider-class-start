let slideIndex = 0;
let prev;
let slides = document.getElementsByClassName("my-slides");

function initDots() {
    let temp = "";
    for (var i = 0; i < slides.length; i++) {
        temp += '<span class="dot" onclick="currentSlide('+ i +')"></span>';
    }
    document.getElementById("dot-nav").innerHTML = temp;
}

function plusSlides(n) {
    prev = slideIndex;
    slideIndex += n;
    slideIndex %= 3;
    if (slideIndex < 0) slideIndex = 2;
    showSlides(slideIndex);
}

function currentSlide(n) {
    prev = slideIndex;
    showSlides(slideIndex = n);
}

function showSlides(n) {
    console.log("current slide: " + slideIndex);
    console.log("previous slide: " + prev);

    

    if (prev !== undefined) {
        slides[prev].classList.toggle("active");
        slideOut(slides[prev]);
        slideIn(slides[n]);
    }
    else {
        slides[n].classList.toggle("active");
    }

    let dots = document.getElementsByClassName("dot");
    for (var i = 0; i < slides.length; i++) {
        if (i !== n) {
            if (dots[i].classList.contains("active")) dots[i].classList.toggle("active");
        }
        else if (i === n) {
            if (!dots[i].classList.contains("active")) dots[i].classList.toggle("active");
        }
    };
}

function slideOut(e) {
    let start = Date.now();
    let dist = 0;
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (timePassed >= 1500) {
            clearInterval(timer);
            return;
        }
        dist++
        e.style.transform = "translateX(" + dist + "%)";
        e.style.opacity = 1 - dist*2/100;
    }, 35);
    e.style.transform = "translateX(-" +dist+ "%)";
}

async function slideInAsync(e) {
    let start = Date.now();
    let dist = -40;
    e.style.transform = "translateX(" +dist+ "%)";
    let timer = setInterval(function() {
        let timePassed = Date.now() - start;
        if (timePassed >= 1500) {
            clearInterval(timer);
            return;
        }
        dist++
        e.style.transform = "translateX(" + dist + "%)";
        e.style.opacity = 1 + (dist)*2/100;
    }, 35);
    return;
}
async function slideIn(e) {
    await slideInAsync(e);
    e.classList.toggle("active");
}

initDots();
showSlides(slideIndex);