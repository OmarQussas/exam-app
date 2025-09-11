import type { User } from "../../types/user";
import type { VerifyResetCodePayload } from "../../types/next-auth";

const baseAPI = process.env.BASE_API;

/**
 * Logs the user in using their email and password.
 *
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 *
 * @returns {Promise<User>} The user object if the login is successful, or
 *     throws an error if the login fails.
 */

export async function loginUser(email: string, password: string) {
  try {
    // Api call for signin
    const res = await fetch(`${baseAPI}/api/v1/auth/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Show error

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || "Invalid credentials";
      throw new Error(message);
    }

    //  accept the returned user data then return it
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Registers a new user with the Elevate API.
 *
 * @param {User} user The user details to register.
 *
 * @returns {Promise<User>} The user object if the registration is successful, or
 *     throws an error if the registration fails.
 */
export async function registerUser(user: User) {
  try {
    // Api call for signup
    const res = await fetch(`https://exam.elevateegy.com/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    // Show error
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      const message = errorData?.message || "Registration failed";
      throw new Error(message);
    }

    return await res.json();
  } catch (error) {
    // Optionally log the error or do extra processing here
    throw new Error(
      error instanceof Error
        ? error.message
        : "Registration failed unexpectedly"
    );
  }
}

interface ForgotPasswordPayload {
  email: string;
}

/**
 * Sends a request to the Elevate API to initiate the password reset process
 * for a given email.
 *
 * @param {ForgotPasswordPayload} data The email to send the password reset
 *     instructions to.
 *
 * @returns {Promise<{ message: string }>} A promise that resolves to an object
 *     containing a message from the API. If the request was successful, the
 *     message will be "Password reset email sent successfully". If the request
 *     failed, the message will be an error message.
 */
export const forgotPassword = async (data: ForgotPasswordPayload) => {
  // Make the API request

  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/auth/forgotPassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // now data is { email: string }
    }
  );

  // check the content type is json

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let errorMessage = "Failed request";
    if (contentType?.includes("application/json")) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } else {
      const text = await response.text();
      console.error("HTML response:", text);
    }
    throw new Error(errorMessage);
  }

  if (contentType?.includes("application/json")) {
    return response.json();
  } else {
    const text = await response.text();
    console.warn("Non-JSON response:", text);
    return { message: text };
  }
};

/**
 * Verifies a password reset code sent to the user's email address.
 *
 * @param {VerifyResetCodePayload} data An object containing the email address
 *     and the password reset code received by the user.
 *
 * @returns {Promise<{ message: string; }>} A promise that resolves to an object
 *     containing a message from the API. If the request was successful, the
 *     message will be "Password reset code verified successfully". If the
 *     request failed, the message will be an error message.
 */
export const verifyResetCode = async (data: VerifyResetCodePayload) => {
  console.log(data);
  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/auth/verifyResetCode`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  console.log("response", response);

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let errorMessage = "Failed to verify reset code";
    if (contentType?.includes("application/json")) {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } else {
      const text = await response.text();
      console.error("HTML response:", text);
    }
    throw new Error(errorMessage);
  }

  if (contentType?.includes("application/json")) {
    return response.json();
  } else {
    const text = await response.text();
    return { message: text };
  }
};
/**
 * Resets the password for the user whose email is stored in local storage.
 *
 * @param {string} newPassword The new password to set for the user.
 *
 * @returns {Promise<{ message: string }>} A promise that resolves to an object
 *     containing a message from the API. If the request was successful, the
 *     message will be "Password changed successfully". If the request failed,
 *     the message will be an error message.
 */
export const resetPassword = async (newPassword: string) => {
  // get the email from the local storage
  const email = localStorage.getItem("email");
  if (!email) throw new Error("No email found");
  // make the api call, get the email from local storage for the backend
  // and the password from the user input
  try {
    const response = await fetch("`${baseAPI}`/api/v1/auth/resetPassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });
    // check the content type
    const contentType = response.headers.get("content-type") || "";
    // check if the request was successful
    if (!response.ok) {
      const errorMessage = contentType.includes("application/json")
        ? (await response.json()).message || "Failed to reset password"
        : "Failed to reset password";

      throw new Error(errorMessage);
    }

    // make sure it's json
    return contentType.includes("application/json")
      ? await response.json()
      : { message: await response.text() };
  } catch (error: any) {
    console.error("Reset password error:", error);
    throw new Error(error.message || "Unexpected error occurred");
  }
};
