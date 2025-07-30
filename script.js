document.addEventListener('DOMContentLoaded', () => {
  const myLibrary = [];
  myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 208, true));
myLibrary.push(new Book("Clean Code", "Robert C. Martin", 464, false));
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, true));
  displayBooks()
  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

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

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    if (title && author && pages) {
      addBookToLibrary(title, author, pages, read);
      displayBooks();
      dialog.close();
      form.reset();
    }
  });
}); 


