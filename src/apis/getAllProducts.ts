export default async function getAllProducts() {
  const response = await fetch("http://localhost:3000/api/users", {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
}
