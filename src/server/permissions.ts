"use server";

export async function fetchPermissions() {
  try {
    const response = await fetch("http://127.0.0.1:8000/permissions/generate", {
      method: "POST",
    });
    return await response.json();
  } catch (error) {
    console.log("Error fetchPermissions");
    console.log(error);
  }
}
