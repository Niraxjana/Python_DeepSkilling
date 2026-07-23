import { courses } from "./data.js";

// =========================
// Step 45 - Promise with .then()
// =========================
function fetchUser(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(user => {
            console.log("User:", user.name);
            return user;
        });
}

fetchUser(1);

// =========================
// Step 46 - async/await
// =========================
async function fetchUserAsync(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const user = await response.json();
        console.log("Async User:", user.name);
    } catch (error) {
        console.error(error);
    }
}

fetchUserAsync(2);

// =========================
// Step 47 - Simulate Network Delay
// =========================
function fetchAllCourses() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(courses);
        }, 1000);
    });
}

// =========================
// Render Courses Function
// =========================
const courseGrid = document.querySelector(".course-grid");

function renderCourses(courseList) {

    courseGrid.innerHTML = "";

    courseList.forEach(course => {

        const article = document.createElement("article");

        article.className = "course-card";

        article.innerHTML = `
            <h3>${course.name}</h3>
            <p>Course Code: ${course.code}</p>
            <span>Credits: ${course.credits}</span>
        `;

        courseGrid.appendChild(article);

    });

}

// =========================
// Step 48 - Loading Message
// =========================
const loading = document.querySelector("#loading");

loading.style.display = "block";

fetchAllCourses().then(courseList => {

    loading.style.display = "none";

    renderCourses(courseList);

});

// =========================
// Step 49 - Promise.all()
// =========================
Promise.all([
    fetchUser(1),
    fetchUser(2)
]).then(users => {

    console.log("User 1:", users[0].name);
    console.log("User 2:", users[1].name);

});

// =========================
// Step 50 - Reusable Fetch Function
// =========================
async function apiFetch(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch data.");
    }

    return await response.json();

}

// =========================
// Step 51 & 52 - Load Posts
// =========================
const notifications = document.querySelector("#notifications");
const spinner = document.querySelector("#spinner");

async function loadPosts() {

    spinner.style.display = "block";

    try {

        const posts = await apiFetch("https://jsonplaceholder.typicode.com/posts");

        spinner.style.display = "none";

        notifications.innerHTML = "";

        posts.slice(0, 5).forEach(post => {

            notifications.innerHTML += `
                <article class="course-card">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </article>
            `;

        });

    } catch (error) {

        spinner.style.display = "none";

        notifications.innerHTML = `
            <p>${error.message}</p>
            <button id="retry">Retry</button>
        `;

    }

}

loadPosts();

// =========================
// Step 53 - 404 Error Demo
// =========================
async function testError() {

    try {

        await apiFetch("https://jsonplaceholder.typicode.com/nonexistent");

    } catch (error) {

        console.log("404 Error:", error.message);

    }

}

testError();

// =========================
// Step 54 - Retry Button
// =========================
document.addEventListener("click", (event) => {

    if (event.target.id === "retry") {

        loadPosts();

    }

});