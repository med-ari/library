const myLibrary = [];

function Books(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  let tableBody = document.getElementById("tbody");
  let row = document.createElement("tr");
  let index = myLibrary.indexOf(book).toString();
  row.setAttribute("id", "row" + index);
  let dataTitle = document.createElement("td");
  let dataAuthor = document.createElement("td");
  let dataPages = document.createElement("td");
  let dataStat = document.createElement("td");
  let button = document.createElement("BUTTON");
  button.setAttribute("id", index);
  dataStat.setAttribute("id", "readStat" + index);
  const title = document.createTextNode(book.title);
  const author = document.createTextNode(book.author);
  const pages = document.createTextNode(book.pages);
  const readStat = document.createTextNode(book.read);
  const textButt = document.createTextNode("X");
  dataTitle.appendChild(title);
  dataAuthor.appendChild(author);
  dataPages.appendChild(pages);
  dataStat.appendChild(readStat);
  button.appendChild(textButt);
  row.appendChild(dataTitle);
  row.appendChild(dataAuthor);
  row.appendChild(dataPages);
  row.appendChild(dataStat);
  row.appendChild(button);
  tableBody.appendChild(row);
}

const showBtn = document.getElementById("addBook");
const addBtn = document.getElementById("confirm");
const dialog = document.getElementById("dialog");
const jsCloseBtn = dialog.querySelector("#js-close");
let table = document.querySelector("table");

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

jsCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

addBtn.addEventListener("click", () => {
  let title = document.forms["formBook"].title.value;
  let author = document.forms["formBook"].author.value;
  let pages = document.forms["formBook"].pages.value;
  let status = document.forms["formBook"].status.value;
  if (title && author && pages && status) {
    const newBook = new Books(title, author, pages, status);
    addBookToLibrary(newBook);
    document.forms["formBook"].title.value = "";
    document.forms["formBook"].author.value = "";
    document.forms["formBook"].pages.value = "";
    document.forms["formBook"].status.value = "";
    dialog.close();
  }
});

table.addEventListener("click", delRow);

function delRow(e) {
  let number = e.target.id;
  if (number) {
    const row = document.getElementById("row" + number);
    if (row) {
      row.remove();
    }
  } else {
    return;
  }
}

table.addEventListener("click", changeStatus);

function changeStatus(e) {
  let identity = e.target.id;
  if (!(identity.includes("readStat") && identity)) {
    return;
  }
  if (e.target.textContent == "read") {
    e.target.textContent = "not read";
  } else if (e.target.textContent == "not read") {
    e.target.textContent = "read";
  }
}
