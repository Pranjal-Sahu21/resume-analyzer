import axios from "axios";

const BASE_URL = "https://resuscope-api-64079021584.asia-south1.run.app";

/* ============================
   ANALYZE RESUME
============================ */
export const analyzeResume = async (file, jobDescription, jobTitle) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(`${BASE_URL}/analyze_resume`, formData, {
    params: {
      job_description: jobDescription,
      job_title: jobTitle,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/* ============================
   OPTIMIZATION ENDPOINTS
============================ */
const postWithFile = async (endpoint, file, extra = {}) => {
  const formData = new FormData();
  formData.append("resume", file);

  Object.entries(extra).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


