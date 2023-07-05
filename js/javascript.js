
 let menu = document.getElementById("menu");
 menu.addEventListener('click',function(e){
    document.querySelector('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('fa-xmark');
 })

let section=document.querySelector('.about');
let gspan=document.querySelectorAll('.progress span');


window.onscroll=function(){
  if(window.scrollY >= section.offsetTop + 350){
    gspan.forEach((span)=>{
      span.style.width = span.dataset.width;
    })
  }
}


//   active on scroll
let navLinks = document.querySelectorAll('nav ul li a');
let sections =document.querySelectorAll('section');

window.addEventListener('scroll',function(){
const scrollPos = window.scrollY + 20
sections.forEach(section=>{
if(scrollPos > section.offsetTop && scrollPos > (section.offsetTop )){
  navLinks.forEach(link=>{
    link.classList.remove('active');
    if(section.getAttribute('id')===link.getAttribute('href').substring(1)){
      link.classList.add('active')
    }
  });
}
});
});


// switch the color 


const styeSwitcherToggle =document.querySelector('.style-switcher-toggler');
styeSwitcherToggle.addEventListener("click",()=>{
  document.querySelector('.style-switcher').classList.toggle('open');
});

window.addEventListener("scroll",()=>{
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color){
    alternateStyles.forEach((style)=>{
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }
        else{
            style.setAttribute("disabled","true");
        }
    })
}

//   mood  

function da(){
  document.getElementById('body').style.backgroundColor='#212224';
  document.getElementById('body').style.color='white';
  document.getElementById('input1').style.backgroundColor='#303032';
  document.getElementById('input2').style.backgroundColor='#303032';
  document.getElementById('input3').style.backgroundColor='#303032';
  document.getElementById('input4').style.backgroundColor='#303032';
}
function lig(){
  document.getElementById('body').style.backgroundColor='white';
  document.getElementById('body').style.color='black';
  document.getElementById('input1').style.backgroundColor='#f0f1f8';
  document.getElementById('input2').style.backgroundColor='#f0f1f8';
  document.getElementById('input3').style.backgroundColor='#f0f1f8';
  document.getElementById('input4').style.backgroundColor='#f0f1f8';
}


//   portfolio

const filterContainer = document.querySelector(".gallery-filter"),
galleryItems = document.querySelectorAll(".gallery-item");

filterContainer.addEventListener("click", (event) =>{
  if(event.target.classList.contains("filter-item")){
     // deactivate existing active 'filter-item'
     filterContainer.querySelector(".active").classList.remove("active");
     // activate new 'filter-item'
     event.target.classList.add("active");
     const filterValue = event.target.getAttribute("data-filter");
     galleryItems.forEach((item) =>{
      if(item.classList.contains(filterValue) || filterValue === 'all'){
        item.classList.remove("hide");
         item.classList.add("show");
      }
      else{
        item.classList.remove("show");
        item.classList.add("hide");
      }
     });
  }
});


