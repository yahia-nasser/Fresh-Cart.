export default async function getSingleSubCategory(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`
  );
  const { data } = await response.json();
  return data;
}
