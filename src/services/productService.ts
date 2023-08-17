const baseUrl = "http://localhost:3000/";

export async function getProducts(category: any) {
  const response = await fetch(baseUrl + "products?category=" + category);
  if (response.ok) return response.json();
  throw response;
}

export async function getProduct(id: string) {
  const response = await fetch(baseUrl + "products/" + id);
  if (response.ok) return response.json();
  throw response;
}
