import { createApiTree } from "apicase";

// 🔹 API Base URL
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// 🔹 Definisi API
const ApiServiceCRUD = createApiTree({
  getAllPosts: {
    method: "GET",
    url: `${API_BASE_URL}/posts`,
  },
  createPost: {
    method: "POST",
    url: `${API_BASE_URL}/posts`,
  },
  updatePost: {
    method: "PUT",
    url: ({ params }) => `${API_BASE_URL}/posts/${params.id}`,
  },
  deletePost: {
    method: "DELETE",
    url: ({ params }) => `${API_BASE_URL}/posts/${params.id}`,
  },
});

export default ApiServiceCRUD;
