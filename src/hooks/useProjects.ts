// ============================================================
// src/hooks/useProjects.ts  — replace your existing file
// ============================================================
"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/services/portfolio";
import { Project } from "@/types/portfolio";

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProjects()
            .then(setProjects)
            .catch(() => setError("Failed to load projects"))
            .finally(() => setLoading(false));
    }, []);

    return { projects, loading, error };
};