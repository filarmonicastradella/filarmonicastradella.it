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

/** Riduce e sfuma i figli in base alla distanza dal centro del contenitore. */
export const scaleByDistance: Attachment<HTMLElement> = (node) => {
    const update = () => {
        const { left, width } = node.getBoundingClientRect();
        const center = left + width / 2;

        for (const child of node.children) {
            const rect = child.getBoundingClientRect();
            const distance = Math.abs(center - (rect.left + rect.width / 2));
            const scale = Math.max(0.7, Math.min(1, 1 - (distance / (width / 2)) * 0.3));
            (child as HTMLElement).style.transform = `scale(${scale})`;
            (child as HTMLElement).style.opacity = `${0.5 + scale * 0.5}`;
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

export interface ScrollEdges {
    canScrollStart: boolean;
    canScrollEnd: boolean;
}

/** Comunica se la lista può scorrere ancora all'inizio o alla fine. */
export const trackScrollEdges =
    (onChange: (edges: ScrollEdges) => void): Attachment<HTMLElement> =>
    (node) => {
        const update = () => {
            const { scrollLeft, scrollWidth, clientWidth } = node;
            onChange({
                canScrollStart: scrollLeft > 1,
                canScrollEnd: scrollLeft < scrollWidth - clientWidth - 1
            });
        };

        update();
        node.addEventListener("scroll", update, { passive: true });
        const resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(node);
        const mutationObserver = new MutationObserver(update);
        mutationObserver.observe(node, { childList: true });

        return () => {
            node.removeEventListener("scroll", update);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    };
