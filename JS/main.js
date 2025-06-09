// Global Variables
const siteName = document.getElementById("bm-name");
const siteUrl = document.getElementById("bm-url");
const addBtn = document.getElementById("add-btn");
const bookmarks = document.getElementById("bookmarks-list");
const model = document.getElementById("model");
const closeIcon = document.getElementById("close");

// Check if there is data in local storage or not
let bookmarksList = JSON.parse(localStorage.getItem("bookmarks")) || [];
if (bookmarksList.length > 0) {
  displayBookmark();
}



// Function declarations
function addBookmark() {
  let bookmark = {
    name: siteName.value,
    url: siteUrl.value
  }
  bookmarksList.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
}

function displayBookmark() {
  bookmarks.innerHTML = null;
  bookmarksList.forEach((book, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${book.name}</td>
        <td><button class="btn-visit" onclick="visitSite(${index})">Visit</button></td>
        <td><button class="btn-delete" onclick="deleteBookmark(${index})">Delete</button></td>
    `
    bookmarks.append(row)
  })
}

function deleteBookmark(index) {
  bookmarksList.splice(index, 1);
  displayBookmark();
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
}

function visitSite(index) {
  const url = bookmarksList[index].url;
  window.open(url, "_blank");
}

function validateInput(thisInput) {
  let regex;
  if (thisInput.id === "bm-url") {
    regex = /^(https?):\/\/www\.[a-z]+\.(com|org|net)$/ig;
  } else {
    regex = /[a-z]{3,}/ig;
  }

  if (regex.test(thisInput.value)) {
    thisInput.classList.add("is-valid");
    thisInput.classList.remove("is-invalid");
  } else {
    thisInput.classList.remove("is-valid");
    thisInput.classList.add("is-invalid");
  }
}


// Events
siteName.addEventListener("input", function () {
  validateInput(this);
});

siteUrl.addEventListener("input", function () {
  validateInput(this);
});

// Display a new bookmark if entered data is validate
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (siteName.classList.contains("is-valid") || siteUrl.classList.contains("is-valid")) {
    addBookmark();
    displayBookmark()
    siteName.value = null;
    siteUrl.value = "";
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  } else {
    model.classList.remove("d-none")
  }
})

closeIcon.onclick = function () {
  model.classList.add("d-none")
}

// Close model if it's already appears and clicked outside it
document.body.addEventListener("click", function (e) {
  if (!model.classList.contains("d-none") && e.target == model) {
    model.classList.add("d-none")
  }
})