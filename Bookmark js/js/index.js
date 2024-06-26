document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);
document.getElementById('siteName').addEventListener('input', validateName);
document.getElementById('siteURL').addEventListener('input', validateURL);

function saveBookmark(e) {
    e.preventDefault();

    const siteName = document.getElementById('siteName').value;
    const siteURL = document.getElementById('siteURL').value;

    if (!validateForm(siteName, siteURL)) {
        return false;
    }

    const bookmark = {
        name: siteName,
        url: siteURL
    };

    let bookmarks = [];
    if (localStorage.getItem('bookmarks') !== null) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    document.getElementById('bookmarkForm').reset();
    fetchBookmarks();
}

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks = bookmarks.filter(bookmark => bookmark.url !== url);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function editBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const bookmark = bookmarks.find(bookmark => bookmark.url === url);
    document.getElementById('siteName').value = bookmark.name;
    document.getElementById('siteURL').value = bookmark.url;
    deleteBookmark(url);
}

function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    bookmarks.forEach(bookmark => {
        const name = bookmark.name;
        const url = bookmark.url;

        bookmarksResults.innerHTML += `
            <div class="card bg-light mb-3">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <a class="btn btn-primary" target="_blank" href="${url}">Visit</a>
                    <a class="btn btn-warning" href="#" onclick="editBookmark('${url}')">Edit</a>
                    <a class="btn btn-danger" href="#" onclick="deleteBookmark('${url}')">Delete</a>
                </div>
            </div>
        `;
    });
}

function validateName() {
    const name = document.getElementById('siteName').value;
    const regex = /^[A-Za-z\s]+$/;

    if (name.match(regex)) {
        document.getElementById('siteName').classList.add('is-valid');
        document.getElementById('siteName').classList.remove('is-invalid');
    } else {
        document.getElementById('siteName').classList.add('is-invalid');
        document.getElementById('siteName').classList.remove('is-valid');
    }
}

function validateURL() {
    const url = document.getElementById('siteURL').value;
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (url.match(regex)) {
        document.getElementById('siteURL').classList.add('is-valid');
        document.getElementById('siteURL').classList.remove('is-invalid');
    } else {
        document.getElementById('siteURL').classList.add('is-invalid');
        document.getElementById('siteURL').classList.remove('is-valid');
    }
}

function validateForm(name, url) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!name || !url) {
        alert('Please fill in the form');
        return false;
    }

    if (!name.match(nameRegex)) {
        alert('Please use a valid name (letters only)');
        return false;
    }

    if (!url.match(urlRegex)) {
        alert('Please use a valid URL');
        return false;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }

    return true;
}

// Fetch bookmarks on page load
fetchBookmarks();


