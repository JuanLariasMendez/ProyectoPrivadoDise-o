const API_URL = "http://localhost:3000"; // URL base de la API

const makeRequest = async (url, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${url}`, options);

    // Log para debugging
    console.log(`Request to: ${API_URL}${url}`);
    console.log(`Response status: ${response.status}`);

    // Manejo de respuesta no autorizada
    if (response.status === 401) {
      console.warn("Sesión expirada. Redirigiendo al login.");
      localStorage.removeItem("token");
      window.location.href = "/";
      return null;
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};

// API endpoints
export const api = {
  // Proyectos
  getProjects: () => makeRequest("/projects"),
  createProject: (data) => makeRequest("/projects", "POST", data),
  updateProject: (id, data) => makeRequest(`/projects/${id}`, "PUT", data),
  deleteProject: (id) => makeRequest(`/projects/${id}`, "DELETE"),

  // Pruebas
  getTests: () => makeRequest("/tests"),
  createTest: (data) => makeRequest("/tests", "POST", data),
  updateTest: (id, data) => makeRequest(`/tests/${id}`, "PUT", data),
  deleteTest: (id) => makeRequest(`/tests/${id}`, "DELETE"),

  // Reportes
  getMonthProgress: () => makeRequest("/reports/progress"),
};

export default api;
