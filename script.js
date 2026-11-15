const subjects = [
  {
    name: "Literacy",
    focus: [
      "Read and enjoy stories",
      "Practise phonics and new words",
      "Write ideas and sentences",
    ],
  },
  {
    name: "Maths",
    focus: [
      "Count and compare numbers",
      "Solve simple problems",
      "Explore shapes and measures",
    ],
  },
  {
    name: "Science",
    focus: [
      "Look closely at nature",
      "Ask questions and investigate",
      "Test ideas with simple experiments",
    ],
  },
  {
    name: "Art & Design",
    focus: [
      "Paint with bright colours",
      "Create a picture or collage",
      "Use different materials and textures",
    ],
  },
  {
    name: "Music",
    focus: [
      "Sing a song with confidence",
      "Clap to the beat",
      "Listen for rhythm and sound",
    ],
  },
  {
    name: "PE",
    focus: [
      "Stretch and move carefully",
      "Play active games",
      "Work as a team and stay healthy",
    ],
  },
  {
    name: "Computing",
    focus: [
      "Use a keyboard and mouse",
      "Try a coding game or activity",
      "Learn safe and useful digital skills",
    ],
  },
  {
    name: "Topic",
    focus: [
      "Explore countries and places",
      "Learn about people and history",
      "Ask questions about the world",
    ],
  },
];

const yearLessons = {
  Nursery: {
    description: "Listen, count, explore, and learn through play.",
    steps: [
      "Read a short story together.",
      "Count objects around the room.",
      "Sing songs and move to the beat.",
    ],
  },
  Reception: {
    description: "Build early reading, number confidence, and curiosity.",
    steps: [
      "Practise phonics with sounds and letters.",
      "Solve number challenges using objects.",
      "Explore the world with nature and art.",
    ],
  },
  "Year 1": {
    description: "Develop strong foundations in reading, maths, and discovery.",
    steps: [
      "Read a simple text and talk about it.",
      "Use number facts to solve small problems.",
      "Complete a science activity and record findings.",
    ],
  },
  "Year 2": {
    description: "Grow confidence in language, maths, and wider learning topics.",
    steps: [
      "Write a short paragraph with interesting ideas.",
      "Measure and compare objects in the classroom.",
      "Learn facts about places and people.",
    ],
  },
  "Year 3": {
    description: "Think more deeply and explore richer ideas across the curriculum.",
    steps: [
      "Read and discuss a longer text.",
      "Use multiplication and division in real problems.",
      "Create a history or science project.",
    ],
  },
  "Year 4": {
    description: "Build accurate skills across core subjects and independent thinking.",
    steps: [
      "Write a well-structured explanation or story.",
      "Solve maths problems using times tables and logic.",
      "Research topic facts and share understanding.",
    ],
  },
  "Year 5": {
    description: "Challenge learners with more detailed tasks and creative projects.",
    steps: [
      "Read and analyse a text in depth.",
      "Use fractions, decimals, and problem-solving.",
      "Design and test a practical project.",
    ],
  },
  "Year 6": {
    description: "Prepare for success with revision, reasoning, and confident learning.",
    steps: [
      "Revise key skills in maths and English.",
      "Practise answering questions with clear explanations.",
      "Complete a challenge task and reflect on progress.",
    ],
  },
};

const focusSubject = document.getElementById("focus-subject");
const randomSubjectBtn = document.getElementById("random-subject-btn");
const powerpointLink = document.getElementById("powerpoint-link");
const lessonTitle = document.getElementById("lesson-title");
const lessonDescription = document.getElementById("lesson-description");
const lessonSteps = document.getElementById("lesson-steps");
const subjectSearch = document.getElementById("subject-search");
const searchBtn = document.getElementById("search-btn");

function updateFocusSubject(subjectName) {
  const subject = subjects.find((item) => item.name === subjectName) || subjects[0];

  focusSubject.textContent = subject.name;

  const listItems = document.querySelector(".hero-panel ul");
  listItems.innerHTML = subject.focus
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function updateLessonCard(yearGroup) {
  const lesson = yearLessons[yearGroup] || yearLessons.Nursery;
  lessonTitle.textContent = yearGroup;
  lessonDescription.textContent = lesson.description;
  lessonSteps.innerHTML = lesson.steps.map((step) => `<li>${step}</li>`).join("");

  document.querySelectorAll(".year-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.year === yearGroup);
  });
}

randomSubjectBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * subjects.length);
  updateFocusSubject(subjects[randomIndex].name);
});

powerpointLink.addEventListener("click", () => {
  const selectedYear = document.querySelector(".year-card.selected");
  const yearGroup = selectedYear ? selectedYear.dataset.year : "Nursery";
  powerpointLink.href = `powerpoint.html?year=${encodeURIComponent(yearGroup)}`;
});

document.querySelectorAll(".year-card").forEach((card) => {
  const selectYear = () => updateLessonCard(card.dataset.year);
  card.addEventListener("click", selectYear);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectYear();
    }
  });
});

function findLessonFromSearch() {
  const query = subjectSearch.value.trim().toLowerCase();
  if (!query) {
    updateLessonCard("Nursery");
    return;
  }

  const matchingYear = Object.keys(yearLessons).find((year) => {
    const yearName = year.toLowerCase();
    const matchSubject = [
      "literacy",
      "english",
      "maths",
      "math",
      "science",
      "art",
      "music",
      "pe",
      "computing",
      "topic",
      "history",
      "geography",
      "dt",
    ].includes(query);

    return yearName.includes(query) || matchSubject;
  });

  if (matchingYear) {
    updateLessonCard(matchingYear);
    return;
  }

  const subjectMatch = subjects.find((subject) => {
    const name = subject.name.toLowerCase();
    return name.includes(query);
  });

  if (subjectMatch) {
    const subjectName = subjectMatch.name;
    const matchingYearForSubject = Object.keys(yearLessons).find((year) => {
      const lesson = yearLessons[year];
      return lesson.description.toLowerCase().includes(subjectName.toLowerCase()) ||
        lesson.steps.some((step) => step.toLowerCase().includes(subjectName.toLowerCase()));
    });

    if (matchingYearForSubject) {
      updateLessonCard(matchingYearForSubject);
      return;
    }
  }

  lessonTitle.textContent = "No lesson found";
  lessonDescription.textContent = "Try another subject or year group such as Maths, Science, or Year 3.";
  lessonSteps.innerHTML = "<li>Type a subject name or year group.</li>";
}

searchBtn.addEventListener("click", findLessonFromSearch);
subjectSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    findLessonFromSearch();
  }
});

updateFocusSubject("Literacy");
updateLessonCard("Nursery");
