
export async function useProduct(slug: string) {
  const result = await useFetch(`/api/product/${slug}`);

  return {
    ...result,
  }
}

export default useProduct
