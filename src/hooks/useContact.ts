"use client";

import { useState } from "react";
import { sendContactMessage } from "@/services/portfolio";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const useContact = () => {
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const submitMessage = async (
        payload: ContactFormData
    ) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            await sendContactMessage(payload);

            setSuccess(true);

            return true;
        } catch (err) {
            console.error(err);

            setError("Failed to send message");

            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        submitMessage,
        loading,
        success,
        error,
    };
};