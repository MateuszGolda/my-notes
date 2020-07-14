function main() {
    loadLocalStorageNotes();
    let button = document.getElementById("add-note-button");
    button.addEventListener('click', addNote);
}

function deleteDiv() {
    this.parentNode.parentNode.removeChild(this.parentNode);
}

function loadLocalStorageNotes() {
    let parsedNotes = JSON.parse(localStorage.getItem('notes'));
    for (let note in parsedNotes) {
        addNote({title: parsedNotes[note].title, content: parsedNotes[note].content});
    }
}

function addNote({title = "Title", content = "content"} = {}) {
    const div = document.createElement("div");
    div.setAttribute("class", "note");
    div.setAttribute("id", "note" + count++);
    document.querySelector(".container").appendChild(div);

    const h2 = document.createElement("h2");
    h2.setAttribute("class", "note-title");
    h2.setAttribute("contenteditable", "true");
    h2.innerText = title;
    div.appendChild(h2);
    h2.addEventListener('input', saveNoteToLocalStorage);

    const button = document.createElement("button");
    button.innerText = "X";
    div.appendChild(button);
    button.addEventListener('click', deleteDiv);

    const label = document.createElement("label");
    div.appendChild(label);

    const textarea = document.createElement("textarea");
    textarea.innerText = content;
    label.appendChild(textarea);
    textarea.addEventListener('input', saveNoteToLocalStorage);
}

function saveNoteToLocalStorage() {
    let noteId = this.parentNode.getAttribute("id");
    let propertyName = this.getAttribute("nodeName");
    let value = this.getAttribute("innerText");
    alert(noteId + ' ' + propertyName + ' ' + value);
    // notes[noteId][propertyName] = value;
    // localStorage.setItem('notes', JSON.stringify(notes));
}

let notes;
let count = 0;
main();
