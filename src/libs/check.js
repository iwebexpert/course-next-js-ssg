import { z, ZodError } from "zod"

export const schema = z.object({
  APP_DOMAIN: z.string(),
  API_DOMAIN: z.string(),
})

async function main() {
  schema.parse(process.env)
  console.log("✓ Все переменные найдены")
}

main().catch((e) => {
  if (e instanceof ZodError) {
    console.error(e.message)
  }
  process.error(1)
})
