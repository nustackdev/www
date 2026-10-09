/**
 * giscus: post comments live in GitHub Discussions on nustackdev/www, one
 * discussion per post, matched by pathname. IDs come from
 * `gh api graphql` (repository id, discussion category id).
 */
export const GISCUS = {
  repo: 'nustackdev/www',
  repoId: 'R_kgDOT0X9Fg',
  category: 'Announcements',
  categoryId: 'DIC_kwDOT0X9Fs4DHahB',
} as const;
