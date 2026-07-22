import { courses } from "./data.js";

// =========================
// Step 30 & 34
// =========================
courses.forEach(course => {
    const { name, credits } = course;
    console.log(`${name} - ${credits} credits`);
});

// =========================
// Step 31
// =========================
const formattedCourses = courses.map(course => {
    return `${course.code} — ${course.name} (${course.credits} credits)`;
});

console.log(formattedCourses);

// =========================
// Step 32
// =========================
const highCreditCourses = courses.filter(course => {
    return course.credits >= 4;
});

console.log(highCreditCourses);
console.log("Number of courses with 4 or more credits:", highCreditCourses.length);

// =========================
// Step 33
// =========================
const total = courses.reduce((sum, course) => {
    return sum + course.credits;
}, 0);

console.log("Total Credits:", total);

// =========================
// Steps 35 - 39
// =========================

// Select course grid
const courseGrid = document.querySelector(".course-grid");

// Function to render course cards
function renderCourses(courseList) {

    // Clear existing cards
    courseGrid.innerHTML = "";

    courseList.forEach(course => {

        const article = document.createElement("article");

        article.className = "course-card";

        // Store course id for event delegation
        article.dataset.id = course.id;

        article.innerHTML = `
            <h3>${course.name}</h3>
            <p>Course Code: ${course.code}</p>
            <span>Credits: ${course.credits}</span>
        `;

        courseGrid.appendChild(article);

    });

}

// Initially display all courses
renderCourses(courses);

// Display total credits
const totalCredits = document.querySelector("#total-credits");

totalCredits.textContent = `Total Credits Enrolled: ${total}`;

// =========================
// Step 40 & 41 - Search
// =========================

const searchInput = document.querySelector("#search-courses");

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchText)
    );

    renderCourses(filteredCourses);

});

// =========================
// Step 42 - Sort
// =========================

const sortButton = document.querySelector("#sort-btn");

sortButton.addEventListener("click", () => {

    courses.sort((a, b) => b.credits - a.credits);

    renderCourses(courses);

});

// =========================
// Step 43 & 44
// Event Delegation
// =========================

const selectedCourse = document.querySelector("#selected-course");

courseGrid.addEventListener("click", (event) => {

    const card = event.target.closest(".course-card");

    if (!card) return;

    const id = Number(card.dataset.id);

    const course = courses.find(c => c.id === id);

    selectedCourse.textContent =
        `Selected Course: ${course.name} | Grade: ${course.grade}`;

});