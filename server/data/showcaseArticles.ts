export const showcaseArticleFixtures = [
  {
    slug: "first-party-oracles",
    title: "First-party oracles for frontend builders",
    subtitle: "How API3 presents data feeds, dApps, and protocol context.",
    description:
      "A showcase article fixture describing the frontend concepts behind API3's ecosystem catalogue.",
    author: {
      name: "API3 Ecosystem",
      bio: "Showcase fixture",
    },
    cover: "/images/article-placeholder.jpg",
    category: "Oracles",
    created_at: "2024-06-18",
    views: 3200,
    upvotes: 58,
    isFeatured: true,
    markdown: `## Frontend catalogue patterns

The ecosystem website brings project metadata, data-feed relationships, and protocol context into one browsable interface.

## What the showcase preserves

- Filterable dApp cards
- Feed discovery pages
- Project detail pages
- Submission form structure

## Demo mode

This local showcase keeps the experience interactive while replacing private backend services with deterministic frontend-safe data.`,
  },
  {
    slug: "oev-watchtower-demo",
    title: "OEV Watchtower demo data",
    subtitle: "A deterministic dataset for chart and protocol exploration.",
    description:
      "A static fixture explaining the OEV charts used in this frontend showcase.",
    author: {
      name: "API3 Ecosystem",
      bio: "Showcase fixture",
    },
    cover: "/images/article-placeholder.jpg",
    category: "OEV",
    created_at: "2024-05-22",
    views: 2100,
    upvotes: 43,
    isFeatured: true,
    markdown: `## Protocol visualization

The OEV page is designed around protocol comparison, chart controls, and explanatory storytelling.

## Static data

The showcase uses deterministic totals and chart points so the page can be reviewed without MongoDB or indexing jobs.

## Review goal

The goal is to evaluate the frontend interaction model, not production OEV analytics.`,
  },
  {
    slug: "ecosystem-submission-flow",
    title: "A demo submission flow",
    subtitle: "Preserving the form without requiring wallet or storage secrets.",
    description:
      "A local article fixture about the add-dapp flow and its demo-mode behavior.",
    author: {
      name: "API3 Ecosystem",
      bio: "Showcase fixture",
    },
    cover: "/images/article-placeholder.jpg",
    category: "Ecosystem",
    created_at: "2024-04-15",
    views: 1700,
    upvotes: 37,
    markdown: `## Preserved workflow

The add-dapp form remains a multi-step frontend experience with content, images, tags, proxy data, and links.

## Demo replacements

Wallet connection, SIWE verification, image upload, proxy lookup, and final submission are deterministic fake actions.

## Why this matters

Reviewers can inspect the product thinking and frontend execution without needing private infrastructure.`,
  },
  {
    slug: "feed-discovery",
    title: "Feed discovery as a navigation layer",
    subtitle: "Using feed metadata to move between protocols and dApps.",
    description:
      "A showcase article fixture about the feed browsing experience.",
    author: {
      name: "API3 Ecosystem",
      bio: "Showcase fixture",
    },
    cover: "/images/article-placeholder.jpg",
    category: "Data Feeds",
    created_at: "2024-03-07",
    views: 900,
    upvotes: 22,
    markdown: `## Feed-first browsing

Feeds provide a second navigation layer across the ecosystem catalogue.

## Frontend behavior

The feeds routes use local project statistics and registry data to show which dApps depend on a feed.

## Showcase value

This path demonstrates data modeling, route composition, and reusable card components.`,
  },
];

export function getShowcaseArticle(slug: string) {
  return showcaseArticleFixtures.find((article) => article.slug === slug);
}
