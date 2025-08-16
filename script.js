// Abre o modal com os dados do serviço
function openForm(nome, preco, tempo) {
  const modal = document.getElementById("formModal");
  modal.classList.remove("hidden");
  
  document.getElementById("formTitle").innerText = "Agendar " + nome;
  document.getElementById("formPrice").innerText = "Preço: R$ " + preco + ",00";
  document.getElementById("formDuration").innerText = "Duração: " + tempo;

  // Salva os dados do serviço no dataset do modal para usar depois
  modal.dataset.service = JSON.stringify({ nome, preco, tempo });
}

// Fecha o modal
function closeForm() {
  const modal = document.getElementById("formModal");
  modal.classList.add("hidden");
}

// Configura flatpickr no campo de data
flatpickr("#data", {
  dateFormat: "Y-m-d",
  minDate: "today",
  locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      longhand: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    },
    months: {
      shorthand: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      longhand: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    },
  },
});

// Escuta o envio do formulário
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const modal = document.getElementById("formModal");
  const service = JSON.parse(modal.dataset.service);

  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  if (!nome || !telefone || !data || !horario) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const agendamento = {
    servico: service.nome,
    preco: service.preco,
    tempo: service.tempo,
    nome,
    telefone,
    data,
    horario,
    status: "Preenchido com sucesso"
  };

  let historico = JSON.parse(localStorage.getItem("historico")) || [];
  historico.push(agendamento);
  localStorage.setItem("historico", JSON.stringify(historico));

  alert("✅ Agendamento realizado com sucesso!");
  this.reset();
  closeForm();
});

}

<script>
  const container = document.getElementById("historicoContainer");
  const historico = JSON.parse(localStorage.getItem("historico")) || [];

  if (historico.length === 0) {
    container.innerHTML = "<p>Nenhum agendamento encontrado.</p>";
  } else {
    historico.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "historico-item";
      div.innerHTML =
        "<h3>" + item.servico + "</h3>" +
        "<p><strong>Cliente:</strong> " + item.nome + "</p>" +
        "<p><strong>Telefone:</strong> " + item.telefone + "</p>" +
        "<p><strong>Data:</strong> " + item.data + " às " + item.horario + "</p>" +
        "<p><strong>Status:</strong> ✅ " + item.status + "</p>" +
        "<div class='historico-buttons'>" +
          "<button onclick='cancelarAgendamento(" + index + ")'>Cancelar</button>" +
          "<button onclick='remarcarAgendamento()'>Remarcar</button>" +
        "</div>";
      container.appendChild(div);
    });
  }

  // Função cancelar
  function cancelarAgendamento(index) {
    historico[index].status = "❌ Cancelado";
    localStorage.setItem("historico", JSON.stringify(historico));
    alert("❌ Agendamento cancelado!");
    location.reload(); // Atualiza a página para mostrar o novo status
  }

  // Função remarcar
  function remarcarAgendamento() {
    alert("🔄 Redirecionando para remarcar...");
    window.location.href = "index.html"; // Vai pro início
  }
</script>

