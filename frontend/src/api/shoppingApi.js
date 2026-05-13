const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.detail || errorData?.error || "API request failed";
    throw new Error(message);
  }

  return response.json();
}

export async function getShoppingItems() {
  const response = await fetch(`${API_BASE_URL}/shopping/items`);
  return handleResponse(response);
}

export async function getShoppingCategories() {
  const response = await fetch(`${API_BASE_URL}/shopping/categories`);
  return handleResponse(response);
}

export async function createShoppingItem(item) {
  const response = await fetch(`${API_BASE_URL}/shopping/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  return handleResponse(response);
}

export async function updateShoppingItem(itemId, updateData) {
  const response = await fetch(`${API_BASE_URL}/shopping/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  return handleResponse(response);
}

export async function deleteShoppingItem(itemId) {
  const response = await fetch(`${API_BASE_URL}/shopping/items/${itemId}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}
