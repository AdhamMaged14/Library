document.addEventListener('DOMContentLoaded', () => {
  const myLibrary = [];
 
  
class Book {
  static #count = 0;
  #id
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.#id = Book.#count++;
  }
  get id() {
    return this.#id;
  }
   
}
myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 208, true));
myLibrary.push(new Book("Clean Code", "Robert C. Martin", 464, false));
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, true));
  displayBooks();

  function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
  }

 function displayBooks() {
  const library = document.getElementById('library');
  library.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index); // store index of the book

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? 'Yes' : 'No'}</p>
      <p>ID: ${book.id}</p>
      <button class='toggle-read-btn'>${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
      <button class="delete-btn">Remove</button>
    `;

    library.appendChild(card);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const index = card.getAttribute('data-index');
      myLibrary.splice(index, 1);       // remove book from array
      displayBooks();                   // re-render the library
    });
  });
  document.querySelectorAll('.toggle-read-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const index = card.getAttribute('data-index');
      myLibrary[index].read = !myLibrary[index].read;
      displayBooks();
    });
  });
}

  const newBookBtn = document.getElementById('new-book-btn');
  const dialog = document.getElementById('book-dialog');
  const form = document.getElementById('book-form');
  const cancelBtn = document.getElementById('cancel');

  newBookBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  cancelBtn.addEventListener('click', () => {
    dialog.close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput= document.getElementById('pages');
    const readInput = document.getElementById('read');

    if (titleInput.checkValidity() && authorInput.checkValidity() && pagesInput.checkValidity()) {
    addBookToLibrary(
      titleInput.value.trim(),
      authorInput.value.trim(),
      pagesInput.value,
      readInput.checked
    );
    displayBooks();
    dialog.close();
    form.reset();
  } else {
  
    if (!titleInput.checkValidity()) titleInput.reportValidity();
    else if (!authorInput.checkValidity()) authorInput.reportValidity();
    else if (!pagesInput.checkValidity()) pagesInput.reportValidity();
  }
});

}); 


