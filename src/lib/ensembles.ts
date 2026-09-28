import type { Component } from "svelte";

interface EnsembleMetadata {
    title: string;
    summary: string;
    order: number;
}

export interface Ensemble extends EnsembleMetadata {
    slug: string;
    component: Component;
}

const modules = import.meta.glob<{ default: Component; metadata: EnsembleMetadata }>("/src/lib/content/ensembles/*.md", {
    eager: true
});

export const ensembles: Ensemble[] = Object.entries(modules)
    .map(([path, module]) => ({
        slug: path.split("/").pop()!.replace(/\.md$/, ""),
        ...module.metadata,
        component: module.default
    }))
    .sort((a, b) => a.order - b.order);
