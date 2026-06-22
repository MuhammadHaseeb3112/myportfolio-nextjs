// ============================================================
// src/hooks/useProfile.ts  — NEW file, create this
// ============================================================
"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/portfolio";
import { PortfolioProfile } from "@/types/portfolio";

export const useProfile = () => {
    const [profile, setProfile] = useState<PortfolioProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProfile()
            .then(setProfile)
            .catch(() => setError("Failed to load profile"))
            .finally(() => setLoading(false));
    }, []);

    return { profile, loading, error };
};