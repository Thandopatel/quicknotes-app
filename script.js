// ---------- 1. Select elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");

// ---------- 2. Constants ----------
const STORAGE_KEY = "quicknotes-notes";
const MAX_LENGTH = 200;

// ---------- 3. State ----------
let notes = loadNotes();

// ---------- 4. Storage ----------
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ---------- 5. Helpers ----------
function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString();
}

function getVisibleNotes() {
  const query = searchInput.value.trim().toLowerCase();
  if (query === "") return notes;
  return notes.filter((note) => note.text.toLowerCase().includes(query));
}

// ---------- 6. Render ----------
function render() {
  const visible = getVisibleNotes();

  list.innerHTML = "";

  if (notes.length === 0) {
    const li = document.createElement("li");
    li.textContent = "You have no notes yet.";
    li.classList.add("empty-message");
    list.appendChild(li);
  } else if (visible.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No notes match your search.";
    li.classList.add("empty-message");
    list.appendChild(li);
  } else {
    visible.forEach((note) => {
      const li = document.createElement("li");
      li.classList.add("note", `category-${note.category}`);

      const meta = document.createElement("div");
      meta.classList.add("note-meta");

      const cat = document.createElement("span");
      cat.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

      const date = document.createElement("span");
      date.textContent = formatDate(note.createdAt);

      meta.appendChild(cat);
      meta.appendChild(date);

      const text = document.createElement("p");
      text.classList.add("note-text");
      text.textContent = note.text;

      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "Delete";
      del.classList.add("delete-btn");
      del.addEventListener("click", () => deleteNote(note.id));

      li.appendChild(meta);
      li.appendChild(text);
      li.appendChild(del);

      list.appendChild(li);
    });
  }

  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

// ---------- 7. Add ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toISOString(),
  });
  saveNotes();
  render();
}

// ---------- 8. Delete ----------
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// ---------- 9. Validation helpers ----------
function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

// ---------- 10. Form submit ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }

  if (text.length > MAX_LENGTH) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  clearError();
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

// ---------- 11. Search ----------
searchInput.addEventListener("input", render);

// ---------- 12. Init ----------
render();