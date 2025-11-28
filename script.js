// Produtos disponíveis
const produtos = [
  { nome: "Atletico Mineiro", preco: 150.00, imagem: "assets/atletico.webp" },
  { nome: "Corinthians", preco: 150.00, imagem: "assets/corinthians.webp" },
  { nome: "Flamengo", preco: 150.00, imagem: "assets/flamengo.webp" },
  { nome: "Cruzeiro", preco: 150.00, imagem: "assets/cruzeiro.webp" },
  { nome: "Palmeiras", preco: 150.00, imagem: "assets/palmeiras.webp" },
  { nome: "Santos", preco: 129.90, imagem: "assets/santos.webp" },
  { nome: "inter-Miami", preco: 150.00, imagem: "assets/inter.webp" },
  { nome: "Atletico mineiro Camisa 3", preco: 150.00, imagem: "assets/galo.webp" },
  { nome: "Bayer", preco: 129.90, imagem: "assets/bayer.webp" },
 
];

const carrinho = [];


function mostrarPagina(pagina) {
  document.querySelectorAll('.pagina').forEach(p => p.classList.remove('ativa'));
  
  document.getElementById(pagina).classList.add('ativa');
  
  
  atualizarNavegacao(pagina);
  
  if (pagina === 'produtos') {
    renderizarProdutos(produtos);
  }
  
  
  if (pagina === 'carrinho') {
    atualizarCarrinho();
  }
  

  if (pagina === 'cadastro') {
    atualizarResumoPedido();
  }
}


function atualizarNavegacao(paginaAtiva) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes(paginaAtiva)) {
      link.classList.add('active');
    }
  });
}


function renderizarProdutos(lista) {
  const container = document.getElementById("produtosContainer");
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h4>Nenhum produto encontrado</h4>
        <p>Tente buscar com outros termos.</p>
      </div>
    `;
    return;
  }

  lista.map((produto, index) => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card h-100 p-3 shadow-sm";

    card.innerHTML = `
        <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}" style="height: 250px; object-fit: cover;">
        
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${produto.nome}</h5> 
            
            <p class="card-text mt-2 mb-3">
                <span class="fw-bold text-success">R$ ${produto.preco.toFixed(2)}</span>
            </p>
            
            <button class="btn btn-primary w-100 mt-auto" onclick="adicionarAoCarrinho(${index})">
                Adicionar ao Carrinho
            </button>
        </div>
    `;

    col.appendChild(card);
    container.appendChild(col);
  });
}


function adicionarAoCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarBadgeCarrinho();
  
  
  const btn = event.target;
  const originalText = btn.textContent;
  btn.textContent = "✓ Adicionado!";
  btn.classList.remove('btn-primary');
  btn.classList.add('btn-success');
  
  setTimeout(() => {
    btn.textContent = originalText;
    btn.classList.remove('btn-success');
    btn.classList.add('btn-primary');
  }, 1500);
}


function atualizarBadgeCarrinho() {
  const badge = document.getElementById("badgeCarrinho");
  if (carrinho.length > 0) {
    badge.textContent = carrinho.length;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}


function atualizarCarrinho() {
  const container = document.getElementById("conteudoCarrinho");

  if (carrinho.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <h4 class="text-muted">Seu carrinho está vazio</h4>
        <p class="text-muted mb-4">Adicione alguns produtos para continuar.</p>
        <button class="btn btn-primary" onclick="mostrarPagina('produtos')">
          Continuar Comprando
        </button>
      </div>
    `;
    return;
  }

  let total = 0;
  let html = `
    <div class="card shadow-lg p-3 mx-auto" style="max-width: 600px;">
      <div class="card-body">
        <ul class="list-group list-group-flush mb-4">
  `;

  carrinho.forEach((item, index) => {
    html += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3 rounded">
          <span class="fw-bold">${item.nome}</span>
        </div>
        <div class="d-flex align-items-center">
          <span class="badge bg-primary me-3">R$ ${item.preco.toFixed(2)}</span>
          <button class="btn btn-outline-danger btn-sm" onclick="removerDoCarrinho(${index})">
            × Remover
          </button>
        </div>
      </li>
    `;
    total += item.preco;
  });

  html += `
        </ul>
        
        <div class="p-3 bg-light rounded">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">Total do Pedido:</h5>
            <h4 class="mb-0 text-success">R$ ${total.toFixed(2)}</h4>
          </div>
          
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-outline-secondary me-md-2" onclick="mostrarPagina('produtos')">
              Continuar Comprando
            </button>
            <button class="btn btn-danger me-md-2" onclick="limparCarrinho()">
              Limpar Carrinho
            </button>
            <button class="btn btn-success" onclick="mostrarPagina('cadastro')">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
  atualizarBadgeCarrinho();
}


function removerDoCarrinho(index) {
  if (confirm('Tem certeza que deseja remover este item do carrinho?')) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
  }
}


function limparCarrinho() {
  if (carrinho.length === 0) return;
  
  if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
    carrinho.length = 0;
    atualizarCarrinho();
  }
}


function atualizarResumoPedido() {
  const resumo = document.getElementById("resumoPedido");
  let total = 0;
  
  let html = '<ul class="list-unstyled mb-0">';
  
  
  const itensAgrupados = {};
  carrinho.forEach(item => {
    if (itensAgrupados[item.nome]) {
      itensAgrupados[item.nome].quantidade++;
      itensAgrupados[item.nome].subtotal += item.preco;
    } else {
      itensAgrupados[item.nome] = {
        quantidade: 1,
        subtotal: item.preco
      };
    }
    total += item.preco;
  });
  
  Object.keys(itensAgrupados).forEach(nome => {
    const item = itensAgrupados[nome];
    html += `
      <li class="d-flex justify-content-between py-2 border-bottom">
        <span>${nome} <small class="text-muted">(${item.quantidade}x)</small></span>
        <span class="fw-bold">R$ ${item.subtotal.toFixed(2)}</span>
      </li>
    `;
  });
  
  html += `
      <li class="d-flex justify-content-between py-2 mt-2">
        <strong class="fs-5">Total</strong>
        <strong class="fs-5 text-success">R$ ${total.toFixed(2)}</strong>
      </li>
    </ul>
  `;
  
  resumo.innerHTML = html;
}


document.getElementById("busca").addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const filtrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(termo)
  );

  renderizarProdutos(filtrados);
});


document.getElementById("formCadastro").addEventListener("submit", function (e) {
  e.preventDefault();
  

  const nome = document.getElementById('nome').value;//validação simples
  const email = document.getElementById('email').value;
  
  if (!nome || !email) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }
  
  
  alert('✅ Compra realizada com sucesso!\n\nObrigado pela preferência, ' + nome + '!\nEm breve você receberá um e-mail de confirmação.');
  
  
  carrinho.length = 0;
  atualizarBadgeCarrinho();
  mostrarPagina('home');
  
  
  this.reset();
});


document.addEventListener('DOMContentLoaded', function() {
  renderizarProdutos(produtos);
  atualizarBadgeCarrinho();
 
  mostrarPagina('home');
});