document.addEventListener("DOMContentLoaded", function () {
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

    const botaoTema = document.getElementById("botao-tema");
    const textoBotao = document.getElementById("texto-botao");
    const logoGithub = document.getElementById("logo-github"); 
    const githubEmpresa = document.getElementById("github-empresa"); 

    function atualizarLogoGithub(isLight) {
        if (logoGithub) {
            logoGithub.src = isLight ? "images/logo-github-preto.png" : "images/logo-github-branco.webp";
        }
        if (githubEmpresa) {
            githubEmpresa.src = isLight ? "images/logo-github-preto.png" : "images/logo-github-branco.webp";
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
});

document.addEventListener('DOMContentLoaded', function () {
    const projectCard = document.querySelector('.projetos-carousel');
    if (!projectCard) return;

    const track = projectCard.querySelector('#projects-track');
    const projectSlides = projectCard.querySelectorAll('.project-slide');
    const prevBtn = projectCard.querySelector('.seta.anterior');
    const nextBtn = projectCard.querySelector('.seta.proximo');
    const dotsContainer = projectCard.querySelector('#project-dots');
    let current = 0;

    function goTo(index) {
        projectSlides.forEach(s => s.classList.remove('ativo'));
        if (index >= projectSlides.length) index = 0;
        if (index < 0) index = projectSlides.length - 1;
        current = index;
        projectSlides[current].classList.add('ativo');
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        projectSlides.forEach((_, i) => {
            const b = document.createElement('button');
            b.className = (i === current) ? 'dot ativo' : 'dot';
            b.setAttribute('aria-label', 'Ir para o projeto ' + (i + 1));
            b.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(b);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    goTo(0);
});