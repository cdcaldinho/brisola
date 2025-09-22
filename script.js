const btnAdd = document.getElementById("btnAdd");
const inputTarefa = document.getElementById("novaTarefa");
const colunas = document.querySelectorAll(".coluna");
const listaCriar = document.getElementById("listaCriar");

btnAdd.addEventListener("click", () => {
  const texto = inputTarefa.value.trim();
  if (texto !== "") {
    criarTarefa(texto);
    inputTarefa.value = "";
    atualizarContadores();
  }
});

function criarTarefa(texto) {
  const tarefa = document.createElement("div");
  tarefa.classList.add("tarefa");
  tarefa.textContent = texto;
  tarefa.draggable = true;


  tarefa.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", texto);
    const id = Date.now().toString(); 
    e.dataTransfer.setData("id", id);
    tarefa.setAttribute("data-id", id);
  });


  listaCriar.appendChild(tarefa);
  atualizarContadores();
}

function atualizarContadores() {
  document.querySelectorAll(".coluna").forEach(coluna => {
    const lista = coluna.querySelector(".lista");
    const contador = coluna.querySelector(".contador");
    if (lista && contador) {
      const total = lista.querySelectorAll(".tarefa").length;
      contador.textContent = total + (total === 1 ? " tarefa" : " tarefas");
    }
  });
}


colunas.forEach(coluna => {
  const lista = coluna.querySelector(".lista");

  coluna.addEventListener("dragover", (e) => {
    e.preventDefault();
    coluna.classList.add("dragover");
  });

  coluna.addEventListener("dragleave", () => {
    coluna.classList.remove("dragover");
  });

  coluna.addEventListener("drop", (e) => {
    e.preventDefault();
    coluna.classList.remove("dragover");

    const texto = e.dataTransfer.getData("text/plain");
    const id = e.dataTransfer.getData("id");
    let tarefa = document.querySelector(`[data-id="${id}"]`);

   
    if (tarefa) {
      lista.appendChild(tarefa);
    } else {
   
      const nova = document.createElement("div");
      nova.classList.add("tarefa");
      nova.textContent = texto;
      lista.appendChild(nova);
    }

    atualizarContadores();
  });
});
