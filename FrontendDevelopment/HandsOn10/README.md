# Hands-On 10: Advanced State Management & API Architecture

This project is a centralized, fully responsive Single Page Application (SPA) version of the Student Portal implementing **React**, **Redux Toolkit (RTK)**, and **Axios**.

---

## State Management Comparison (Task 3 - Step 151)

Below is a detailed comparison of state management paradigms across the three major frontend frameworks: **React (Redux Toolkit)**, **Angular (NgRx)**, and **Vue (Pinia)**.

| Criteria | React + Redux Toolkit (RTK) | Angular + NgRx | Vue 3 + Pinia |
| :--- | :--- | :--- | :--- |
| **Architecture Style** | Flux architecture pattern (Actions, Reducers, Selectors, Async Thunks). | Redux/Flux pattern heavily inspired by RxJS Observables and streams. | Store-based (Composition API style: `ref`, `computed`, `action`). |
| **Boilerplate Code** | **Medium.** Reduced drastically from legacy Redux via `createSlice` and `createAsyncThunk`, but still requires slice setup, selectors, and async configuration. | **High.** Requires Actions, Reducers, Selectors, Effects (for side effects), and extensive TypeScript type bindings/boilerplate. | **Low.** Minimal boilerplate. Stores are defined similarly to standard Vue Composition components (reactive refs and functions). |
| **Learning Curve** | **Moderate.** Concepts of unidirectional data flow, immutability (Immer), actions, and selectors require solid understanding of state patterns. | **Steep.** Requires master-level understanding of both Redux architecture and RxJS Observables/Reactive pipelines. | **Gentle.** Extremely intuitive. If you understand basic Vue `ref` and `computed`, you can construct a Pinia store immediately. |
| **Async Operations** | Handled natively via `createAsyncThunk` middleware (built into RTK). | Handled via NgRx Effects (`@Effect`), isolating side-effects from pure reducer logic using RxJS. | Handled directly inside store `actions` using standard `async/await`. |
| **State Mutability** | **Immutable.** RTK uses **Immer** under the hood, allowing mutative-looking code (e.g., `.push()`) which compiles to safe immutable updates. | **Immutable.** Enforces strict immutability. Developers must spread objects (`...state`) manually inside pure reducer functions. | **Reactive/Mutable.** Fully reactive. Vue handles dependencies and triggers DOM re-renders automatically when refs change. |
| **Built-in Tooling** | Excellent integration with **Redux DevTools** (for time-travel debugging, action tracking, and diff inspection). | Integrates with Redux DevTools via `@ngrx/store-devtools`. Heavy reliance on Angular CLI schematics for file generation. | Fully integrated into **Vue DevTools** (reactive inspector, history timelines, action triggers). |

---

## Centralised API Service Layer Design (Task 1)

1. **`src/api/apiClient.js`:**
   - Single Axios instance with a configured `baseURL` (`https://jsonplaceholder.typicode.com`) and request `timeout` (5000ms).
   - **Request Interceptor:** Dynamically attaches a mock `Authorization` bearer token to headers before every request.
   - **Response Interceptor:** Automatically unpacks HTTP payloads (returning `response.data` directly) and intercepts failed requests to format a standardized Error object containing `message` and `statusCode`.

2. **`src/api/courseApi.js`:**
   - Exposes high-level data functions (`getAllCourses`, `getCourseById`, `enrollStudent`) consumed directly by Redux thunks.

---

## Redux Async Thunks & Selectors (Task 2)

- **Async Thunk (`fetchAllCourses`):** Handles the asynchronous REST lifecycle (`pending`, `fulfilled`, `rejected`) and rejects with standardized error messages.
- **Selectors:** Declared `selectCourses`, `selectCoursesLoading`, and `selectCoursesError` to decouple component templates from store slice structures.
