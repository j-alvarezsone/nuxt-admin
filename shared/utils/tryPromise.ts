/**
 * Wraps an asynchronous function and maps any thrown exceptions to a new Error with a custom message.
 *
 * @param fn - The asynchronous function to execute.
 * @param failureMessage - The custom message for the new Error.
 * @returns The result of the asynchronous function if it resolves successfully.
 * @throws A new Error with the provided message if the original function throws an error.
 */
export async function tryPromise<T>(fn: () => Promise<T>, failureMessage: string): Promise<T> {
	try {
		return await fn();
	} catch (e) {
		throw new Error(failureMessage, { cause: e });
	}
}
