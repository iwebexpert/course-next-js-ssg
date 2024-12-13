export async function fetchRecipes() {
  const res = await fetch(`${process.env.API_DOMAIN}/api/recipes`)
  if (!res.ok) {
    throw new Error("404")
  }

  return await res.json()
}

export async function fetchRecipeById(id: string) {
  const res = await fetch(`${process.env.API_DOMAIN}/api/recipes/${id}`)
  if (!res.ok) {
    throw new Error("404")
  }

  return await res.json()
}
