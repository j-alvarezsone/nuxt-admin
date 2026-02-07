interface TryPromiseError {
	status?: number;
	message: string;
	error: unknown;
}

interface Options<T> {
	onSuccess: () => Promise<T>;
	onError?: (err: TryPromiseError) => T;
	failureMessage?: string;
}

// const FALL_BACK_STATUS_CODE = 500;

/**
 * Wraps an asynchronous function and provides structured error handling.
 *
 * @param options - Configuration object
 * @param options.onSuccess - The asynchronous function to execute
 * @param options.onError - Optional callback to handle errors and return a fallback value
 * @param options.failureMessage - Optional custom message for thrown errors
 * @returns The result of the onSuccess function if it resolves successfully, or the result of onError if provided
 * @throws A new Error with the provided message if no onError handler is provided
 */

export async function tryPromise<T>({ onSuccess, onError, failureMessage }: Options<T>): Promise<T> {
	try {
		return await onSuccess();
	} catch (e) {
		const { status, message } = extractErrorInfo(e, "An unexpected error occurred");

		if (onError) return onError({ status, message, error: e });

		throw new Error(failureMessage, { cause: e });
	}
}

/**
 * Extracts status and message from various error object shapes (FetchError, HTTPError, etc).
 *
 * @param error - The error object thrown by an async operation
 * @param fallbackMessage - The message to use if the error does not provide one
 * @returns An object with status and message properties
 */
function extractErrorInfo(error: unknown, fallbackMessage: string) {
	const errorObj = error as Record<string, unknown>;
	const responseObj = errorObj?.response as Record<string, unknown> | undefined;

	const status =
		(typeof errorObj?.statusCode === 'number' ? errorObj.statusCode : undefined) ||
		(typeof errorObj?.status === 'number' ? errorObj.status : undefined) ||
		(typeof responseObj?.status === 'number' ? responseObj.status : undefined);

	const message =
		(typeof errorObj?.message === 'string' ? errorObj.message : undefined) ||
		fallbackMessage;

	return { status, message };
}
