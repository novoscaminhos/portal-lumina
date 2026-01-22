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

  const registro = data.tokens.find(t => t.token === tokenDigitado);

  if (!registro) {
    mensagem.textContent = "Chave inválida ou não reconhecida.";
    return;
  }

  // Validação de expiração
  if (registro.expira) {
    const hoje = new Date();
    const exp = new Date(registro.expira);
    if (hoje > exp) {
      mensagem.textContent = "Sua chave expirou.";
      return;
    }
  }

  // Feedback visual
  mensagem.innerHTML = `✨ Olá, <strong>${registro.nome}</strong>.<br>Preparando seu acesso...`;

  // 🔐 Concessão de acesso FULL
  localStorage.setItem("lumina_access_type", "full");

  // Opcional: identidade local (não é segurança)
  localStorage.setItem("lumina_user_name", registro.nome);

  // Redireciona para o ritual
  setTimeout(() => {
    window.location.href = "./splash.html";
  }, 1500);
}