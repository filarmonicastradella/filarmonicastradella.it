import type { Attachment } from "svelte/attachments";

/** Scorrimento orizzontale trascinando con il mouse; un trascinamento non attiva i link. */
export const dragScroll: Attachment<HTMLElement> = (node) => {
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    const onMouseDown = (e: MouseEvent) => {
        dragging = true;
        moved = false;
        startX = e.pageX;
        startScroll = node.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!dragging) return;
        e.preventDefault();
        const walk = (e.pageX - startX) * 1.5;
        if (Math.abs(walk) > 5) moved = true;
        node.scrollLeft = startScroll - walk;
    };

    const stopDragging = () => (dragging = false);

    const onClick = (e: MouseEvent) => {
        if (!moved) return;
        e.preventDefault();
        e.stopPropagation();
        moved = false;
    };

    const onDragStart = (e: DragEvent) => e.preventDefault();

    node.addEventListener("mousedown", onMouseDown);
    node.addEventListener("mousemove", onMouseMove);
    node.addEventListener("mouseup", stopDragging);
    node.addEventListener("mouseleave", stopDragging);
    node.addEventListener("click", onClick, true);
    node.addEventListener("dragstart", onDragStart);

    return () => {
        node.removeEventListener("mousedown", onMouseDown);
        node.removeEventListener("mousemove", onMouseMove);
        node.removeEventListener("mouseup", stopDragging);
        node.removeEventListener("mouseleave", stopDragging);
        node.removeEventListener("click", onClick, true);
        node.removeEventListener("dragstart", onDragStart);
    };
};

/**
 * Riduce appena i figli in base alla distanza dal centro del contenitore (fino a 0,92, senza
 * sfumarli). Con il movimento ridotto non trasforma nulla (docs/DESIGN.md, Movimento).
 */
export const scaleByDistance: Attachment<HTMLElement> = (node) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MIN_SCALE = 0.92;

    const update = () => {
        const { left, width } = node.getBoundingClientRect();
        const center = left + width / 2;

        for (const child of node.children) {
            const rect = child.getBoundingClientRect();
            const distance = Math.min(1, Math.abs(center - (rect.left + rect.width / 2)) / (width / 2));
            (child as HTMLElement).style.scale = String(1 - distance * (1 - MIN_SCALE));
        }
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(node);

    return () => {
        node.removeEventListener("scroll", update);
        resizeObserver.disconnect();
    };
};
