import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newProject, setNewProject] = useState({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    id_creador: 1, // Por ahora hardcodeado, después se puede obtener del contexto de usuario
  });

  const [tests, setTests] = useState([]);

  const [newTest, setNewTest] = useState({
    id_proyecto: "",
    descripcion: "",
    estado: "",
    fecha_creacion: "",
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    loadProjects();
    loadTests();
  }, []);

  // Funciones para proyectos
  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setNewProject(project);
    setShowModal(true);
  };

  const handleSubmitProject = async () => {
    try {
      if (editingProject) {
        await api.updateProject(editingProject.id_proyecto, newProject);
      } else {
        await api.createProject(newProject);
      }
      setShowModal(false);
      setEditingProject(null);
      setNewProject({
        nombre: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        id_creador: 1,
      });
      loadProjects();
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
    }
  };

  const handleDeleteProject = async (project) => {
    if (window.confirm("¿Estás seguro de eliminar este proyecto?")) {
      try {
        await api.deleteProject(project.id_proyecto);
        loadProjects();
      } catch (error) {
        console.error("Error al eliminar proyecto:", error);
      }
    }
  };

  // Función auxiliar para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Funciones para pruebas
  const loadTests = async () => {
    try {
      const data = await api.getTests();
      setTests(data);
    } catch (error) {
      console.error("Error al cargar pruebas:", error);
    }
  };

  const handleCreateTest = async () => {
    try {
      await api.createTest(newTest);
      setShowModal(false);
      loadTests();
    } catch (error) {
      console.error("Error al crear prueba:", error);
    }
  };

  const handleEditTest = async (test) => {
    try {
      await api.updateTest(test.id, test);
      loadTests();
    } catch (error) {
      console.error("Error al editar prueba:", error);
    }
  };

  const handleDeleteTest = async (test) => {
    try {
      await api.deleteTest(test.id);
      loadTests();
    } catch (error) {
      console.error("Error al eliminar prueba:", error);
    }
  };

  const metricsData = [
    { metric: "Cobertura de Pruebas", value: 85 },
    { metric: "Tasa de Defectos Encontrados", value: 92 },
    { metric: "Tasa de Defectos Corregidos", value: 88 },
    { metric: "Tiempo Promedio de Resolución", value: 3.2 },
  ];

  return (
    <div className="flex gap-6">
      {/* Columna izquierda para las tablas */}
      <div className="flex-1">
        {/* Tabla de Proyectos */}
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Proyectos</h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => {
                setEditingProject(null);
                setNewProject({
                  nombre: "",
                  descripcion: "",
                  fecha_inicio: "",
                  fecha_fin: "",
                  id_creador: 1,
                });
                setShowModal(true);
              }}
            >
              Nuevo Proyecto
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border text-left">Nombre</th>
                  <th className="p-2 border text-left">Descripción</th>
                  <th className="p-2 border text-center">Fecha Inicio</th>
                  <th className="p-2 border text-center">Fecha Fin</th>
                  <th className="p-2 border text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      Cargando...
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No hay proyectos disponibles
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id_proyecto}>
                      <td className="p-2 border">{project.nombre}</td>
                      <td className="p-2 border">{project.descripcion}</td>
                      <td className="p-2 border text-center">
                        {formatDate(project.fecha_inicio)}
                      </td>
                      <td className="p-2 border text-center">
                        {formatDate(project.fecha_fin)}
                      </td>
                      <td className="p-2 border text-center">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleOpenEditModal(project)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteProject(project)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h3 className="text-2xl font-bold mb-4">
                  {editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block font-medium mb-1">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      value={newProject.nombre}
                      onChange={(e) =>
                        setNewProject({ ...newProject, nombre: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="descripcion"
                      className="block font-medium mb-1"
                    >
                      Descripción
                    </label>
                    <textarea
                      id="descripcion"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      value={newProject.descripcion}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          descripcion: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="fecha_inicio"
                      className="block font-medium mb-1"
                    >
                      Fecha Inicio
                    </label>
                    <input
                      id="fecha_inicio"
                      type="date"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      value={newProject.fecha_inicio}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          fecha_inicio: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fecha_fin"
                      className="block font-medium mb-1"
                    >
                      Fecha Fin
                    </label>
                    <input
                      id="fecha_fin"
                      type="date"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      value={newProject.fecha_fin}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          fecha_fin: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    onClick={handleSubmitProject}
                  >
                    {editingProject ? "Guardar Cambios" : "Crear Proyecto"}
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                    onClick={() => {
                      setShowModal(false);
                      setEditingProject(null);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="my-8" />

        {/* Tabla de Pruebas */}
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Pruebas</h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(true)}
            >
              Nueva Prueba
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border text-left">ID Proyecto</th>
                  <th className="p-2 border text-left">Descripción</th>
                  <th className="p-2 border text-center">Estado</th>
                  <th className="p-2 border text-center">Fecha Creación</th>
                  <th className="p-2 border text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test.id}>
                    <td className="p-2 border">{test.id_proyecto}</td>
                    <td className="p-2 border">{test.descripcion}</td>
                    <td className="p-2 border text-center">{test.estado}</td>
                    <td className="p-2 border text-center">
                      {test.fecha_creacion}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEditTest(test)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteTest(test)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h3 className="text-2xl font-bold mb-4">Nueva Prueba</h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="id_proyecto"
                      className="block font-medium mb-1"
                    >
                      ID Proyecto
                    </label>
                    <input
                      id="id_proyecto"
                      type="text"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      value={newTest.id_proyecto}
                      onChange={(e) =>
                        setNewTest({ ...newTest, id_proyecto: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="descripcion"
                      className="block font-medium mb-1"
                    >
                      Descripción
                    </label>
                    <textarea
                      id="descripcion"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      value={newTest.descripcion}
                      onChange={(e) =>
                        setNewTest({
                          ...newTest,
                          descripcion: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="estado" className="block font-medium mb-1">
                      Estado
                    </label>
                    <input
                      id="estado"
                      type="text"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      value={newTest.estado}
                      onChange={(e) =>
                        setNewTest({
                          ...newTest,
                          estado: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="fecha_creacion"
                      className="block font-medium mb-1"
                    >
                      Fecha Creación
                    </label>
                    <input
                      id="fecha_creacion"
                      type="datetime-local"
                      className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      value={newTest.fecha_creacion}
                      onChange={(e) =>
                        setNewTest({
                          ...newTest,
                          fecha_creacion: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                    onClick={handleCreateTest}
                  >
                    Crear Prueba
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Columna derecha para el gráfico */}
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Métricas de Calidad</h2>
        <BarChart width={500} height={400} data={metricsData}>
          <XAxis dataKey="metric" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Mantener los modales al final */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Nuevo Proyecto</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block font-medium mb-1">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={newProject.nombre}
                  onChange={(e) =>
                    setNewProject({ ...newProject, nombre: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="descripcion" className="block font-medium mb-1">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={newProject.descripcion}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      descripcion: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="fecha_inicio"
                  className="block font-medium mb-1"
                >
                  Fecha Inicio
                </label>
                <input
                  id="fecha_inicio"
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={newProject.fecha_inicio}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      fecha_inicio: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="fecha_fin" className="block font-medium mb-1">
                  Fecha Fin
                </label>
                <input
                  id="fecha_fin"
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                  value={newProject.fecha_fin}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      fecha_fin: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                onClick={handleSubmitProject}
              >
                {editingProject ? "Guardar Cambios" : "Crear Proyecto"}
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                onClick={() => {
                  setShowModal(false);
                  setEditingProject(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
