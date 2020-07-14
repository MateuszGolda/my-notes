function main() {
    loadLocalStorageNotes();
    let button = document.getElementById("add-note-button");
    button.addEventListener('click', addNote);
}

function deleteDiv() {
    this.parentNode.parentNode.removeChild(this.parentNode);
    delete notes[this.parentNode.id];
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadLocalStorageNotes() {
    let parsedNotes = JSON.parse(localStorage.getItem('notes'));
    for (let note in parsedNotes) {
        let a = {title: parsedNotes[note].H2, content: parsedNotes[note].TEXTAREA};
        addNote(a);
    }
}

function addNote({title = "Empty note", content = ""} = {}) {
    let noteId = "note" + count;
    notes[noteId] = {};
    const div = document.createElement("div");
    div.setAttribute("class", "note");
    div.setAttribute("id", "note" + count);
    document.querySelector(".notes").appendChild(div);

    notes[noteId].H2 = title;
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

    notes[noteId].TEXTAREA = content;
    const textarea = document.createElement("textarea");
    textarea.innerText = content;
    div.appendChild(textarea);
    textarea.addEventListener('input', saveNoteToLocalStorage);

    count++;
}

function saveNoteToLocalStorage() {
    let noteId = this.parentNode.id;
    let propertyName = this.nodeName;
    let value = propertyName === "H2" ? this.innerHTML : this.value;
    notes[noteId][propertyName] = value;

    localStorage.setItem('notes', JSON.stringify(notes));
}

let notes = {};
let count = 0;
main();
