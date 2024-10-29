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
import { db, auth } from './Firebase.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Seleciona elementos HTML
const tbody = document.querySelector("tbody");
const modalContainer = document.querySelector(".modal-container2");
const form = document.querySelector("form");
const btnSalvar = document.getElementById("btnSalvar");

let editId = null;  // Guarda o ID do monitor para edição

// Abrir Modal
function openModal2() {
    console.log("Abrindo modal...");
    modalContainer.classList.add("show");
    form.reset();
    editId = null;
}

function closeModal() {
    console.log("Fechando modal...");
    modalContainer.classList.remove("show");
}
// Evento de Salvamento (Adicionar/Editar monitor)
btnSalvar.addEventListener("click", async function(event) {
    event.preventDefault();

    // Coleta dados do formulário
    const nome = document.getElementById("m-nome").value;
    const email = document.getElementById("m-Email").value;
    const cargo = document.getElementById("m-cargo").value;
    const senha = document.getElementById("m-senha").value;
    const confirmaSenha = document.getElementById("m-confirmaSenha").value;

    if (!nome || !email || !cargo || !senha || !confirmaSenha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    try {
        if (editId === null) {
            // Cadastrar novo monitor e usuário com autenticação
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const userId = userCredential.user.uid;
            await addDoc(collection(db, "monitores"), { nome, email, cargo, userId });
        } else {
            // Atualizar monitor existente no Firestore
            const monitorRef = doc(db, "monitores", editId);
            await updateDoc(monitorRef, { nome, email, cargo });
        }
        
        loadMonitors();  // Carrega lista de monitores
        closeModal();    // Fecha modal
    } catch (error) {
        console.error("Erro ao salvar monitor: ", error.message);
        alert("Erro ao salvar monitor: " + error.message);
    }
});

const app = initializeApp(firebaseConfig);
console.log("Firebase inicializado:", app);

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM totalmente carregado e analisado");
    loadMonitors(); // Carrega os monitores quando o DOM está pronto
});

// Função para Carregar Monitores da Firestore
async function loadMonitors() {
    tbody.innerHTML = "";
    const snapshot = await getDocs(collection(db, "monitores"));
    snapshot.forEach(doc => {
        const monitor = doc.data();
        addMonitorToTable(doc.id, monitor.nome, monitor.email, monitor.cargo);
    });
}

// Função para Adicionar Monitor na Tabela HTML
function addMonitorToTable(id, nome, email, cargo) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${cargo}</td>
        <td class="acao"><button class="btn-editar" onclick="editMonitor('${id}')">Editar</button></td>
        <td class="acao"><button class="btn-excluir" onclick="deleteMonitor('${id}')">Excluir</button></td>
    `;
    tbody.appendChild(row);
}

// Editar Monitor
window.editMonitor = async function(id) {
    editId = id;
    const docSnap = await getDoc(doc(db, "monitores", id));
    if (docSnap.exists()) {
        const monitor = docSnap.data();
        document.getElementById("m-nome").value = monitor.nome;
        document.getElementById("m-Email").value = monitor.email;
        document.getElementById("m-cargo").value = monitor.cargo;
        openModal2();
    } else {
        console.log("Documento não encontrado!");
    }
};

// Excluir Monitor
window.deleteMonitor = async function(id) {
    await deleteDoc(doc(db, "monitores", id));
    loadMonitors();
};

// Fecha modal ao clicar fora dele
modalContainer.addEventListener("click", function(event) {
    if (event.target === modalContainer) {
        closeModal();
    }
});

// Carregar Monitores ao Carregar a Página
window.onload = loadMonitors;