document.addEventListener('DOMContentLoaded', function() {
    // Abrir o popup
    document.getElementById('openPopupBtn').addEventListener('click', function() {
        document.getElementById('popupForm').style.display = 'flex';
    });

    // Fechar o popup
    document.querySelector('.closeBtn').addEventListener('click', function() {
        document.getElementById('popupForm').style.display = 'none';
    });

    // Enviar o formulário e cadastrar paciente
    document.getElementById('cadastroPacienteForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        // Captura os valores do formulário
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const prioridade = document.getElementById('prioridade').value;

        // Verifica se todos os campos estão preenchidos
        if (nome && idade && prioridade) {
            // Adiciona o paciente à lista
            adicionarPacienteNaLista(nome, idade, prioridade);

            // Limpa os campos do formulário após o cadastro
            document.getElementById('cadastroPacienteForm').reset();

            // Fechar o popup após o cadastro
            document.getElementById('popupForm').style.display = 'none';
        } else {
            alert("Preencha todos os campos!");
        }
    });

    // Função para adicionar paciente na lista de pacientes
    function adicionarPacienteNaLista(nome, idade, prioridade) {
        const listaPacientes = document.getElementById('listaPacientes');

        // Criar um novo item de lista (li) para o paciente
        const novoPaciente = document.createElement('li');
        novoPaciente.classList.add('paciente-item');

        // Adiciona classes de cor conforme prioridade
        if (prioridade === "Baixa") {
            novoPaciente.classList.add('prioridade-baixa');
        } else if (prioridade === "Média") {
            novoPaciente.classList.add('prioridade-media');
        } else if (prioridade === "Alta") {
            novoPaciente.classList.add('prioridade-alta');
        }

        // Define o conteúdo do paciente
        novoPaciente.textContent = `Nome: ${nome}, Idade: ${idade}, Prioridade: ${prioridade}`;

        // Adicionar o novo paciente à lista de pacientes
        listaPacientes.appendChild(novoPaciente);
    }

    // Abrir e fechar a barra lateral
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');

    menuIcon.addEventListener('click', function () {
        sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
    });
});

// CURD
const tbody = document.querySelector("tbody");
const modalContainer = document.querySelector(".modal-container2");
const form = document.querySelector("form");
const btnSalvar = document.getElementById("btnSalvar");

let editIndex = null; // Armazena o índice da linha que está sendo editada

// Abre o modal para adicionar ou editar um monitor
function openModal2() {
    modalContainer.classList.add("show"); // Exibe a modal
    form.reset();
    editIndex = null;
}

function closeModal() {
    modalContainer.classList.remove("show"); // Oculta a modal
}
// Adiciona ou atualiza monitor na tabela
btnSalvar.addEventListener("click", function(event) {
    event.preventDefault();
    const nome = document.getElementById("m-nome").value;
    const email = document.getElementById("m-Email").value;
    const cargo = document.getElementById("m-cargo").value;

    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !cargo) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (editIndex === null) {
        // Adiciona um novo monitor
        addMonitor(nome, email, cargo);
    } else {
        // Edita monitor existente
        updateMonitor(editIndex, nome, email, cargo);
    }

    closeModal();
});

// Função para adicionar um monitor à tabela
function addMonitor(nome, email, cargo) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${nome}</td>
    <td>${email}</td>
    <td>${cargo}</td>
    <td class="acao"><button class="btn-editar" onclick="editMonitor(this)">Editar</button></td>
    <td class="acao"><button class="btn-excluir" onclick="deleteMonitor(this)">Excluir</button></td>
`;
    tbody.appendChild(row);
}

// Função para editar um monitor
function editMonitor(button) {
    const row = button.closest("tr");
    editIndex = Array.from(tbody.children).indexOf(row);

    const nome = row.children[0].innerText;
    const email = row.children[1].innerText;
    const cargo = row.children[2].innerText;

    document.getElementById("m-nome").value = nome;
    document.getElementById("m-Email").value = email;
    document.getElementById("m-cargo").value = cargo;

    openModal2();
}

// Função para atualizar um monitor
function updateMonitor(index, nome, email, cargo) {
    const row = tbody.children[index];
    row.children[0].innerText = nome;
    row.children[1].innerText = email;
    row.children[2].innerText = cargo;
}

// Função para excluir um monitor
function deleteMonitor(button) {
    const row = button.closest("tr");
    row.remove();
}

// Fecha o modal quando o usuário clica fora dele
modalContainer.addEventListener("click", function(event) {
    if (event.target === modalContainer) {
        closeModal();
    }
});