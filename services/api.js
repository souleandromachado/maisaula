const API_URL = 'https://resumo-service-gz31.onrender.com'; // troque pelo IP local se testar no celular

// LISTAR RESUMOS
export async function fetchResumos() {
  const res = await fetch(`${API_URL}/resumos`);
  return res.json();
}

// CRIAR RESUMO
export async function createResumo({ tema }) {
  const res = await fetch(`${API_URL}/resumos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tema }),
  });

  if (!res.ok) {
    throw new Error('Erro ao criar resumo');
  }

  return res.json();
}

// EDITAR RESUMO
export async function updateResumo(_id, { titulo, conteudo, materia }) {
  const res = await fetch(`${API_URL}/resumos/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tema: titulo, resumo: conteudo, materia }),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar resumo');
  }

  return res.json();
}

// DELETAR RESUMO
export async function deleteResumo(_id) {
  const res = await fetch(`${API_URL}/resumos/${_id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Erro ao deletar resumo');
  }

  return res.json();
}
