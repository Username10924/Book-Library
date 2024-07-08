let bookLib = [];

const addButton = document.querySelector("#add");
const container = document.querySelector(".container");
const modal = document.querySelector("[data-modal]");
const cancelButton = document.querySelector("#close-modal");
const form = document.querySelector("#form");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if(this.read == "true")
            return title + ", " + author + ", " + pages + " pages" + ", book has been read.";
        return title + ", " + author + ", " + pages + " pages" + ", book not read yet.";
    };
}

function addBook(title, author, pages, read) {
    bookLib.push(new Book(title, author, pages, read));

    let cover = document.createElement("div");
    cover.classList.add("cover");
    refresh();

    let book = document.createElement("div");
    book.classList.add("book");
    let details = document.createElement("div");
    details.classList.add("details");
    let tempTitle = document.createElement("p");
    tempTitle.textContent = title;
    let tempAuthor = document.createElement("p");
    tempAuthor.textContent = author;
    let tempPages = document.createElement("p");
    tempPages.textContent = pages + " pages";
    let tempRead = document.createElement("p");

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");
    let markButton = document.createElement("button");
    markButton.classList.add("mark");
    markButton.textContent = "Mark read"
    refresh();
    let unmarkButton = document.createElement("button");
    unmarkButton.classList.add("unmark");
    unmarkButton.textContent = "Unmark read";
    refresh();
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "Delete";
    refresh();
    
    if(read == "true") {
        tempRead.textContent = "Book has been read";
        tempRead.classList.add("read-text");
        buttons.appendChild(unmarkButton);
    }
    else {
        tempRead.textContent = "Book not read yet";
        tempRead.classList.add("not-read-text");
        buttons.appendChild(markButton);
    }
    buttons.appendChild(removeButton);
    details.appendChild(tempTitle);
    details.appendChild(tempAuthor);
    details.appendChild(tempPages);
    details.appendChild(tempRead);
    book.appendChild(details);
    cover.appendChild(book);
    cover.appendChild(buttons);
    
    container.appendChild(cover);
}

addBook("Song of ice and fire", "George R. R. Martin", 694, "true");
addBook("To Kill a Mockingbird", "Harper Lee ", 336, "false");
addBook("The Great Gatsby", "F. Scott Fitzgerald",180 , "true");
addBook("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 320, "true");

function displayBooks() {
    for(let i = 0; i < bookLib.length; i++) {
        console.log(bookLib[i].info());
    }
}

addButton.addEventListener("click", () => {
    modal.showModal();
});

cancelButton.addEventListener("click", () => {
    modal.close();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read;
    if(document.querySelector("#readTrue").checked)
        read = document.querySelector("#readTrue").value;
    else
        read = document.querySelector("#readFalse").value;
    modal.close();
    addBook(title, author, pages, read);
    e.target.reset();
});

// Modify dynamically added covers
document.body.addEventListener("click", (e) => {
    if(e.target.classList == "remove") {
        refresh();
        container.removeChild(document.querySelector(`[data-id="${e.target.dataset.id}"]`));
        bookLib.splice(e.target.dataset.id, 1);
    }

    if(e.target.classList == "mark") {
        refresh();
        let buttons = e.target.parentElement;
        buttons.removeChild(buttons.querySelector(".mark"));
        let unmarkButton = document.createElement("button");
        unmarkButton.classList.add("unmark");
        unmarkButton.textContent = "Unmark read";
        buttons.insertBefore(unmarkButton, buttons.firstChild);
        
        let details = buttons.parentElement.querySelector(".book").querySelector(".details");
        details.removeChild(details.querySelector(".not-read-text"));
        let readText = document.createElement("p");
        readText.textContent = "Book has been read";
        readText.classList.add("read-text");
        details.appendChild(readText);
        bookLib[buttons.parentElement.dataset.id].read = "true";
    }

    if(e.target.classList == "unmark") {
        refresh();
        let buttons = e.target.parentElement;
        buttons.removeChild(buttons.querySelector(".unmark"));
        let markButton = document.createElement("button");
        markButton.classList.add("mark");
        markButton.textContent = "Mark read";
        buttons.insertBefore(markButton, buttons.firstChild);
        
        let details = buttons.parentElement.querySelector(".book").querySelector(".details");
        details.removeChild(details.querySelector(".read-text"));
        let readText = document.createElement("p");
        readText.textContent = "Book not read yet";
        readText.classList.add("not-read-text");
        details.appendChild(readText);
        bookLib[buttons.parentElement.dataset.id].read = "false";
    }
});

function refreshCovers() {
    let covers = Array.from(document.querySelectorAll(".cover"));
    let removeButton = Array.from(document.querySelectorAll(".remove"));
    for(let i = 0; i < covers.length; i++) {
        covers[i].dataset.id = i;
        removeButton[i].dataset.id = i;
    }
}

function refreshMarkButtons() {
    let markButton = Array.from(document.querySelectorAll(".mark"));
    for(let i = 0; i < markButton.length; i++) {
        markButton[i].dataset.id = i;
    }
}

function refreshUnmarkButton() {
    let unmarkButton = Array.from(document.querySelectorAll(".unmark"));
    for(let i = 0; i < unmarkButton.length; i++) {
        unmarkButton[i].dataset.id = i;
    }
}

function refresh() {
    refreshCovers();
    refreshMarkButtons();
    refreshUnmarkButton();
}