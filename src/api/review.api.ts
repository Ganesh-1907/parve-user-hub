import api from "./axios";

export const getPublicReviewsApi = async () => {
    const response = await api.get("/reviews");
    return response.data;
};

export const addReviewApi = async (formData: FormData) => {
    const response = await api.post("/reviews/add", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
