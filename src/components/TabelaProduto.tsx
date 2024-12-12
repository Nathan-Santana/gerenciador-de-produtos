'use client'

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidadeEmEstoque: number;
}

export function TabelaProduto() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('/api/produtos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Error fetching produtos:', error);
        setError('Erro ao carregar produtos. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const diminuirEstoque = (produtoId: number) => {
    setProdutos(produtosAtual =>
      produtosAtual.map(produto =>
        produto.id === produtoId && produto.quantidadeEmEstoque > 0
          ? { ...produto, quantidadeEmEstoque: produto.quantidadeEmEstoque - 1 }
          : produto
      )
    );
  };

  const aumentarEstoque = (produtoId: number) => {
    setProdutos(produtosAtual =>
      produtosAtual.map(produto =>
        produto.id === produtoId
          ? { ...produto, quantidadeEmEstoque: produto.quantidadeEmEstoque + 1 }
          : produto
      )
    );
  };

  const getMensagemEstoque = (quantidade: number) => {
    if (quantidade < 5) return { mensagem: 'ESTOQUE INSUFICIENTE', cor: 'bg-yellow-500' };
    if (quantidade >= 20) return { mensagem: 'ESTOQUE SUFICIENTE', cor: 'bg-green-500' };
    return { mensagem: '', cor: '' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-gray-600">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Tabela */}
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Nome</th>
            <th className="border px-4 py-2 text-left">Preço</th>
            <th className="border px-4 py-2 text-left">Quantidade em Estoque</th>
            <th className="border px-4 py-2 text-left">Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => {
            const { mensagem, cor } = getMensagemEstoque(produto.quantidadeEmEstoque);

            return (
              <tr
                key={produto.id}
                className={
                  produto.quantidadeEmEstoque < 5
                    ? 'bg-yellow-100'
                    : produto.quantidadeEmEstoque >= 20
                    ? 'bg-green-100'
                    : ''
                }
              >
                <td className="border px-4 py-2">{produto.nome}</td>
                <td className="border px-4 py-2">
                  {produto.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
                <td className="border px-4 py-2">{produto.quantidadeEmEstoque}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <Button
                    onClick={() => diminuirEstoque(produto.id)}
                    disabled={produto.quantidadeEmEstoque === 0}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Diminuir Estoque
                  </Button>
                  <Button
                    onClick={() => aumentarEstoque(produto.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Aumentar Estoque
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6">
        {produtos.map((produto) => {
          const { mensagem, cor } = getMensagemEstoque(produto.quantidadeEmEstoque);
          return mensagem ? (
            <div
              key={produto.id}
              className={`p-4 text-white rounded-lg mb-2 ${cor}`}
            >
              {produto.nome}: {mensagem}
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}
