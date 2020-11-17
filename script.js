/*TODO
saving array to local storage
*/

const shelf = document.getElementById('shelf');
const addBtn = document.getElementById('add');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

addBtn.addEventListener('click', function () {
    addBookToLibrary();
    updateDOM();
});

//remove from the array
shelf.addEventListener('click', function (e) {
    let remover = document.getElementsByClassName('icon-trash');
    for (let i = 0; i < remover.length; i++) {
        if (remover[i] === e.target) {
            myLibrary.splice(e.target.dataset.id, 1);
        }
    }

    let readStatus = document.getElementsByClassName('icon-eye');
    for (let i = 0; i < readStatus.length; i++) {
        if (readStatus[i] === e.target) {
            let read = myLibrary[e.target.dataset.id].read;
            if (read === 'Read status: read') myLibrary[e.target.dataset.id].read = 'Read status: unread';
            else if (read === 'Read status: unread') myLibrary[e.target.dataset.id].read = 'Read status: read';
        }
    }
    updateDOM();
});

//add to the array
function addBookToLibrary() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.querySelector('input[name="readStatus"]:checked').value;

    myLibrary.push(new Book(title, author, pages, read));

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
}

function updateDOM() {
    //clear all books from DOM
    while (shelf.firstChild) {
        shelf.removeChild(shelf.firstChild);
    }

    //add the array to DOM
    for (let i = 0; i < myLibrary.length; i++) {

        //book container
        let div = document.createElement('div');
        div.className = 'book';
        div.dataset.id = i;
        shelf.appendChild(div);

        let toolbar = document.createElement('div');
        toolbar.className = 'toolbar';
        div.appendChild(toolbar);

        let readStatus = document.createElement('div');
        readStatus.className = 'icon-eye';
        readStatus.dataset.id = i;
        toolbar.appendChild(readStatus);

        let remover = document.createElement('div');
        remover.className = 'icon-trash';
        remover.dataset.id = i;
        toolbar.appendChild(remover);

        for (let datas in myLibrary[i]) {
            let p = document.createElement('p');
            p.innerText = datas + ': ' +  myLibrary[i][datas];
            document.getElementsByClassName('book')[i].appendChild(p);
        }
    }
}