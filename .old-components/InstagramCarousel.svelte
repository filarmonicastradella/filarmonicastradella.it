<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import type { BeholdFeedResponse, BeholdPost, BeholdChildMedia } from "$lib/types/behold";

  const FEED_URL = "https://feeds.behold.so/1nxUxyt6x5qBVeEHpHNS";

  interface FlattenedSlide {
    id: string;
    mediaType: "IMAGE" | "VIDEO";
    mediaUrl: string;
    thumbnailUrl?: string;
    sizes?: BeholdChildMedia["sizes"];
    permalink: string;
    caption?: string;
  }

  let posts = $state<BeholdPost[]>([]);
  let loading = $state(true);
  let error = $state(false);

  let trackElement = $state<HTMLDivElement | null>(null);

  // Stati per il trascinamento fluido
  let isDown = $state(false);
  let startX = $state(0);
  let scrollLeft = $state(0);
  let hasMoved = $state(false);

  function handleMouseDown(e: MouseEvent) {
    if (!trackElement) return;
    isDown = true;
    hasMoved = false;
    trackElement.classList.add('is-dragging');
    startX = e.pageX - trackElement.offsetLeft;
    scrollLeft = trackElement.scrollLeft;
  }

  function handleMouseLeave() {
    if (!isDown) return;
    isDown = false;
    if (trackElement) trackElement.classList.remove('is-dragging');
  }

  function handleMouseUp() {
    isDown = false;
    if (trackElement) trackElement.classList.remove('is-dragging');
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDown || !trackElement) return;
    e.preventDefault();
    const x = e.pageX - trackElement.offsetLeft;
    const walk = (x - startX) * 1.5;
    
    if (Math.abs(walk) > 5) {
      hasMoved = true;
    }

    trackElement.scrollLeft = scrollLeft - walk;
    updateScale();
  }

  function handleLinkClick(e: MouseEvent) {
    if (hasMoved) {
      e.preventDefault();
    }
  }

  // Calcolo dinamico della scala in base alla distanza dal centro del contenitore
  function updateScale() {
    if (!trackElement) return;
    const containerRect = trackElement.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    const slides = trackElement.querySelectorAll<HTMLElement>(".ec-slide");
    slides.forEach((slide) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      
      const distance = Math.abs(containerCenter - slideCenter);
      const maxDistance = containerRect.width / 2;
      let scale = 1 - (distance / maxDistance) * 0.3;
      scale = Math.max(0.7, Math.min(1, scale));

      slide.style.transform = `scale(${scale})`;
      slide.style.opacity = `${0.5 + scale * 0.5}`;
    });
  }

  onMount(() => {
    if (!trackElement) return;
    trackElement.addEventListener("scroll", updateScale, { passive: true });
    
    const interval = setInterval(() => {
      if (posts.length > 0) {
        updateScale();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      if (trackElement) {
        trackElement.removeEventListener("scroll", updateScale);
      }
      clearInterval(interval);
    };
  });

  $effect(() => {
    loading = true;
    error = false;

    fetch(FEED_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento del feed");
        return res.json() as Promise<BeholdFeedResponse>;
      })
      .then((data) => {
        posts = data.posts ?? [];
        loading = false;
        setTimeout(updateScale, 50);
      })
      .catch((err) => {
        console.error("Behold Fetch Error:", err);
        error = true;
        loading = false;
      });
  });

  let slides = $derived.by<FlattenedSlide[]>(() => {
    const list: FlattenedSlide[] = [];

    posts.forEach((post) => {
      if (post.children && post.children.length > 0) {
        post.children.forEach((child) => {
          list.push({
            id: child.id,
            mediaType: child.mediaType,
            mediaUrl: child.mediaUrl,
            thumbnailUrl: child.thumbnailUrl,
            sizes: child.sizes,
            permalink: post.permalink,
            caption: post.prunedCaption
          });
        });
      } else {
        list.push({
          id: post.id,
          mediaType: post.mediaType,
          mediaUrl: post.mediaUrl,
          thumbnailUrl: post.thumbnailUrl,
          sizes: post.sizes,
          permalink: post.permalink,
          caption: post.prunedCaption
        });
      }
    });

    return list;
  });
</script>

<section aria-labelledby="galleria-heading">
    <div>
        <header>
            <h2 id="galleria-heading">Momenti in musica</h2>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" class="view-all">
                <span>Guarda tutta la galleria</span>
                <Icon icon="mdi:arrow-right" width="1.2em" />
            </a>
        </header>

        <div class="ec-container">
            <div 
                class="ec-slides" 
                bind:this={trackElement}
                onmousedown={handleMouseDown}
                onmouseleave={handleMouseLeave}
                onmouseup={handleMouseUp}
                onmousemove={handleMouseMove}
                onscroll={updateScale}
            >
                {#if loading}
                    {#each Array(6) as _}
                        <div class="ec-slide skeleton"></div>
                    {/each}
                {:else if error}
                    <div class="ec-error">
                        <span>Impossibile caricare la galleria Instagram.</span>
                    </div>
                {:else}
                    {#each slides as slide (slide.id)}
                        <a 
                            href={slide.permalink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="ec-slide"
                            draggable="false"
                            onclick={handleLinkClick}
                        >
                            {#if slide.mediaType === "VIDEO"}
                                <video 
                                    src={slide.mediaUrl} 
                                    poster={slide.thumbnailUrl} 
                                    muted 
                                    loop 
                                    playsinline
                                    draggable="false"
                                ></video>
                            {:else}
                                <img 
                                    src={slide.sizes?.large?.mediaUrl ?? slide.sizes?.medium?.mediaUrl ?? slide.mediaUrl} 
                                    alt={slide.caption ?? "Foto Instagram"} 
                                    loading="lazy"
                                    draggable="false"
                                />
                            {/if}

                            {#if slide.caption}
                                <div class="ec-overlay">
                                    <p class="ec-caption">{slide.caption}</p>
                                </div>
                            {/if}
                        </a>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</section>

<!--
<style>
    section {
        background-color: var(--bg-surface);
        border-bottom: 1px solid var(--border-color-subtle);
        padding: var(--space-3xl) 0;
    }

    section > div {
        max-width: var(--content-max-width-page);
        margin: 0 auto;
        padding: 0 var(--space-lg);
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
    }

    section > div > header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        border-bottom: 1px solid var(--border-color-subtle);
        padding-bottom: var(--space-md);
    }

    h2 {
        font-family: var(--font-heading);
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-heading);
        color: var(--text-main);
        margin: 0;
    }

    .view-all {
        display: inline-flex;
        align-items: center;
        gap: var(--space-xs);
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-semibold);
        text-transform: uppercase;
        letter-spacing: var(--letter-spacing-wide);
        color: var(--color-primary);
        text-decoration: none;
        padding-bottom: var(--space-2xs);
        transition: color var(--transition-fast);
    }

    .view-all:hover {
        color: var(--color-primary-hover);
    }

    .ec-container {
        width: 100%;
    }

    .ec-slides {
        display: flex;
        gap: var(--space-md);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        width: 100%;
        scrollbar-width: none;
        -ms-overflow-style: none;
        cursor: grab;
        user-select: none;
        padding: var(--space-xl) 0;
    }

    .ec-slides.is-dragging {
        cursor: grabbing;
        scroll-behavior: auto;
        scroll-snap-type: none;
    }

    .ec-slides::-webkit-scrollbar {
        display: none;
    }

    .ec-slide {
        position: relative;
        flex: 0 0 350px;
        height: 350px;
        border-radius: var(--radius-md);
        overflow: hidden;
        scroll-snap-align: center;
        background-color: var(--bg-surface-raised);
        border: 1px solid var(--border-color-subtle);
        box-shadow: var(--shadow-sm);
        display: block;
        text-decoration: none;
        transform: scale(0.85);
        transform-origin: center center;
        transition: transform 0.1s ease-out, opacity 0.1s ease-out, border-color var(--transition-fast), box-shadow var(--transition-fast);
        will-change: transform, opacity;
    }

    .ec-slide:hover {
        border-color: var(--border-color-medium);
        box-shadow: var(--shadow-md);
    }

    .ec-slide img,
    .ec-slide video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 0;
        pointer-events: none;
    }

    .ec-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(20, 19, 18, 0.85);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        padding: var(--space-lg);
        opacity: 0;
        transition: opacity 0.25s ease;
    }

    .ec-slide:hover .ec-overlay {
        opacity: 1;
    }

    .ec-caption {
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        line-height: var(--line-height-body);
        color: #f4f0eb;
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 8;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .skeleton {
        background-color: var(--bg-subtle);
        border-color: var(--border-color-subtle);
    }

    .ec-error {
        color: var(--text-muted);
        font-family: var(--font-body);
        font-size: var(--font-size-sm);
        padding: var(--space-2xl) 0;
        width: 100%;
        text-align: center;
        border: 1px dashed var(--border-color-subtle);
        border-radius: var(--radius-md);
    }

    @media (max-width: 768px) {
        .ec-slide {
            flex: 0 0 280px;
            height: 280px;
        }
    }
</style>
-->