const API_URL = 'http://SEU_IP_LOCAL:3000'; // troque pelo IP local se testar no celular

// LISTAR RESUMOS
export async function fetchResumos() {
  const res = await fetch(`${API_URL}/resumos`);
  return res.json();
}

// CRIAR RESUMO
export async function createResumo({ titulo, conteudo, materia }) {
  const res = await fetch(`${API_URL}/resumos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, conteudo, materia }),
  });

  if (!res.ok) {
    throw new Error('Erro ao criar resumo');
  }

  return res.json();
}

// EDITAR RESUMO
export async function updateResumo(id, { titulo, conteudo, materia }) {
  const res = await fetch(`${API_URL}/resumos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, conteudo, materia }),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar resumo');
  }

  return res.json();
}

// DELETAR RESUMO
export async function deleteResumo(id) {
  const res = await fetch(`${API_URL}/resumos/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Erro ao deletar resumo');
  }

  return res.json();
}
