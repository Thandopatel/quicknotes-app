QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS, and
JavaScript. It lets you add short notes with a category, see them as
colour-coded cards, search through them, and delete the ones you no longer
need. Notes are saved in the browser with `localStorage`, so they survive a
page refresh.

Features

- Add notes with a text input and a category (Personal, Work, Study).
- Each note is shown as a card with a category colour, a date, and a Delete button.
- Live search that filters notes as you type (case-insensitive).
- Validation: empty notes and notes over 200 characters show an error.
- Count message that reads correctly for zero, one, and many notes.
- Notes persist across page reloads using `localStorage`.
- Responsive layout that stacks the form on small screens.

 How to run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/thandopatel/quicknotes-app.git