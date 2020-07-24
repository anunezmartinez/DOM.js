//Book class : Represents books.
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class : Handles UI Tasks.
class UI{
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }
    //Clear fields.
    static clearFields(){
        document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    }

    //Delete book from UI.

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    //Show alert.
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;  
        div.id = `alert`;  
        div.appendChild(document.createTextNode(message));
        const container = document.getElementById('container');
        const form = document.getElementById('book-form');
        container.insertBefore(div, form);

        //Set vanish alert.

        setTimeout(() => document.getElementById('alert').remove(), 3000);
    }

    //

}

//Store class : Handles Storage.
class Store{

    static getBooks(){

        let books;
        if(localStorage.getItem('books') === null){
            books = []; 
        } else{
            books = JSON.parse(localStorage.getItem('books'));

        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(){
        const books = Store.getBooks();
        books.forEach((book, index) =>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }


}

//Event : Display books.

document.addEventListener('DOM.ContentLoaded', UI.displayBooks());

//Event: Add book.

document.getElementById('book-form').addEventListener('submit', (e) => {
    //Get the values.
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    //Validate
    if(title == '', author == '', isbn == ''){
        
        UI.showAlert('Please fill in all the fields', 'danger');


    }else{
    //Instantiate book.
    const book = new Book(title, author, isbn);
    //Add book to UI.
    UI.addBookToList(book);
    //Add book to storage.
    Store.addBook(book);
    //Call clear fields.
    UI.clearFields();
    //Show alert.
    UI.showAlert('Book added successfully', 'success');

    }
});

//Event: Remove a book.
    document.getElementById('book-list').addEventListener('click', (e) =>{
        UI.deleteBook(e.target);
    });