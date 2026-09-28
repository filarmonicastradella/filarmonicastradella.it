import type { Component } from "svelte";

interface NewsMetadata {
    title: string;
    date: string;
    excerpt: string;
}

export interface NewsPost extends NewsMetadata {
    slug: string;
    component: Component;
}

const modules = import.meta.glob<{ default: Component; metadata: NewsMetadata }>("/src/lib/content/news/*.md", {
    eager: true
});

export const news: NewsPost[] = Object.entries(modules)
    .map(([path, module]) => ({
        slug: path.split("/").pop()!.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
        ...module.metadata,
        component: module.default
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

export const formatNewsDate = (date: string) =>
    new Date(date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" });
