const importBtn = document.querySelector(".import-note-button")
let fileInput = document.getElementById('FileImport');
let noteSection = document.querySelector('.note-section')
// const delNoteBtn = document.querySelectorAll('.del-note-btn')

const noteTemplate = document.getElementById("note-template");

importBtn.addEventListener("click", () => {
        fileInput.click();
})

fileInput.addEventListener('change', (event) => {
        let JsonNotes = event.target.files[0];
        if (!JsonNotes) return;

        const reader = new FileReader();

        reader.onload = (e) => {
                try {
                        let NotesText = e.target.result;
                        let NotesObj = JSON.parse(NotesText);

                        NotesObj.notes.forEach((note, index) => {
                                const noteClone = noteTemplate.content.cloneNode(true);

                                noteClone.querySelector(".note-name").textContent = note.name;
                                noteClone.querySelector(".note-content").textContent = note.content;

                                noteSection.appendChild(noteClone)
                        });
                } catch (err) {
                        console.error("Invalid JSON:", err);
                }
        };
        reader.readAsText(JsonNotes)

})

noteSection.addEventListener("click", (event) => {
        const delNoteBtn = event.target.closest('.del-note-btn');

        if (!delNoteBtn) return;

        const note = delNoteBtn.closest(".note")
        if (note) {
                note.remove()
        }
})