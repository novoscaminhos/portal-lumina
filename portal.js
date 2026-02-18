async function validarToken() {
  const input = document.getElementById("tokenInput");
  const mensagem = document.getElementById("mensagem");

  const tokenDigitado = input.value.trim().toUpperCase();

  if (!tokenDigitado) {
    mensagem.textContent = "Informe sua chave Lumina.";
    return;
  }

  let data;
  try {
    const res = await fetch("./tokens.json");
    data = await res.json();
  } catch (e) {
    mensagem.textContent = "Erro ao validar acesso.";
    return;
  }

  // O tokens.json está no formato { "TOKEN": { "nome": "Nome" } }
  const registro = data[tokenDigitado];

  if (!registro) {
    mensagem.textContent = "Chave inválida ou não reconhecida.";
    return;
  }

  // Validação de expiração (se existir no registro)
  if (registro.expira) {
    const hoje = new Date();
    const exp = new Date(registro.expira);
    if (hoje > exp) {
      mensagem.textContent = "Sua chave expirou.";
      return;
    }
  }

  // Feedback visual
  mensagem.classList.remove("text-red-500");
  mensagem.classList.add("text-green-500");
  mensagem.innerHTML = `✨ Olá, <strong>${registro.nome}</strong>.<br>Preparando seu acesso...`;

  // 🔐 Gravação definitiva no dispositivo (LocalStorage)
  localStorage.setItem("lumina_access_type", "full");
  localStorage.setItem("lumina_token", tokenDigitado);
  localStorage.setItem("lumina_user_name", registro.nome);

  // Redireciona para a etapa de validação/termos
  setTimeout(() => {
    window.location.href = "./acesso.html";
  }, 1500);
}

// Função utilitária para limpar acesso (pode ser chamada via console se necessário)
function limparAcessoGeral() {
  localStorage.removeItem("lumina_token");
  localStorage.removeItem("lumina_user_name");
  localStorage.removeItem("lumina_access_type");
  localStorage.removeItem("lumina_terms_accepted");
  localStorage.removeItem("lumina_trial_consumed");
  alert("Acesso limpo com sucesso.");
  window.location.href = "./index.html";
}
