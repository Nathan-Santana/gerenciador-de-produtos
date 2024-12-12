import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-center">Controle de Produtos</h1>
      <p className="text-xl mb-8">Por Nathan Santana</p>
      <Link href="/admin/produtos">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Ver Produtos
        </Button>
      </Link>
    </div>
  )
}

