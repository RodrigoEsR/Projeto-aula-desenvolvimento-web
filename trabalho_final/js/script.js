document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // 1. LÓGICA DO CARROSSEL DE TECNOLOGIAS
    // ==========================================
    const slides = document.querySelectorAll(".slide");
    const btnAnterior = document.querySelector(".seta.anterior");
    const btnProximo = document.querySelector(".seta.proximo");
    let slideAtual = 0;
    let intervaloCarrossel;

    function mostrarSlide(indice) {
        slides.forEach(slide => slide.classList.remove("ativo"));
        if (indice >= slides.length) { slideAtual = 0; } 
        else if (indice < 0) { slideAtual = slides.length - 1; } 
        else { slideAtual = indice; }
        slides[slideAtual].classList.add("ativo");
    }

    function iniciarAutoplay() {
        clearInterval(intervaloCarrossel);
        intervaloCarrossel = setInterval(() => { mostrarSlide(slideAtual + 1); }, 4000);
    }

    if (btnProximo && btnAnterior) {
        btnProximo.addEventListener("click", () => { mostrarSlide(slideAtual + 1); iniciarAutoplay(); });
        btnAnterior.addEventListener("click", () => { mostrarSlide(slideAtual - 1); iniciarAutoplay(); });
    }

    if (slides.length > 0) { mostrarSlide(slideAtual); iniciarAutoplay(); }

    // ==========================================
    // 2. LÓGICA TROCA DE TEMA + LOGO GITHUB
    // ==========================================
    const botaoTema = document.getElementById("botao-tema");
    const textoBotao = document.getElementById("texto-botao");
    const logoGithub = document.getElementById("logo-github");

    function atualizarLogoGithub(isLight) {
        if (!logoGithub) return;
        if (isLight) {
            logoGithub.src = "images/logo-github-preto.png"; 
        } else {
            logoGithub.src = "images/logo-github-branco.webp";
        }
    }

    if (botaoTema && textoBotao) {
        const temaSalvo = localStorage.getItem("tema");
        
        if (temaSalvo === "light") {
            document.body.classList.add("light-mode");
            textoBotao.textContent = "Modo escuro";
            atualizarLogoGithub(true);
        } else {
            document.body.classList.remove("light-mode");
            textoBotao.textContent = "Modo claro";
            atualizarLogoGithub(false);
        }

        botaoTema.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                textoBotao.textContent = "Modo escuro";
                localStorage.setItem("tema", "light");
                atualizarLogoGithub(true);
            } else {
                textoBotao.textContent = "Modo claro";
                localStorage.setItem("tema", "dark");
                atualizarLogoGithub(false);
            }
        });
    }

    // ==========================================
    // 3. LÓGICA DO MENU ATIVO (Navegação)
    // ==========================================
    const linksMenu = document.querySelectorAll(".nav_bar a");
    const urlAtual = window.location.href; // Pega a URL completa da página atual

    linksMenu.forEach(link => {
        const hrefDoLink = link.getAttribute("href");

        // Verifica se a URL atual contém o nome do arquivo do link
        // Também garante que a página inicial acenda quando a URL estiver apenas na raiz "/"
        if (urlAtual.includes(hrefDoLink) || (urlAtual.endsWith("/") && hrefDoLink === "index.html")) {
            link.classList.add("nav-ativo");
        }
    });

});