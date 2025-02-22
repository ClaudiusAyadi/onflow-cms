// import {
// 	createKindeServerClient,
// 	GrantType,
// 	type SessionManager,
// 	type UserType,
// } from '@kinde-oss/kinde-typescript-sdk';
// import { createMiddleware } from 'hono/factory';
// import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
// import type { Context } from 'hono';

// const env = process.env;

// // Client for authorization code flow
// export const kindeClient = createKindeServerClient(
// 	GrantType.AUTHORIZATION_CODE,
// 	{
// 		authDomain: env.KINDE_DOMAIN!,
// 		clientId: env.KINDE_CLIENT_ID!,
// 		clientSecret: env.KINDE_CLIENT_SECRET!,
// 		redirectURL: env.KINDE_REDIRECT_URI!,
// 		logoutRedirectURL: env.KINDE_LOGOUT_REDIRECT_URI!,
// 	}
// );

// let store: Record<string, unknown> = {};

// export const sessionManager = (c: Context): SessionManager => ({
// 	async getSessionItem(key: string) {
// 		const result = getCookie(c, key);
// 		return result;
// 	},
// 	async setSessionItem(key: string, value: unknown) {
// 		const cookieOptions = {
// 			httpOnly: true,
// 			secure: true,
// 			sameSite: 'Lax',
// 		} as const;
// 		if (typeof value === 'string') {
// 			setCookie(c, key, value, cookieOptions);
// 		} else {
// 			setCookie(c, key, JSON.stringify(value), cookieOptions);
// 		}
// 	},
// 	async removeSessionItem(key: string) {
// 		deleteCookie(c, key);
// 	},
// 	async destroySession() {
// 		['id_token', 'access_token', 'user', 'refresh_token'].forEach(key => {
// 			deleteCookie(c, key);
// 		});
// 	},
// });

// type Env = {
// 	Variables: {
// 		user: UserType;
// 	};
// };

// export const getUser = createMiddleware<Env>(async (c, next) => {
// 	try {
// 		const manager = sessionManager(c);
// 		const isAuthenticated = await kindeClient.isAuthenticated(manager);
// 		if (!isAuthenticated) {
// 			return c.json({ isAuthenticated, error: 'Unauthorized' }, 401);
// 		}
// 		const user = await kindeClient.getUserProfile(manager);
// 		c.set('user', user);
// 		await next();
// 	} catch (e) {
// 		console.error(e);
// 		return c.json({ error: 'Unauthorized' }, 401);
// 	}
// });
