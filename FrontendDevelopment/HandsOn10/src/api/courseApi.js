import apiClient from './apiClient';

// ==========================================================================
// TASK 1 - Step 139: Create courseApi.js with exported functions
// ==========================================================================

// Fetches all courses mapped to domain structures
export const getAllCourses = async () => {
  const posts = await apiClient.get('/posts?_limit=5');
  return posts.map((post, index) => ({
    id: post.id,
    name: post.title,
    code: `CS${100 + post.id}`,
    credits: (index % 2 === 0) ? 4 : 3,
    grade: ['A', 'A+', 'B+', 'B', 'A-'][index % 5],
    description: post.body
  }));
};

// Fetches a single course by its ID
export const getCourseById = async (id) => {
  const post = await apiClient.get(`/posts/${id}`);
  const idNum = parseInt(id, 10);
  return {
    id: post.id,
    name: post.title,
    code: `CS${100 + post.id}`,
    credits: (idNum % 2 === 0) ? 4 : 3,
    grade: ['A', 'A+', 'B+', 'B', 'A-'][idNum % 5],
    description: post.body
  };
};

// Simulates a student enrollment action
export const enrollStudent = async (studentId, courseId) => {
  return await apiClient.post('/posts', {
    userId: studentId,
    courseId: courseId
  });
};
