'use client';

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface Project {
  id?: string; // For API identification
  company: string;
  year: string;
  title: string;
  results: { title: string }[] | string;
  link: string;
  image: string;
}

const DashboardWithAPI = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Project>({
    company: "",
    year: "",
    title: "",
    results: [],
    link: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Project[]>(API_URL);
      console.log("API Response:", response.data);
      setProjects(response.data);
    } catch (error) {
      alert("Failed to fetch projects. Please try again later.");
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Parse results string into an array of objects
    const resultsArray =
      typeof formData.results === "string"
        ? formData.results.split(",").map((item) => ({ title: item.trim() }))
        : formData.results;

    const projectData = { ...formData, results: resultsArray };

    try {
      setLoading(true);
      if (isEditing && editingId) {
        // Update existing project
        const response = await axios.put(`${API_URL}/${editingId}`, projectData);
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editingId ? response.data : project
          )
        );
        setIsEditing(false);
        setEditingId(null);
      } else {
        // Add new project
        const response = await axios.post(API_URL, projectData);
        setProjects((prev) => [...prev, response.data]);
      }

      // Clear the form
      setFormData({
        company: "",
        year: "",
        title: "",
        results: [],
        link: "",
        image: "",
      });
    } catch (error) {
      alert("Failed to save project. Please try again.");
      console.error("Error saving project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      ...project,
      results:
        typeof project.results === "string"
          ? project.results
          : project.results.map((r) => r.title).join(", "),
    });
    setIsEditing(true);
    setEditingId(project.id || null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      alert("Failed to delete project. Please try again.");
      console.error("Error deleting project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 py-6 px-4 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-emerald-400">
          Project Dashboard
        </h1>
        <p className="text-gray-400 text-center mt-2">
          Manage and track your projects in one place.
        </p>
      </header>

      <main className="container mx-auto py-10 px-4">
        {/* Form Section */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-emerald-400">
            {isEditing ? "Edit Project" : "Add a New Project"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="p-4 bg-gray-700 rounded-md text-white focus:outline-emerald-400"
              required
            />
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
              className="p-4 bg-gray-700 rounded-md text-white focus:outline-emerald-400"
              required
            />
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="p-4 bg-gray-700 rounded-md text-white focus:outline-emerald-400"
              required
            />
            <input
              type="text"
              name="results"
              value={
                typeof formData.results === "string"
                  ? formData.results
                  : formData.results.map((r) => r.title).join(", ")
              }
              onChange={handleChange}
              placeholder="Results (comma-separated)"
              className="p-4 bg-gray-700 rounded-md text-white focus:outline-emerald-400"
              required
            />
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Project Link"
              className="p-4 bg-gray-700 rounded-md text-white focus:outline-emerald-400"
              required
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="p-4 bg-gray-700 rounded-md text-white focus:outline-emerald-400"
              required
            />
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-emerald-500 py-4 px-8 rounded-md text-lg font-bold text-gray-950 hover:bg-emerald-600 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : isEditing ? "Update Project" : "Add Project"}
            </button>
          </form>
        </div>

        {/* Projects Table */}
        <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-emerald-400">
            Project List
          </h2>
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            <table className="w-full text-left text-gray-300 border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-emerald-400">
                  <th className="p-4">Company</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-gray-700">
                    <td className="p-4">{project.company}</td>
                    <td className="p-4">{project.year}</td>
                    <td className="p-4">{project.title}</td>
                    <td className="p-4 flex gap-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id!)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardWithAPI;
