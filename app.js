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
let scrollButton=document.querySelector('#scrollTop');
let mainBody=document.querySelector('main');




/**
 * End Global Variables
 * 
 * Start Helper Functions
*/
//add a new section to the page
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
//Create the scroll to top button
function myButton() {

    let scrollBut=document.createElement('button');
    scrollBut.id="scrollTop"
    scrollBut.textContent='^';
    scrollBut.style.cssText="display: none;background-color:transparent;border:5px;position: fixed;top: 550;z-index:5;font-size: 3em;color: white;";
    let mainBody=document.querySelector('main');
    mainBody.appendChild(scrollBut);
}
myButton();

//Show a scroll button after scrolling below the page fold
function addScrollButton(){
    let scrollButton=document.querySelector('#scrollTop');

    //the below property gets the position of the top line of the page view relative to the page
    let currentView= document.body.scrollTop;

    if (currentView > 300) {
        scrollButton.style.display = "block";
      } else {
        scrollButton.style.display = "none";
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
            item.style.cssText = "background: rgb(0, 0, 0);background: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);";
              }
              else{
                item.style.cssText = "none";
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
    if (anch.tagName === 'A'){// scrolls to the section of ID similar to the anchor's Href
        let targetSecID= anch.getAttribute('href');
        let targetSec=document.querySelector(targetSecID);
        targetSec.scrollIntoView({behavior:'smooth'});};
});
// Set sections as active
window.addEventListener("scroll", addHighlight);

//first event to show the scroll button
window.addEventListener("scroll", addScrollButton);

//second event to give it the ability to scroll
mainBody.addEventListener('click',function scrollToTop(e){
    let scrollButton=document.querySelector('#scrollTop');
    if(e.target===scrollButton){
    window.scrollTo({ top: 0, behavior: 'smooth' });
}});
