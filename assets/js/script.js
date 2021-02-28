const searchHistoryEl = document.querySelector("#search-history"); 
const searchInput = document.querySelector("#city-input"); 
const searchButton = document.querySelector("#search-btn");

// show past searches on screen 
searchButton.addEventListener("click", storeSearch); 

function storeSearch(event) {
    event.preventDefault(); 
    var city = searchInput.value.trim();
    li = document.createElement("li"); 
    li.textContent = city; 
    li.classList.add("past-searches"); 
    searchHistoryEl.appendChild(li); 
    searchInput.value = ""; 
}
