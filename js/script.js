
// We define the list, which is a selection of all list items in the page. 
const list = document.querySelectorAll('li');

// Define a list of names, pegged to ".student-details h3"
const names = document.querySelectorAll(".student-details h3");

// We define our maximum amount of items to list at a given time. 
const maxItems = 10;

// showPage function asks for the page number to be displayed. 
const showPage = (page, list) =>{
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
showPage(1, list); 

function appendPageLinks(list){
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
   
   for (let i = 0; i < buttonsNumber; i+=1){
      // define the page number, since the array starts at 0, add 1
      const pageNumber = i + 1;
      const li = document.createElement("li");
      ul.appendChild(li);
      const a = document.createElement("a");
      li.appendChild(a);
      a.textContent = pageNumber;
      document.querySelector("a").className = "active";

      // add a click listener
      a.addEventListener("click", (e) => {
         // find all "active" class items, and set them to blank
         const active = document.getElementsByClassName("active");
         for(let i = 0; i < active.length; i+=1){
            active[i].className = "";
         }
         // call the function again on the new page number
         showPage(pageNumber, list);
         // set the clicked button as the active button
         event.target.className = "active";
      })
   }
};

// Run the appendPageLinks function in order to create the links, passing the list to ensure it uses the list of results. 
appendPageLinks(list);

// Lets go for exceeding! 

// First, we create a function for finding the results of the input. 
function searchBarInput(searchInput){

   // define a new array to store the results, empty to start
   let results = [];
   for (let i = 0; i < list.length; i+=1){
      // we find if the input is a match in any of the names
      if (searchInput.value !== 0 && names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
         // add the result to the earlier defined array, to be used for pagination later on. 
         results.push(list[i]);
         // set the display style to nothing, so we can see it. 
         list[i].style.display = "";
      // if we don't find a match in the list item, hide it.    
      } else {
         list[i].style.display = "none";
      }
   }

   // We need to remove the existing pagination, since we are going to create a new one. 
   let remove = document.querySelector(".pagination");
   remove.parentNode.removeChild(remove);

   // call the functions again so the results and pagination are clean. 
   showPage(1, results);
   appendPageLinks(results);

   // if there are no results found above, we let the user no there was nothing found. 
   if (results === undefined || results.length == 0){
      document.querySelector(".pagination").textContent = "No Results Found";
   }
};

// create the searchbar, then add event listeners that look for the input function and process the results accordingly. 
function searchBar (){
   const searchDiv = document.createElement("div");
   const pageHeaderDiv = document.querySelector(".page-header");
   pageHeaderDiv.appendChild(searchDiv).className = "student-search";
   const searchInput = document.createElement("input");
   searchInput.placeholder = "Search for students...";
   searchDiv.appendChild(searchInput);
   const searchButton = document.createElement("button");
   searchDiv.appendChild(searchButton).textContent = "Search";  

   // Do searchBarInput function on clicking
   searchButton.addEventListener("click", (e) => {
      searchBarInput(searchInput);
   })

   // Do searchBarInput function on key entry
   searchInput.addEventListener("keyup", (e) => {
      searchBarInput(searchInput);
   })
}

// Execute the searchbar function to create it. 
searchBar();