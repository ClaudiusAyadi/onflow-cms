import { hash, verify, Algorithm, Version } from '@node-rs/argon2';

// Improved defaults for Argon2
const MEMORY_COST = 65536; // 64 MiB
const TIME_COST = 3;
const OUTPUT_LENGTH = 32; // 32 bytes
const PARALLELISM = 2; // Use 2 threads by default

interface HashOptions {
	memoryCost?: number;
	timeCost?: number;
	outputLen?: number;
	parallelism?: number;
	algorithm?: Algorithm;
	version?: Version;
	secret?: Buffer;
}

/**
 * Hash a password using Argon2
 * @param password The plain text password to hash
 * @param options Optional parameters to customize the hashing process
 * @returns A promise that resolves to the hashed password
 */
export async function hasher(
	password: string,
	options: HashOptions = {}
): Promise<string> {
	const hashOptions = {
		memoryCost: options.memoryCost ?? MEMORY_COST,
		timeCost: options.timeCost ?? TIME_COST,
		outputLen: options.outputLen ?? OUTPUT_LENGTH,
		parallelism: options.parallelism ?? PARALLELISM,
		algorithm: options.algorithm,
		version: options.version,
		secret: options.secret,
	};

	return hash(password, hashOptions);
}

/**
 * Verify a password against a hash
 * @param hash The stored hash to compare against
 * @param password The plain text password to verify
 * @returns A promise that resolves to true if the password matches, false otherwise
 */
export async function verifier(
	hash: string,
	password: string
): Promise<boolean> {
	return verify(hash, password);
}
