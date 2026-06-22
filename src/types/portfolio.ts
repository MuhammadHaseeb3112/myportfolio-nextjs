// ============================================================
// src/types/portfolio.ts
// ============================================================

export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    display_order: number;
}

export interface Skill {
    id: number;
    name: string;
    icon: string | null;
    category: string;
    display_order: number;
}

export interface Hobby {
    id: number;
    title: string;
    emoji: string;
    left_position: string;
    top_position: string;
    display_order: number;
}

export interface PortfolioProfile {
    id: number;
    full_name: string;
    designation: string;
    hero_title: string;
    hero_description: string;
    about: string;
    profile_image: string | null;
    profile_image_url: string | null;
    resume: string | null;
    resume_url: string | null;
    email: string;
    phone: string;
    location: string;
    map_url: string;
    available_for_work: boolean;
    social_links: SocialLink[];
    skills: Skill[];
    hobbies: Hobby[];
    created_at: string;
    updated_at: string;
}


// ============================================================
// Project Types
// ============================================================

export interface ProjectFeature {
    id: number;
    title: string;
}

export interface GalleryImage {
    id: number;
    caption: string;
    image: string;
    image_url: string;
    display_order: number;
}

export interface Project {
    id: number;
    company: string;
    year: number;
    title: string;
    slug: string;
    description: string;

    image: string;
    image_url: string | null;

    gallery: GalleryImage[];

    github_url: string;
    live_url: string;

    featured: boolean;
    display_order: number;
    is_active: boolean;

    features: ProjectFeature[];

    created_at: string;
    updated_at: string;
}

// ============================================================
// Testimonials
// ============================================================

export interface Testimonial {
    id: number;
    client_name: string;
    position: string;
    review: string;

    avatar: string;
    avatar_url: string | null;

    display_order: number;

    created_at: string;
    updated_at: string;
}


// ============================================================
// Contact
// ============================================================

export interface ContactMessage {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at?: string;
}