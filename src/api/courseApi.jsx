import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCourses = () => axios.get(BASE_URL);
export const addCourse = (course) => axios.post(BASE_URL, course);
export const updateCourse = (id, course) => axios.put(`${BASE_URL}/${id}`, course);
export const deleteCourse = (id) => axios.delete(`${BASE_URL}/${id}`);