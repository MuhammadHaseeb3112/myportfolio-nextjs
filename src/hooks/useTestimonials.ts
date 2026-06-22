// ============================================================
// src/hooks/useTestimonials.ts  — replace your existing file
// ============================================================
"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/services/portfolio";
import { Testimonial } from "@/types/portfolio";

export const useTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTestimonials()
            .then(setTestimonials)
            .catch(() => setError("Failed to load testimonials"))
            .finally(() => setLoading(false));
    }, []);

    return { testimonials, loading, error };
};