
// We define the list, which is a selection of all list items in the page. 
const list = document.querySelectorAll('li');

// We define our maximum amount of items to list at a given time. 
const maxItems = 10;

// Define a default page, lets set it to 1. 
const defaultPage = 2;

// showPage function asks for the page number to be displayed. 
const showPage = (page) =>{
   // set the last item in the range based on page number
   const lastItem = page * maxItems;
   //set the first item based on page number
   const firstItem = lastItem - maxItems;

   // for each item in the list array, if the item is outside of the range we want to show, we add a display style of none, else, we leave the display style blank. 
   for (let i = 0; i < list.length; i += 1){
      if ([i] < firstItem || [i] >= lastItem){
         list[i].style.display = "none";
      } else {
         list[i].style.display = "";
      }
   }
}

// Call the function with a default of the first page. Default value of 1 for first page.
showPage(defaultPage); 


// this function creates the needed elements for our buttons. 

const appendPageLinks = (page) => {

   // do the math to find out how many pages we will have
   const buttonsNumber = Math.ceil(list.length / maxItems);

   // create the div to store the buttons
   const paginationDiv = document.createElement('div');

   // append the div to the div with the "page" class
   document.querySelector(".page").appendChild(paginationDiv);

   // give the div the "pagination class"
   paginationDiv.className = "pagination";

   // create the ul element
   const ul = document.createElement('ul');

   // append the ul to the div
   paginationDiv.appendChild(ul);

   // for each needed button, run the loop to create buttons
   for (let i = 0; i < buttonsNumber; i+=1){

      // define the page number, since the array starts at 0, add 1
      const pageNumber = i + 1;

      // create the li element
      const li = document.createElement("li");

      // append the li to the ul
      ul.appendChild(li);

      // create the a element
      const a = document.createElement("a");

      // append the to a to the li
      li.appendChild(a);

      // set the content of the button to match the page number
      a.textContent = pageNumber;

      // if the current page is the selected page, make sure the button is active
      if (pageNumber === page){
         a.className = "active";
      }

      // add a click listener
      a.addEventListener("click", (e) => {
         // find all "active" class items, and set them to blank
         document.querySelector(".active").className = "";
         // call the function again on the new page number
         showPage(pageNumber);
         // set the clicked button as the active button
         event.target.className = "active";
      })
   }
}

// call the function to create the buttons. Default value of 1 for first page. 

appendPageLinks(defaultPage);



// Remember to delete the comments that came with this file, and replace them with your own code comments.