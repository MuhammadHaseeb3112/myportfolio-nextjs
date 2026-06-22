// src/services/portfolio.ts
import api from "@/lib/api";
import {
    PortfolioProfile,
    Project,
    Testimonial,
    ContactMessage,
} from "@/types/portfolio";

// ---------- Profile ----------
export const getProfile = async (): Promise<PortfolioProfile> => {
    const res = await api.get<PortfolioProfile>("/profile/");
    return res.data;
};

// ---------- Projects ----------
export const getProjects = async (): Promise<Project[]> => {
    const res = await api.get<Project[] | { results: Project[] }>("/projects/");
    const d = res.data;
    if (Array.isArray(d)) return d;
    if ("results" in d && Array.isArray(d.results)) return d.results;
    return [];
};

// ---------- Testimonials ----------
export const getTestimonials = async (): Promise<Testimonial[]> => {
    const res = await api.get<Testimonial[] | { results: Testimonial[] }>(
        "/testimonials/"
    );
    const d = res.data;
    if (Array.isArray(d)) return d;
    if ("results" in d && Array.isArray(d.results)) return d.results;
    return [];
};

// ---------- Contact ----------
export const sendContactMessage = async (
    payload: ContactMessage
): Promise<ContactMessage> => {
    const res = await api.post<ContactMessage>("/contact/", payload);
    return res.data;
};