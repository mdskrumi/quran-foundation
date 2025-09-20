# Authentication and API Usage

This document explains how authentication is implemented in the project and how the application uses the Juz and Random Verse APIs. It describes the `TokenManager` responsibilities, the `lib/fetch.ts` wrapper behavior, expected request/response shapes, caching hints, and small examples showing how to call the APIs from server components or client code.

## Goals

- Keep token acquisition and caching centralized.
- Make API calls consistent and easy to reason about.
- Retry transparently on expired tokens (single retry).
- Surface HTTP status and JSON payloads to UI components for friendly error handling.

## TokenManager (concept)

The codebase uses a `TokenManager` singleton (file: `lib/tokenManager.ts`) to handle the token lifecycle. Responsibilities:

- Acquire an access token from a secure auth endpoint when requested.
- Cache the token in memory to avoid unnecessary network requests.
- Expose `getToken()` (async), `clearToken()` and optionally `setToken()` helpers.
- Handle concurrency so multiple simultaneous callers don't trigger parallel token fetches.

A typical `TokenManager` contract:

- getToken(): Promise<string> — returns an access token or throws if it cannot be acquired.
- clearToken(): void — removes cached token so next call will fetch a fresh one.
- (optional) setToken(token: string): void — set the token manually (useful for tests).

Security considerations

- Never log tokens or copy them into repo files.
- Use environment variables for client credentials required by the TokenManager.
- Consider rotating credentials and using short-lived tokens with refresh where possible.

## lib/fetch.ts behavior

`lib/fetch.ts` is a thin wrapper around the Fetch API with the following behavior:

1. Validates `BASE_URL` and `endpoint` inputs.
2. Uses `TokenManager.getToken()` to obtain an auth token and includes authentication headers (`x-auth-token` and `x-client-id`) on every request.
3. Calls fetch with the provided method, headers, and JSON body (if present). It sets `Content-Type: application/json` by default.
4. Passes `next` cache hints (`tags` and `revalidate`) through to Next.js so responses can benefit from ISR/caching.
5. If the response status is 401, it clears the token and attempts one retry with a fresh token. The retry uses an Authorization header with `Bearer ${token}`.
6. Returns an object of shape `{ status: number, data: any }`, where `data` is the parsed JSON body. If fetch fails it throws an error object.

Notes on the retry behavior:

- Only one retry is performed to avoid infinite loops.
- After a retry failure (still 401) the 401 status and parsed payload are returned for the caller to handle.

## Juz API usage

The app provides per-Juz pages under `app/juz/[id]/page.tsx` which call the backend to fetch verses or verse groups for a given Juz.

Typical endpoint pattern (example):

- GET `${BASE_URL}/juz/:id` — fetches paginated verses for the juz `:id`.

Caching and tags

- Use `tags` to associate responses with specific Juz so you can revalidate tags when content updates.
- Set `revalidate` to a reasonable TTL based on how often content changes.

## Random Verse API usage

The random-verse feature calls a backend endpoint that returns a single verse object.

Endpoint example: GET `${BASE_URL}/verse/random`

Caching

- For random verse, avoid server-side caching (set `revalidate: 0`) unless you intentionally want to show the same random verse for a period.

## Client vs Server usage notes

- Server components: Prefer calling `Fetch` from server components (within `app/`) for initial page rendering. This allows Next.js to cache responses and deliver pre-rendered HTML.
- Client components: Use client-side fetches only for UI interactions that require immediate updates (e.g., a "Next random" button). Ensure the UI displays loading and error states.

## Example: full flow for a Juz page

1. `app/juz/[id]/page.tsx` (server component) calls `Fetch` with `tags: ['juz-<id>']` and `revalidate: 60`.
2. `lib/fetch.ts` obtains a token from `TokenManager.getToken()`, sets authentication headers, and calls the backend.
3. If the API returns 200, the page renders the verses and the response is cached per the `revalidate` TTL and tags.
4. If the API returns 401, `lib/fetch.ts` clears the token, retries once, and returns the final status to the page to handle.
