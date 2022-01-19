/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');
let navBar= document.querySelector('#navBar__list');




//the below property gets the position of the top line of the page view relative to the page
/**
 * End Global Variables
 * 
 * Start Helper Functions
*/
function addSec(numb){
    let tagContent=sections[0].innerHTML;
    const newSec=document.createElement('section');
    sections[0].parentElement.appendChild(newSec)
    newSec.innerHTML=tagContent;
    newSec.id="section"+numb;
    newSec.dataset.nav="Section "+numb;
    let newtagChild=newSec.firstElementChild;
    newtagChild.firstElementChild.textContent='Section '+numb;
   
}
addSec(4);
addSec(5);
function addScrollButton(){
    let currentView= document.body.scrollTop;
    if (currentView>300){
        let scrollBut=document.createElement('button');
        scrollBut.textContent='^';
        scrollBut.style.cssText="background-color:transparent;border:5px;position: fixed;top: 550;z-index:5;font-size: 3em;";
        let mainBody=document.querySelector('main');
        mainBody.appendChild(scrollBut);
    }
}

/**
 * End Helper Functions
 * 
 * Begin Main Functions
*/

// build the nav
function addListItems(){
    let sections = document.querySelectorAll('section');
    let myNavBar= document.querySelector('#navBar__list');
    for (section of sections){
        let listElem= document.createElement('li');
        let listElemAnch=document.createElement('a');
        listElemAnch.setAttribute('href','#'+section.id);
        listElemAnch.textContent= section.dataset.nav;
        listElem.appendChild(listElemAnch);
        myNavBar.appendChild(listElem);
    }
}

// Add class 'active' to section when near top of viewport and also highlight it's active section in the Navbar
function addHighlight(){
    let sections = document.querySelectorAll('section');
    let myNavBar= document.querySelectorAll('li');
    for (section of sections){
         const sectionTop = section.getBoundingClientRect().top;
         if(sectionTop > 0 && sectionTop <= 300){
          section.classList.add("your-active-class");
          for (item of myNavBar){
              
              if (item.firstElementChild.getAttribute('href')==='#'+section.id){
                  item.style.backgroundColor = "blue";
              }
              else{
                item.style.backgroundColor = "white";
              }
          }
        }else{
            section.classList.remove("your-active-class");
            
       }
    }
}



/**
 * End Main Functions
 * 
 * Begin Events
*/

// Build menu 
document.addEventListener('DOMContentLoaded',addListItems());
// Scroll to section on link click
navBar.addEventListener('click',function scrollToSec(e){
    e.preventDefault();
    const anch=e.target;
    if (anch.tagName === 'A'){
        let targetSecID= anch.getAttribute('href');
        let targetSec=document.querySelector(targetSecID);
        targetSec.scrollIntoView({behavior:'smooth'});};
});
// Set sections as active
window.addEventListener("scroll", addHighlight);
//window.addEventListener("scroll", addScrollButton);
