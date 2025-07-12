const importBtn = document.querySelector(".import-note-button");
const addNoteBtn = document.querySelector(".create-note-button");
let fileInput = document.getElementById("FileImport");
let noteSection = document.querySelector(".note-section");

const noteTemplate = document.getElementById("note-template");
const menuTemplate = document.getElementById("menu-template");

const today = new Date();

function CreateNote(noteName, noteContent, noteTags, noteCreationDate) {
        const noteClone = noteTemplate.content.cloneNode(true);

        noteClone.querySelector(".note-name").textContent = noteName;
        noteClone.querySelector(".note-content").textContent = noteContent;

        let output_tags = "";
        noteTags.forEach((tag) => {
                output_tags = `${output_tags} #${tag}<br>`;
        });

        noteClone.querySelector(
                ".note-info-more"
        ).innerHTML = `creation date: ${noteCreationDate}<br><br>${output_tags}`;
        noteSection.appendChild(noteClone);
}

importBtn.addEventListener("click", () => {
        fileInput.click();
});

fileInput.addEventListener("change", (event) => {
        let JsonNotes = event.target.files[0];
        if (!JsonNotes) return;

        const reader = new FileReader();

        reader.onload = (event) => {
                try {
                        let NotesText = event.target.result;
                        let NotesObj = JSON.parse(NotesText);

                        NotesObj.notes.forEach((note) => {
                                CreateNote(
                                        note.name,
                                        note.content,
                                        note.tags,
                                        note.creationDate
                                );
                        });
                } catch (err) {
                        console.error("Invalid JSON:", err);
                }
                fileInput.value = "";
        };
        reader.readAsText(JsonNotes);
});

noteSection.addEventListener("click", (event) => {
        const delNoteBtn = event.target.closest(".del-note-btn");

        if (!delNoteBtn) return;

        const note = delNoteBtn.closest(".note");
        if (note) {
                note.remove();
        }
});

addNoteBtn.addEventListener("click", (event) => {
        let addNoteMenu = menuTemplate.content.cloneNode(true);
        document.body.appendChild(addNoteMenu);

        // Note Creation menu

        const noteCreateBtn = document.querySelector(".noteCreateBtn");
        if (!noteCreateBtn) {
                console.error({ noteCreateBtn })
        };

        noteCreateBtn.addEventListener("click", (event) => {
                const titleNoteInput = document.querySelector(".titleNoteInput");
                const textNoteInput = document.querySelector(".textNoteInput");

                CreateNote(
                        titleNoteInput.value,
                        textNoteInput.value,
                        [],
                        `${today.getFullYear()}-${String(
                                today.getMonth() + 1
                        ).padStart(2, "0")}-${String(today.getDate()).padStart(
                                2,
                                "0"
                        )}`
                );

                const delNoteMenu = document.body.querySelector(".dimBackground");

                if (!delNoteMenu) {
                        console.error({ delNoteMenu })
                };
                delNoteMenu.remove();
        });
});

document.body.addEventListener("click", (event) => {
    const cancelBtn = event.target.closest(".noteCancelBtn");
    if (!cancelBtn) return; // not the cancel button, ignore

    const delNoteMenu = cancelBtn.closest(".dimBackground");
    if (!delNoteMenu) {
        console.error("Cannot find .dimBackground");
        return;
    }

    delNoteMenu.remove();
});

