// Array untuk menyimpan data buku
let bookList = [];
let searchQuery = '';

// Konstanta untuk key localStorage
const BOOKS_STORAGE_KEY = 'bookshelf_books';

// Inisialisasi aplikasi
function initApp() {
  loadFromStorage();
  renderBooks();
  setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
  // Form tambah buku
  const bookForm = document.getElementById('bookForm');
  bookForm.addEventListener('submit', handleAddBook);

  // Form cari buku
  const searchForm = document.getElementById('searchBook');
  searchForm.addEventListener('submit', handleSearchBook);
}

// Handle tambah buku baru
function handleAddBook(event) {
  event.preventDefault();

  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = parseInt(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  // Buat objek buku baru
  const newBook = {
    id: Date.now(),
    title,
    author,
    year,
    isComplete,
  };

  bookList.push(newBook);
  saveToStorage();
  renderBooks();

  // Reset form
  document.getElementById('bookForm').reset();
}

// Handle cari buku
function handleSearchBook(event) {
  event.preventDefault();

  searchQuery = document.getElementById('searchBookTitle').value.toLowerCase();
  renderBooks();
}

// Render semua buku
function renderBooks() {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  // Hapus semua buku lama (kecuali contoh yang ada)
  const incompleteItems = incompleteBookList.querySelectorAll('[data-testid="bookItem"]');
  const completeItems = completeBookList.querySelectorAll('[data-testid="bookItem"]');
  
  incompleteItems.forEach(item => item.remove());
  completeItems.forEach(item => item.remove());

  // Filter buku berdasarkan search query
  const filteredBooks = bookList.filter(book =>
    book.title.toLowerCase().includes(searchQuery)
  );

  // Render buku tidak selesai
  filteredBooks
    .filter(book => !book.isComplete)
    .forEach(book => {
      const bookElement = createBookElement(book);
      incompleteBookList.appendChild(bookElement);
    });

  // Render buku selesai
  filteredBooks
    .filter(book => book.isComplete)
    .forEach(book => {
      const bookElement = createBookElement(book);
      completeBookList.appendChild(bookElement);
    });
}

// Buat elemen buku
function createBookElement(book) {
  const bookDiv = document.createElement('div');
  bookDiv.setAttribute('data-bookid', book.id);
  bookDiv.setAttribute('data-testid', 'bookItem');

  const titleEl = document.createElement('h3');
  titleEl.setAttribute('data-testid', 'bookItemTitle');
  titleEl.textContent = book.title;

  const authorEl = document.createElement('p');
  authorEl.setAttribute('data-testid', 'bookItemAuthor');
  authorEl.textContent = `Penulis: ${book.author}`;

  const yearEl = document.createElement('p');
  yearEl.setAttribute('data-testid', 'bookItemYear');
  yearEl.textContent = `Tahun: ${book.year}`;

  const buttonWrapper = document.createElement('div');

  // Tombol ubah status
  const statusButton = document.createElement('button');
  statusButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
  statusButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
  statusButton.addEventListener('click', () => handleToggleComplete(book.id));

  // Tombol hapus
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
  deleteButton.textContent = 'Hapus Buku';
  deleteButton.addEventListener('click', () => handleDeleteBook(book.id));

  // Tombol edit
  const editButton = document.createElement('button');
  editButton.setAttribute('data-testid', 'bookItemEditButton');
  editButton.textContent = 'Edit Buku';
  editButton.addEventListener('click', () => handleEditBook(book.id));

  buttonWrapper.appendChild(statusButton);
  buttonWrapper.appendChild(deleteButton);
  buttonWrapper.appendChild(editButton);

  bookDiv.appendChild(titleEl);
  bookDiv.appendChild(authorEl);
  bookDiv.appendChild(yearEl);
  bookDiv.appendChild(buttonWrapper);

  return bookDiv;
}

// Handle ubah status buku
function handleToggleComplete(bookId) {
  const book = bookList.find(b => b.id === bookId);
  if (book) {
    book.isComplete = !book.isComplete;
    saveToStorage();
    renderBooks();
  }
}

// Handle hapus buku
function handleDeleteBook(bookId) {
  bookList = bookList.filter(b => b.id !== bookId);
  saveToStorage();
  renderBooks();
}

// Handle edit buku
function handleEditBook(bookId) {
  const book = bookList.find(b => b.id === bookId);
  if (book) {
    const newTitle = prompt('Masukkan judul baru:', book.title);
    if (newTitle !== null && newTitle.trim() !== '') {
      book.title = newTitle;
      const newAuthor = prompt('Masukkan penulis baru:', book.author);
      if (newAuthor !== null && newAuthor.trim() !== '') {
        book.author = newAuthor;
        const newYear = prompt('Masukkan tahun baru:', book.year);
        if (newYear !== null && !isNaN(parseInt(newYear))) {
          book.year = parseInt(newYear);
          saveToStorage();
          renderBooks();
        }
      }
    }
  }
}

// Simpan ke localStorage
function saveToStorage() {
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(bookList));
}

// Muat dari localStorage
function loadFromStorage() {
  const storedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);
  if (storedBooks) {
    bookList = JSON.parse(storedBooks);
  }
}

// Jalankan aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', initApp);
