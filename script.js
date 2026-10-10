const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");
const status = document.getElementById("status");

const DRAFT_KEY = "day4-note-draft";
const THEME_KEY = "day4-note-theme";

// Update character and word counters
function updateCounts() {
  const text = noteText.value;
  const characters = text.length;

  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  charCount.textContent = `${characters} / 200 characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.remove("warning", "over");

  if (characters > 200) {
    charCount.classList.add("over");
  } else if (characters > 180) {
    charCount.classList.add("warning");
  }
}

// Save the draft whenever the user types
noteText.addEventListener("input", () => {
  updateCounts();
  localStorage.setItem(DRAFT_KEY, noteText.value);
  status.textContent = "Draft saved.";
});

// Clear the note, counters, and saved draft
function clearNote() {
  noteText.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
  status.textContent = "Note cleared.";
}

clearBtn.addEventListener("click", clearNote);

// Escape clears the note while the textarea is focused
noteText.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    clearNote();
  }
});

// Apply the selected theme and update the button label
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  themeToggle.textContent = isDark
    ? "Light mode"
    : "Dark mode";
}

// Toggle and remember the theme
themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");

  applyTheme(isDark);
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
});

// Restore the draft and theme when the page loads
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
  noteText.value = savedDraft;
}

const savedTheme = localStorage.getItem(THEME_KEY);
applyTheme(savedTheme === "dark");

updateCounts();
