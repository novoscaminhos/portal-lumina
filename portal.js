async function validarToken() {
  const input = document.getElementById("tokenInput");
  const mensagem = document.getElementById("mensagem");

  const tokenDigitado = input.value.trim();

  if (!tokenDigitado) {
    mensagem.textContent = "Informe sua chave Lumina.";
    return;
  }

  const res = await fetch("./tokens.json");
  const data = await res.json();

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

  // Mensagem personalizada
  mensagem.innerHTML = `✨ Olá, <strong>${registro.nome}</strong>.<br>Preparando seu acesso...`;

  // Mensagem personalizada
  mensagem.innerHTML = `✨ Olá, <strong>${registro.nome}</strong>.<br>Preparando seu acesso...`;

  // 🔐 Segurança Nível 1 — salvar no dispositivo
  localStorage.setItem("lumina_token", registro.token);
  localStorage.setItem("lumina_nome", registro.nome);

  setTimeout(() => {
    const destino = "https://lumina-1-5-downgrade-277430647911.us-west1.run.app";
    window.location.href = `${destino}?token=${encodeURIComponent(registro.token)}&nome=${encodeURIComponent(registro.nome)}`;
  }, 1500);

