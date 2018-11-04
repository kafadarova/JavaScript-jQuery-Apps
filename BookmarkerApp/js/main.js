// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
// Ger form values
let siteName = document.getElementById('siteName').value;
let siteUrl = document.getElementById('siteUrl').value;

if(!siteName || !siteUrl){
  alert('Please fill in the form');
  return false;
}

//  Set a new variable to format the url
let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
// Create the regular expression
let regex = new RegExp(expression);

// Create a bookmark object where to store the siteName and siteUrl
let bookmark = {
  name: siteName,
  url: siteUrl
}

// Check if there is already an item into Local storage
if(localStorage.getItem('bookmarks') === null){
  // Init array
  let bookmarks = [];
  // Add to array
  bookmarks.push(bookmark);
  // Set to local storage
  // Turn json object to string
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  // Fetch from localStorage (get them from it)
  // Turn the string back to json
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Add bookmark to array
  bookmarks.push(bookmark);
  // Reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
// Re-fetch bookmarks
fetchBookmarks();

// Prevent form from submitting
e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
// Get bookmarks from Local Storage
let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
// Loop through bookmarks
for(let i =0; i< bookmarks.length; i++){
  if(bookmarks[i].url == url){
    // Remove from array
    bookmarks.splice(i, 1);
    }
  }
  // Reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Fetch from localStorage (get them from it)
  // Turn the string back to json
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output
  let bookmarksResults = document.getElementById('bookmarksResults')

  // Build output
  bookmarksResults.innerHTML = '';

  for(let i = 0; i < bookmarks.length; i++){
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">' +
                                '<h3>' + name +
                                ' <a class="btn btn-default" target="_blank" href="'+ url +'">Visit</a> ' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                '</h3></div>';
  }
}
