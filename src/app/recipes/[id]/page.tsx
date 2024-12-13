import RecipeCard from "@/components/recipes/RecipeCard"
import { fetchRecipeById, fetchRecipes } from "@/server/api/recipes"
import { Metadata } from "next"
import Link from "next/link"

export async function generateStaticParams() {
  const items: Recipe[] = await fetchRecipes()

  return items.map((recipe) => ({
    id: recipe.id.toString(),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const id = (await params).id
  const recipe: Recipe = await fetchRecipeById(id)
  return {
    title: recipe?.title ?? "404: Страница не найдена",
  }
}

export default async function RecipesPage({ params }: { params: { id: string } }) {
  const recipe: Recipe = await fetchRecipeById(params.id)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">{recipe.title}</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RecipeCard
          id={recipe.id}
          title={recipe.title}
          description={recipe.description}
          image={recipe.imageUrl}
        />
      </ul>
      <div className="mt-8">
        <Link
          href="/recipes"
          className="text-blue-500 hover:underline"
        >
          Посмотреть все рецепты
        </Link>
      </div>
    </div>
  )
}
