class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
  
  // Storage Class: Handles local storage of books
  class Storage {
    
    // Receives Books
    static getBooks() {
      let books;
      if (localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }

    // Event: Adds Books
  
    static addBook(book) {
      const books = Storage.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  // UI Class: Displays listed Books
  class UI {
    static displayBooks() {
      const books = Storage.getBooks();
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('.book-collection');
      const addedbook = document.createElement('div');
      addedbook.innerHTML = `
          <p>${book.title}</p>
          <p>${book.author}</p>
          <button type="submit" class="delete">Remove</button>
          <hr>
        `;
      list.appendChild(addedbook);
    }

    // Event: Deletes a Book
    static deleteBook(el) {
      if (el.classList.contains('delete')) {
        el.parentElement.remove();
      }
    }
  
    // Event: Clears data
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
    }
  }
  
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  document.querySelector('#form').addEventListener('submit', () => {

    // Get form Values from the input fields
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const book = new Book(title, author);
    UI.addBookToList(book);
    Storage.addBook(book);
    UI.clearFields();
  });

// Event: Deletes a Book
  document.querySelector('.book-collection').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
  });
  
  