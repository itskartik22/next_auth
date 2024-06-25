/**
 * An array of routes that are accessible to any users
 * @type {string}
 */
export const publicRoutes = [
    "/",
];

/**
 * An array of routes that are used for authentication
 * These routes redirect for logged in users to /setting
 * @type {string}
 */

export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * The prefix for the api authentication routes
 * Routes that start with this prefix are used for API
 * authentication process
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The simple redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
