import { TabelaProduto } from '@/components/TabelaProduto'

export default function PaginaProdutos() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-5">Lista de Produtos</h1>
      <TabelaProduto />
    </div>
  )
}

