async function renderPage(){
    if(localStorage.getItem("token")){
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem("token")
            },
            body: JSON.stringify()
        }

        await fetch('http://localhost:3000/api/unrestricted/getAuth', options)
        .then((res) => {
            if(res.status===200){
                return res.json()
            }
            else{
                localStorage.removeItem("token");
                renderNavNaoAutenticado();
                renderInicio();
                return null
            }
        })
        .then((res)=>{
            if(res){
            switch (res.tipoConta) {
                case 'admin':
                    renderNavAdmin();
                    renderGerirRecursos()
                    selecionarRender()
                    break;
                 case 'diretor de turma':
                    renderNavDiretorTurma();
                    renderGerirTurmas();
                    fillTabelaFormandosDiretor('');
                    break;
                case 'formando':
                    renderNavFormando();
                    renderOfertas();
                    break;
                case 'empresa':
                    renderNavEmpresa();
                    renderMinhaArea();
                    break;
                
            }
        }else return;
    })
        .catch((error) => console.log(error));

    }else{
        renderNavNaoAutenticado();
        renderInicio();
    }
    renderFooter();
}

/****   Não autenticado   ****/

//renders
function renderNavNaoAutenticado(){
    renderCode("navbar",`<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #3898ec;">
        <div class="container-fluid">
            <div class="ml-5"  onclick='renderInicio();'>
                <img class="d-inline-block align-text-top" src="http://localhost:3000/files/Assets/logoPlataformaPrincipal.png" alt="img-fluid" height="60px" width="auto" style="cursor: pointer;">
            </div>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" style="justify-content: end !important;" id="navbarNav">
                <ul class="navbar-nav" style="cursor: pointer;">
                    <li class="nav-item" onclick="renderInicio();">
                        <a class="nav-link">Inicio</a>
                    </li>
                    <li class="nav-item" onclick="renderLogin();">
                        <a class="nav-link">login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `)
}
function renderInicio(){
    renderCode("content",
    `<div class="top">
    <div class="banner1">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 mt-5">
                    <strong><h1>Plataforma Estágios</h1></strong>
                    <p>A Plataforma que simplifica todo o processo para obter o local de estágio.</p>
                </div>

                <div class="col-sm-6">
                    <img class="ban-img img-fluid" src="http://localhost:3000/files/Assets/work.svg" alt="">
                </div>
            </div>
        </div>
    </div>
    <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,128L120,138.7C240,149,480,171,720,165.3C960,160,1200,128,1320,112L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
    </div>

    <div class="container mt-5 mb-5">
    <div class="estagios">
        <div class="row d-flex align-items-center">
            <div class="col-sm-6">
                <img class="img-fluid" src="http://localhost:3000/files/Assets/Estagio.svg" alt="" >
            </div>

            <div class="estagio col-sm-6">
                <h1>O que é formação em contexto de traballho?</h1>
                <p>A formação em contexto de trabalho integra um conjunto de atividades profissionais desenvolvidas sob cordenação e acompanhamento da escola. 
                A zero custo para a empresa.
                <p>
            </div>
        </div>
    </div>
    </div>

    <div class="container mt-5 text-center">
    <h1>Como começar?</h1>
    </div>

    <!-- cartoes -->
    <div class="container mt-5">
    <div class="row">
        <div class="col-sm-4">
            <div class="card text-center shadow-lg hover-translate-y-n10">
                <div class="px-4 py-2">
                    <div class="position-relative">
                        <div class="position-absolute top-0 start-0">
                            <img style="height: 50px;" class="img-fluid" src="http://localhost:3000/files/Assets/numero-1.png" alt="">
                        </div>
                        <img style="height: 150px;" class="img-fluid" src="http://localhost:3000/files/Assets/userLogin.png" alt="">
                    </div>
                </div>

                <div class="px-4 py-3">
                    <h5>Login</h5>
                </div>
            </div>
        </div>

        <div class="col-sm-4">
            <div class="card text-center shadow-lg hover-translate-y-n10">
                <div class="px-4 py-2">
                    <div class="position-relative">
                        <div class="position-absolute top-0 start-0">
                            <img style="height: 50px;" class="img-fluid" src="http://localhost:3000/files/Assets/numero-2.png" alt="">
                        </div>
                        <img style="height: 150px;" class="img-fluid" src="http://localhost:3000/files/Assets/candidate.png" alt="">
                    </div>
                </div>

                <div class="px-4 py-3">
                    <h5>Encontrar Estágio</h5>
                </div>
            </div>
        </div>

        <div class="col-sm-4">
            <div class="card text-center shadow-lg hover-translate-y-n10">
                <div class="px-4 py-2">
                    <div class="position-relative">
                        <div class="position-absolute top-0 start-0">
                            <img style="height: 50px;" class="img-fluid" src="http://localhost:3000/files/Assets/numero-3.png" alt="">
                        </div>
                        <img style="height: 150px;" class="img-fluid" src="http://localhost:3000/files/Assets/serAceito.png" alt="">
                    </div>    
                </div>

                <div class="px-4 py-3">
                    <h5>Ser aceite</h5>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-5">
        <div class="col-sm-4">
            <div class="card text-center shadow-lg hover-translate-y-n10">
                <div class="px-4 py-2">
                    <div class="position-relative">
                        <div class="position-absolute top-0 start-0">
                            <img style="height: 50px;" class="img-fluid" src="http://localhost:3000/files/Assets/numero-1verde.png" alt="">
                        </div>
                        <img style="height: 150px;" class="img-fluid" src="http://localhost:3000/files/Assets/empresa.png" alt="">
                    </div>
                </div>

                <div class="px-4 py-3">
                    <h5>Criar Conta</h5>
                </div>
            </div>
        </div>

        <div class="col-sm-4">
            <div class="card text-center shadow-lg hover-translate-y-n10">
                <div class="px-4 py-2">
                    <div class="position-relative">
                        <div class="position-absolute top-0 start-0">
                            <img style="height: 50px;" class="img-fluid" src="http://localhost:3000/files/Assets/numero-2verde.png" alt="">
                        </div>
                        <img style="height: 150px;" class="img-fluid" src="http://localhost:3000/files/Assets/pasta.png" alt="">
                    </div>
                </div>

                <div class="px-4 py-3">
                    <h5>Criar oferta de estágio</h5>
                </div>
            </div>
        </div>

        <div class="col-sm-4">
            <div class="card text-center shadow-lg hover-translate-y-n10">
                <div class="px-4 py-2">
                    <div class="position-relative">
                        <div class="position-absolute top-0 start-0">
                            <img style="height: 50px;" class="img-fluid" src="http://localhost:3000/files/Assets/numero-3verde.png" alt="">
                        </div>
                        <img style="height: 150px;" class="img-fluid" src="http://localhost:3000/files/Assets/check.png" alt="">
                    </div>
                </div>

                <div class="px-4 py-3">
                    <h5>Aceitar Estagiarios</h5>
                </div>
            </div>
        </div>
    </div>
    </div>

    <div class="container mt-5">
    </div>
    `);
}
function renderDuvidas(){
    renderCode("content",
    `
        <div class="container text-center">
            <h1>Dúvidas</h1>
        </div>

        <div class="container shadow-lg p-3 mb-5 bg-body rounded">
            <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                Accordion Item #1
                </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
            </div>
            </div>
            <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                Accordion Item #2
                </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
            </div>
            </div>
            <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                Accordion Item #3
                </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
            </div>
            </div>
            </div>
        </div>

        <div class="container mt-5 shadow-lg p-3 mb-5 bg-body rounded">
            <div class="row">
                <div class="col-sm-6">
                    <form class="row needs-validation" action="" novalidate>
                        <div class="col-sm-12 mt-2">
                            <label for="nomeempresa" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="nome" maxlength="50" >
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                        </div>

                        <div class="col-sm-12 mt-2">
                            <label for="nomeempresa" class="form-label">Email</label>
                            <input type="text" class="form-control" id="nome" maxlength="50" >
                        </div>

                        <div class="col-sm-6 mt-2">
                            <label for="conselho" class="form-label">Tipo de duvida</label>
                            <select class="form-select" id="concelho" >
                                <option selected>Tipo de duvida</option>
                                <option>Erros</option>
                                <option>bugs</option>
                            </select>
                        </div>

                        <div class="col-sm-12 mt-2">
                            <label for="descricao" class="form-label">Descrição da duvida</label>
                            <textarea class="form-control" id="descricao" style="border-radius: 15px;" rows="3"></textarea >
                        </div>
                        
                        <div class="col-12 mt-3">
                            <button class="btn btn-primary" type="btn">Submeter duvida</button>
                        </div>
                    </form>
                </div>

                <div class="col-sm-6">
                    <img class="img-fluid" src="http://localhost:3000/files/Assets/duvidas.svg" alt="">
                </div>
            </div>
        </div>
    `);
}
function renderLogin(){
    renderCode("content",
`<div id="formulario" class="container mt-5 shadow-lg p-3 mb-5 bg-body rounded">
            <div class="container">
                <center><img width="300px" height="auto" src="http://localhost:3000/files/Assets/logoPlataforma.png" class="img-fluid" alt=""></center>
                <center><p class="mt-3">Se não possui conta faça o seu <a onclick='renderRegisto();' class="text-primary" style="cursor: pointer;"><strong>registo</strong></a></p></center>
            </div>
            
            <div class="container">
                <form class="needs-validation" novalidate>
                    <center><div class="row" style="max-width: 460px; text-align: start;">
                        <div class="col-sm-12 mb-3">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="email" name="email" style="border-radius: 20px;" >
                        </div>
                        <div class="col-sm-12 mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Password" style="border-radius: 20px;" >
                        </div>
                        <center><button style="border-radius: 20px; width: 150px; height: auto;" type="button" class="btn btn-primary" onclick='login();'>Login</button></center>
                    </div></center>
                </form>
            </div>
        </div>
        `);
}

function renderRegisto(){
    renderCode("content",`
    <div class="container mt-5">
            <div class="shadow-lg p-3 mb-5 bg-body rounded">
                <div class="info">
                    <center><div class="mt-1">
                        <h1>Registo</h1>
                        <p>Se ja possui conta faça <a onclick='renderLogin();' class="text-primary" style="cursor: pointer;"><strong>login</strong></a></p>
                    </div></center>
                </div>
                <div class="row">
                    <div class="imgCriarAnuncio col-sm-6 mt-3">
                        <img class="img-fluid" src="http://localhost:3000/files/Assets/criarEmpre.svg" alt="criar conta">
                    </div>
        
                    <div class="formulario col-sm-6 mt-5" novalidate>
                        <form id= "registoEmpresario">
                            <div class="row">
                                <div class="col-sm-12 mt-1">
                                    <div class="mt-1">
                                        <label for="emailadd" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" maxlength="255" onchange="validaEmail(this.value,this)">
                                    </div>
                                </div>
        
                                <div class="col-sm-12 mt-1">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password" maxlength="15" value="" onchange="validaPassword(this.value,this)">
                                </div>
        
                                <div class="col-sm-12 mt-1">
                                    <label for="nomeempresa" class="form-label">Nome da empresa</label>
                                    <input type="text" class="form-control" id="nome" maxlength="50" onchange="validaNomeEmpresa(this.value,this)">
                                </div>
        
        
                                <div class="col-sm-12 mt-1">
                                    <label for="contactoTelefonico" class="form-label">Contacto telefónico</label>
                                    <input type="number" class="form-control" id="contactoTelefonico" placeholder="+351" min="1" max="999999999" onchange="validaContactoTelefonico(this.value,this)" onKeyPress="if(this.value.length==9) return false;">
                                </div>
                                
                                <div class="form-check col-sm-12 mt-3" style="margin-left: 12px;">
                                    <input class="form-check-input" type="checkbox" id="termosUso" onchange="validaTermosUsos(this)">
                                    <label class="form-check-label" for="termosUso">Aceitar</label>
                                    <a onclick='openModal("termos");' class="text-primary" style="cursor: pointer;"><strong>Termos de uso</strong></a>
                                    
                                    
                                    <div class="modal fade" id="termos">
                                        <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Termos de uso da utilização do sistema</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                            Termos do sistema
                                            </div>
                                            <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    
                                </div>
        
                                <div class="col-sm-12 justify-content-center mt-4">
                                    <center><button type="button" class="col-sm-6 btn btn-primary" style="border-radius: 30px;" onclick="registar();">Criar conta</button></center>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `);
}

//funçoes
async function login(){
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        })
    }

    await fetch('http://localhost:3000/api/unrestricted/login', options)
    .then((res) => {
        if(res.status!=200){
          alert(res.json().msg)
          return
        }       
        let token = res.headers.get("Authorization");
        localStorage.setItem("token", token);
      })
      .catch((error) => console.log(error));

      if(localStorage.getItem("token")) location.reload();
      
}
async function registar(){
    if(validaRegistoEmpresa(document.getElementById("email"),document.getElementById("email").value,document.getElementById("password"),document.getElementById("password").value,document.getElementById("nome"),document.getElementById("nome").value,document.getElementById("contactoTelefonico"),document.getElementById("contactoTelefonico").value, document.getElementById("termosUso"))){
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                tipoConta:"empresa",
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                nome: document.getElementById("nome").value,
                contactoTelefonico: document.getElementById("contactoTelefonico").value,
            })
        }

        await fetch('http://localhost:3000/api/unrestricted/registo', options)
        .then(res => res.text())
        .then(text =>{
            alert(text)
        })
        .catch((err) =>{
            alert("Ocorreu um erro na efetuação do seu registo");
            console.log(err);
        })
        location.reload()
    }
}

function validaPassword(password,idInput) {
    if(password != null && password != ""){
        var validation = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        
        if(validation.test(password)){
            idInput.style.border='solid green'
            return true
        }
        else{
            idInput.style.border='solid red'
            return false;
        }
    }
    else{
        console.log("password")
        idInput.style.border='solid red';
        return false;
    }
}

function validaRegistoEmpresa(caixaEmail,email,caixaPassword,password,caixaNome,nome,caixaContactoTelefonico,contactoTelefonico,caixaTermos){
    if(validaEmail(email,caixaEmail) 
        && validaPassword(password,caixaPassword) 
        && validaNomeEmpresa(nome,caixaNome)
        && validaContactoTelefonico(contactoTelefonico,caixaContactoTelefonico)
        && validaTermosUsos(caixaTermos))
        return true;
    else{
        validaEmail(email,caixaEmail)
        validaPassword(password,caixaPassword)
        validaNomeEmpresa(nome,caixaNome)
        validaContactoTelefonico(contactoTelefonico,caixaContactoTelefonico)
        validaTermosUsos(caixaTermos)
        return false;
    }
}

function validaLogin(){
    if(validaEmail(document.getElementById('email')) && validaPassword(document.getElementById('password'))){
        return true;
    }
    else{
        return false;
    }
}

function validaNomeEmpresa(nome,idInput){
    if(nome != null && nome != ""){
        idInput.style.border = "solid green";
        return true;
    }
    else{
        console.log('nome invalido')
        idInput.style.border = "solid red"
        return false;
    }
}

function validaEmail(email,idInput) {
    if(email != null && email != ""){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            idInput.style.border='solid green';
            return true;
        }
        else{
            idInput.style.border='solid red';
            return false;
        }
    }else{
        console.log("email invalido")
        idInput.style.border='solid red';
        return false;
    }
}

function validaContactoTelefonico(contactoTelefonico,idInput){
    if(contactoTelefonico != null && contactoTelefonico != ""){
        if(contactoTelefonico != null && contactoTelefonico != ""   ){
            if (!isNaN(contactoTelefonico) && contactoTelefonico.length == 9){
                idInput.style.border='solid green';
                return true;
            }
            else{
                idInput.style.border='solid red';
                return false;
            }
        }
    }else{
        idInput.style.border='solid red';
        return false;
    }
}

function validaTermosUsos(idInput){
    if(idInput.checked == true){
        idInput.style.backgroundColor = "green"
        idInput.style.border='solid green';
        return true;
    }else{
        
        idInput.style.backgroundColor = "white"
        idInput.style.border='solid red';
        return false;
    }
}


/****   Admin{   ****/
    /****   renders{   ****/
        function renderNavAdmin(){
            renderCode("navbar",`<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #3898ec;">
                            <div class="container-fluid">
                                <div class="ml-5"  onclick='renderEstatisticas()'>
                                    <img class="d-inline-block align-text-top" src="http://localhost:3000/files/Assets/logoPlataformaPrincipal.png" alt="img-fluid" height="60px" width="auto" style="cursor: pointer;">
                                </div>
                                
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                
                                <div class="collapse navbar-collapse" style="justify-content: end !important;" id="navbarNav">
                                    <ul class="navbar-nav" style="cursor: pointer;">
                                        <li class="nav-item" onclick="renderGerirRecursos() selecionarRender()">
                                            <a class="nav-link">Gestão de recursos</a>
                                        </li>
                                        
                                        <li class="nav-item" onclick="logout();">
                                            <a class="nav-link">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        `)
        }
        function renderGerirRecursos(){
            renderCode("content",
        `<div class="container mt-3 mb-4">
        <div class="row">
        <h2>Gerir recursos</h2>
        <div class="col-xl-2 col-md-3 col-sm-5">
            <select id="estado" class="form-select col-sm-6 mx-1 " onchange="selecionarRender();">
            <option selected value="alunos">Formação</option>
            <option value="adminsDiretores">Administração</option>
            <option value="empresa">Empresas</option>
            </select>
        </div>
        </div>
        </div>

        <div class="container">
            <div id="painelGestao">

            </div>
        </div>`);
        }
        function selecionarRender(){
            switch(document.getElementById("estado").value){
                case "alunos":
                    renderGerirFormacao();
                    break
                case "adminsDiretores":
                    renderGerirAdministracao();
                    break;
                case "empresa":
                    renderGerirEmpresas()
                    break;
            } 
        }
        function renderGerirFormacao(){
            document.getElementById("painelGestao").innerHTML =`
            <div class="mt-4">
                <div class="container mb-4 shadow-lg p-3 bg-body rounded" onmouseover="mostrarBotao('btnCriarCurso')" onmouseout="esconderBotao('btnCriarCurso')">
                    <div class="criar d-flex">
                        <div>
                            <h3>Cursos</h3>
                        </div>
                        <div id="btnCriarCurso" style="display: none;">
                            <button type="button" class="btn btn-primary mx-3" style="border-radius: 30px;" onclick="fillAreas('area'); openModal('criacaoCurso');">Abrir formulário</button>
                        </div>
                    </div>
                
                    <div class="table-responsive-sm">
                        <table class="table text-center">
                            <thead>
                                <tr>
                                    <th class="col-sm-4 mx-auto" scope="col">Nome</th>
                                    <th class="col-sm-1 mx-auto" scope="col">Sigla</th>
                                    <th class="col-sm-4 mx-auto" scope="col">Área</th>  
                                    <th class="col-sm-3 mx-auto" style="display:none" id="acoesCursos" scope="col">Ações</th>  
                                </tr>
                            </thead>
                            <tbody id="tblCursos" onmouseover="document.getElementById('acoesCursos').style.display = 'block';" onmouseout="document.getElementById('acoesCursos').style.display = 'none';">
                            </tbody>
                        </table>
                    </div>
                </div>
            
                <div class="container mb-4  shadow-lg p-3 bg-body rounded" onmouseover="mostrarBotao('btnCriarTurma')" onmouseout="esconderBotao('btnCriarTurma')">
                    <div class="criar d-flex align-items-center">
                        <h3>Turmas</h3>
                        <div id="btnCriarTurma" style="display: none;">
                            <button type="button" class="btn btn-primary mx-3" style="border-radius: 30px;" onclick="fillCursos('turmaCurso');fillDiretoresTurma('diretor'); openModal('criacaoTurma');">Abrir formulário</button>
                        </div>
                            
                    </div>
                    <div class="table-responsive-sm">
                        <table class="table text-center">
                        <thead >
                            <tr>
                            <th scope="col"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="allTurmas" value=0 checked="checked" onchange="fillTabelaFormandos('')"></th>
                            <th scope="col">Turma</th>
                            <th scope="col">Diretor de turma</th>
                            <th class="col-sm-3 mx-auto" style="display:none" id="acoesTurmas" scope="col">Ações</th> 
                            </tr>
                        </thead>
                        <tbody id="tblTurmas" onmouseover="document.getElementById('acoesTurmas').style.display = 'block';" onmouseout="document.getElementById('acoesTurmas').style.display = 'none';">
                            
                        </tbody>
                    </table>
                    </div>
                </div>
            
                <div class="container shadow-lg p-3 mb-5 bg-body rounded" onmouseover="mostrarBotao('btnCriarAluno')" onmouseout="esconderBotao('btnCriarAluno')">
                    <div class="criar d-flex align-items-center">
                    <h3>Formandos</h3>
                    <div id="btnCriarAluno" style="display: none;"> <button type="button" class="btn btn-primary mx-3" style="border-radius: 30px;" onclick="fillCursos('formandoCurso'); openModal('criacaoFormando');">Abrir formulário</button></div>
                    </div>
            
                    <div class="table-responsive-sm">
                    <table class="table text-center">
                        <thead >
                        <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Turma</th>
                        <th scope="col" style="display:none" id="acoesFormandos" >Ações</th>
                        </tr>
                        </thead>
                        <tbody id="tblFormandos" onmouseover="document.getElementById('acoesFormandos').style.display = 'block';" onmouseout="document.getElementById('acoesFormandos').style.display = 'none';">

                        </tbody>
                    </table>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="criacaoCurso" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="container mb-1">
                            <div class="shadow-lg p-3 bg-body rounded">
                                <div class="row">
                                    <div class="col-4 mx-auto">
                                        <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/curso.svg" alt="aluno">
                                    </div>
                                    <div class="col-md-8">
                                        <form>
                                            <div class="row mt-4">
                                                <div class="col-sm-6 mt-1">
                                                    <label for="curso" class="form-label"><strong>Nome do curso</strong></label>
                                                    <input type="text" class="form-control" id="curso" placeholder='Ex: "Técnico de vendas e marketing"'>
                                                </div>
                                                <div class="col-sm-6 mt-1">
                                                    <label for="sigla" class="form-label"><strong>Sigla</strong></label>
                                                    <input type="text" class="form-control" id="sigla" placeholder='Ex: "TVM"' onKeyUp="this.value = this.value.toUpperCase()">
                                                </div>
                                                <div class="col-sm-6 mt-1">
                                                    <label for="area" class="form-label"><strong>Área</strong></label>
                                                    <select id="area" class="form-select col-sm-12" style="color:gray" onChange="if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                    </select>
                                                </div>
                                                <div class="col-sm-6 mt-1">
                                                    <label for="duracao" class="form-label"><strong>Duração</strong></label>
                                                    <select id="duracao" class="form-select col-sm-12" style="color:gray" onChange="if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                        <option value="0" style="color:gray !important">Selecionar duração</option>
                                                        <option value="1" style="color:black !important" >1 ano</option>
                                                        <option value="3" style="color:black !important">3 anos</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 mt-4">
                                                <center><button type="button" class="col-sm-3 btn btn-primary  mx-1" style="border-radius: 30px;" onclick="criarCurso(\`\${document.getElementById('curso').value}\`,\`\${document.getElementById('sigla').value}\`,\`\${document.getElementById('area').value}\`,\`\${document.getElementById('duracao').value}\`)">Criar curso</button></center>                                
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="criacaoTurma" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                            <div class="container mb-2">
                                <div class="criarAluno shadow-lg p-3 mb-1 bg-body rounded">
                                    <div class="row">
                                        <div class="col-4 mx-auto">
                                            <img class="img-fluid" src="http://localhost:3000/files/Assets/turma.svg" alt="aluno">
                                        </div>
                    
                                        <div class="col-md-8 mx-auto mt-3">
                                            <form>
                                                <div class="row mt-4">
                                                    <div class="col-sm-6 mt-1">
                                                        <label class="form-label"><strong>Curso</strong></label>
                                                        <select id="turmaCurso" class="form-select col-sm-12" style="color:gray" onChange="fillAnos(this.value,'ano'); if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                        </select>
                                                    </div>
                                                    <div class="col-sm-6 mt-1">
                                                        <label for="diretor" class="form-label"><strong>Diretor de turma</strong></label>
                                                        
                                                        <select id="diretor" class="form-select col-sm-12" style="color:gray" onChange="if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">           
                                                        </select>
                                                    </div>
                                                    <div class="col-sm-6 mt-1">
                                                        <label for="ano"class="form-label"><strong>Ano</strong></label>
                                                            <select id="ano" class="form-select col-sm-12" disabled onChange="if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                            </select>
                                                    </div>
                                                    <div class="col-sm-6 mt-1">
                                                        <label for="numero" class="form-label"><strong>Numero de turma</strong></label>
                                                        <input type="number" min="0" class="form-control" id="numero" placeholder='ex: "1" (Preencher se necessário)' onKeyPress="if(this.value.length==1) return false;" onchange="if(this.value == '0')this.value =''"> </input>
                                                    </div>'

                                                    <div class="col-sm-12 mt-4">
                                                                <center><button type="button" class="col-sm-3 btn btn-primary  mx-1" style="border-radius: 30px;"onclick="criarTurma(\`\${document.getElementById('turmaCurso').value}\`,\`\${document.getElementById('diretor').value}\`,\`\${document.getElementById('ano').value}\`,\`\${document.getElementById('numero').value}\`)">Criar turma</button></center>
                                                    </div>
                                                </div>
                                            </form>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="criacaoFormando" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-body">
                <div class="container mb-1">
                    <div class="criarAluno shadow-lg p-3 bg-body rounded">
                        <div class="row">
                            <div class="col-4 mx-auto">
                                <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/criarAluno.svg" alt="aluno">
                            </div>
                            <div class="col-md-8">
                                <form>
                                    <div class="row mt-4">
                                        <div class="col-sm-6 mt-1">
                                            <label for="nome" class="form-label"><strong>Primeiro e último nome</strong></label>
                                            <input type="text" class="form-control" id="nome">
                                        </div>
                                            <div class="col-sm-6 mt-1">
                                                <label for="email" class="form-label"><strong>Email</strong></label>
                                                <input type="text" class="form-control" id="email">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6 mt-1">
                                                <label for="formandoCurso" class="form-label"><strong>Curso</strong></label>
                                                <select id="formandoCurso" class="form-select col-sm-12" style="color:gray" onChange="fillTurmas(this.value,'formandoTurma'); if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                </select>
                                            </div>

                                            <div class="col-sm-6 mt-1">
                                                <label for="formandoTurma" class="form-label"><strong>Turma</strong></label>
                                                <select id="formandoTurma" class="form-select col-sm-12" disabled style="color:gray" onChange="if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">>
                                                </select>
                                            </div>
                                        </div>
                                </form>
                                <div class="col-sm-12 mt-4">
                                    <center><button type="button" class="col-sm-3 btn btn-primary mx-1" style="border-radius: 30px;" onclick="criarFormando(\`\${document.getElementById('nome').value}\`,\`\${document.getElementById('email').value}\`,\`\${document.getElementById('formandoTurma').value}\`)">Criar conta</button></center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>

            `;
            fillTabelaCursos();
            fillTabelaTurmas();
            fillTabelaFormandos('');
        }
        function renderGerirAdministracao(){
            document.getElementById("painelGestao").innerHTML =`
            <div class="mt-4">
                <div class="container mb-4 shadow-lg p-3 bg-body rounded" onmouseover="mostrarBotao('btnCriarAdmin')" onmouseout="esconderBotao('btnCriarAdmin')">
                    <div class="criar d-flex">
                        <div>
                            <h3>Administradores</h3>
                        </div>
                        <div id="btnCriarAdmin" style="display: none;">
                            <button type="button" class="btn btn-primary mx-3" style="border-radius: 30px;" onclick="openModal('criacaoAdmin');">Abrir formulário</button>
                        </div>
                    </div>
                
                    <div class="table-responsive-sm">
                        <table class="table text-center">
                            <thead>
                                <tr>
                                    <th class="mx-auto" scope="col">Nome</th>
                                    <th class="mx-auto" scope="col">Email</th> 
                                    <th class="mx-auto" style="display:none" id="acoesAdmins" scope="col">Ações</th>  
                                </tr>
                            </thead>
                            <tbody id="tblAdmins" onmouseover="document.getElementById('acoesAdmins').style.display = 'block';" onmouseout="document.getElementById('acoesAdmins').style.display = 'none';">
                            </tbody>
                        </table>
                    </div>
                </div>
            
                <div class="container mb-4 shadow-lg p-3 bg-body rounded" onmouseover="mostrarBotao('btnCriarDiretorTurma')" onmouseout="esconderBotao('btnCriarDiretorTurma')">
                    <div class="criar d-flex">
                        <div>
                            <h3>Diretores de turma</h3>
                        </div>
                        <div id="btnCriarDiretorTurma" style="display: none;">
                            <button type="button" class="btn btn-primary mx-3" style="border-radius: 30px;" onclick="openModal('criacaoDiretor');">Abrir formulário</button>
                        </div>
                    </div>
                    <div class="table-responsive-sm">
                        <table class="table text-center">
                            <thead>
                                <th class="mx-auto" scope="col">Nome</th>
                                <th class="mx-auto" scope="col">Email</th> 
                                <th class="mx-auto" style="display:none" id="acoesDiretoresTurma" scope="col">Ações</th>  
                                </tr>
                            </thead>
                            <tbody id="tblDiretores" onmouseover="document.getElementById('acoesDiretoresTurma').style.display = 'block';" onmouseout="document.getElementById('acoesDiretoresTurma').style.display = 'none';">
                            </tbody>
                        </table>
                    </div>
            </div>

            <div class="modal fade" id="criacaoAdmin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="container mb-1">
                            <div class="shadow-lg p-3 bg-body rounded">
                                <div class="row">
                                    <div class="col-4 mx-auto">
                                        <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/admin.svg" alt="aluno">
                                    </div>
                                    <div class="col-md-8 mt-sm-4">
                                        <form>
                                            <div class="row mt-4">
                                                <div class="col-sm-6 mt-1">
                                                    <label for="adminNome" class="form-label"><strong>Primeiro e último nome</strong></label>
                                                    <input type="text" class="form-control" id="adminNome" placeholder='Ex: "Bernardo Branco"'>
                                                </div>
                                                <div class="col-sm-6 mt-1">
                                                    <label for="adminEmail" class="form-label"><strong>Email</strong></label>
                                                    <input type="text" class="form-control" id="adminEmail" placeholder='Ex: "bernardobranco@gmail.com"'>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 mt-4 mt-sm-5">
                                                <center><button type="button" class="col-sm-3 btn btn-primary  mx-1" style="border-radius: 30px;" onclick="criarAdmin(\`\${document.getElementById('adminNome').value}\`,\`\${document.getElementById('adminEmail').value}\`)">Criar conta</button></center>                                
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="criacaoDiretor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="container mb-1">
                            <div class="shadow-lg p-3 bg-body rounded">
                                <div class="row">
                                    <div class="col-4 mx-auto">
                                        <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/diretorTurma.svg" alt="aluno">
                                    </div>
                                    <div class="col-md-8 mt-sm-4">
                                        <form>
                                            <div class="row mt-4">
                                                <div class="col-sm-6 mt-1">
                                                    <label for="diretorNome" class="form-label"><strong>Primeiro e último nome</strong></label>
                                                    <input type="text" class="form-control" id="diretorNome" placeholder='Ex: "Bernardo Branco"'>
                                                </div>
                                                <div class="col-sm-6 mt-1">
                                                    <label for="diretorEmail" class="form-label"><strong>Email</strong></label>
                                                    <input type="text" class="form-control" id="diretorEmail" placeholder='Ex: "bernardobranco@gmail.com"'>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 mt-4 mt-sm-5">
                                                <center><button type="button" class="col-sm-3 btn btn-primary  mx-1" style="border-radius: 30px;" onclick="criarDiretorTurma(\`\${document.getElementById('diretorNome').value}\`,\`\${document.getElementById('diretorEmail').value}\`)">Criar conta</button></center>                                
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        fillTabelaAdmins();
        fillTabelaDiretoresTurma();
        }
        function renderGerirEmpresas(){
            document.getElementById("painelGestao").innerHTML =`
            <div class="mt-4">
                <div class="container mb-4 shadow-lg p-3 bg-body rounded">
                    <h3>Empresas</h3>
                
                    <div class="table-responsive-sm">
                        <table class="table text-center">
                            <thead>
                                <tr>
                                    <th class="mx-auto" scope="col">Nome</th>
                                    <th class="mx-auto" scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody id="tblEmpresas">
                            </tbody>
                        </table>
                    </div>
                </div>
        `;
        fillTabelaEmpresas();
        }
        /****   fillTabela{   ****/
            function fillTabelaCursos(){
                str = ``;
                const options = {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
                fetch('http://localhost:3000/api/admin/cursos',options)
                .then((res) =>{
                    if(res.status =200) return res.json()
                    return null
                })
                .then((data) => {
                    if(data){
                        for(let i = 0; i< data.length; i++){
                            
                            str+=`
                                <tr id="trC${data[i].idCurso}" onmouseover="document.getElementById('botoesC${data[i].idCurso}').style.display = 'flex';" onmouseout="document.getElementById('botoesC${data[i].idCurso}').style.display = 'none';">
                                    <td id="tdCurso${data[i].idCurso}">${data[i].curso}</td>
                                    <td id="tdSigla${data[i].idCurso}">${data[i].sigla}</td>
                                    <td id="tdArea${data[i].idCurso}">${data[i].area}</td>
                                    <td class="my-auto" style="display: none;" id="botoesC${data[i].idCurso}">
                                        <button type="button"  class="col-6 btn btn-primary mx-1"  onclick="resetModalEdicaoCurso('${data[i].idCurso}','${data[i].curso}','${data[i].sigla}','${data[i].idArea}','${data[i].duracao}'); openModal('edicaoCurso${data[i].idCurso}');">editar</button>
                                        <button type="button" class="col-6 btn btn-danger mx-1"  onclick="openModal('eliminacaoCurso${data[i].idCurso}');">eliminar</button>
                                    </td>
                                </tr>
                                <div class="modal fade" id="edicaoCurso${data[i].idCurso}" style="text-align: left;" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <div class="container mb-1">
                                                <div class="criarAluno shadow-lg p-3 bg-body rounded">
                                                    <div class="row">
                                                        <div class="col-4 mx-auto">
                                                            <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/curso.svg" alt="aluno">
                                                        </div>
                                                        <div class="col-md-8">
                                                            <form id="formEdicaoCurso${data[i].idCurso}">
                                                                <div class="row mt-4">
                                                                    <div class="col-sm-6 mt-1">
                                                                        <label for="curso${data[i].idCurso}" class="form-label"><strong>Nome do curso</strong></label>
                                                                        <input type="text" class="form-control" id="curso${data[i].idCurso}" value="${data[i].curso}">
                                                                    </div>
                                                                    <div class="col-sm-6 mt-1">
                                                                        <label for="sigla${data[i].idCurso}" class="form-label"><strong>Sigla</strong></label>
                                                                        <input type="text" class="form-control" id="sigla${data[i].idCurso}" value="${data[i].sigla}">
                                                                    </div>
                                                                    <div class="col-sm-6 mt-1">
                                                                        <label for="area${data[i].idCurso}" class="form-label"><strong>Área</strong></label>
                                                                        <select id="area${data[i].idCurso}" class="form-select col-sm-12">
                                                                        </select>
                                                                    </div>
                                                                    <div class="col-sm-6 mt-1">
                                                                        <label for="duracao${data[i].idCurso}" class="form-label"><strong>Duração</strong></label>
                                                                        <select id="duracao${data[i].idCurso}" class="form-select col-sm-12">`

                            if(data[i].duracao == '1') 
                                str += `<option value="${data[i].duracao}" selected>${data[i].duracao} ano</option>
                                        <option value="3">3 anos</option>`;
                            else 
                                str += `<option value="${data[i].duracao}" selected>${data[i].duracao} anos</option>
                                        <option value="1">1 ano</option>`;
                                
                            str += `
                                                                        </select>                                                        </div>
                                                                </div>
                                                                <div class="col-sm-12 mt-4">
                                                                    <center><button type="button" class="col-sm-4 btn btn-primary  mx-1" style="border-radius: 30px;" data-bs-dismiss="modal" onclick="editarCurso('${data[i].idCurso}',\`\${document.getElementById('curso${data[i].idCurso}').value}\`,\`\${document.getElementById('sigla${data[i].idCurso}').value}\`,\`\${document.getElementById('area${data[i].idCurso}').value}\`,\`\${document.getElementById('duracao${data[i].idCurso}').value}\`);">Confirmar alterações</button></center>                                
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>` 
                            
                            str+=`<div class="modal fade" id="eliminacaoCurso${data[i].idCurso}" style="text-align: left;" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <div class="container mb-1">
                                            <div class="criarAluno shadow-lg p-3 bg-body rounded">
                                                <div class="row">
                                                    <div class="col-4 mx-auto">
                                                        <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/curso.svg" alt="aluno">
                                                    </div>
                                                    <div class="col-md-8">
                                                        <form">
                                                            <div class="row mt-4">
                                                                <div class="col-sm-6 mt-1">
                                                                    <label class="form-label"><strong>Nome do curso</strong></label>
                                                                    <input type="text" class="form-control" value="${data[i].curso}" disabled>
                                                                </div>
                                                                <div class="col-sm-6 mt-1">
                                                                    <label class="form-label"><strong>Sigla</strong></label>
                                                                    <input type="text" class="form-control" value="${data[i].sigla}" disabled>
                                                                </div>
                                                                <div class="col-sm-6 mt-1">
                                                                    <label  class="form-label"><strong>Área</strong></label>
                                                                    <select class="form-select col-sm-12" disabled>
                                                                        <option selected>${data[i].area}</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-sm-6 mt-1">
                                                                    <label class="form-label"><strong>Duração</strong></label>
                                                                    <select class="form-select col-sm-12" disabled>
                                                                        <option selected>${data[i].duracao}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-12 mt-4">
                                                                <center><button type="button" class="col-sm-4 btn btn-danger  mx-1" style="border-radius: 30px;"  onclick="(eliminarCurso('${data[i].idCurso}'))" data-bs-dismiss="modal">Eliminar Curso</button></center>                                
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                    </div>
                                </div>
                            </div>
                        </div>`

                        }
                            document.getElementById("tblCursos").innerHTML = str;
                    }
                    else return;
                    })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha dos cursos')
                })
            }
            function fillTabelaTurmas(){
                document.getElementById("tblTurmas").innerHTML = ``;
                const options = {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
                fetch('http://localhost:3000/api/admin/turmas',options)
                .then((res) =>{
                    if(res.status ==200 ) return res.json()
                    return null
                })
                .then((data) => {
                    let str = '';
                    if(data){
                        for(let i = 0; i< data.length; i++){
                            if(data[i].curso == null)
                                data[i].curso = ''
                            if(data[i].diretorTurma == null)
                                data[i].diretorTurma = ''
                            if(data[i].numero == null)
                                data[i].numero = ''
                            

                            str+= `
                                <tr id="trT${data[i].idTurma}" onmouseover="document.getElementById('botoesT${data[i].idTurma}').style.display = 'flex';" onmouseout="document.getElementById('botoesT${data[i].idTurma}').style.display = 'none';">
                                    <td><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onchange="fillTabelaFormandos(${data[i].idTurma});"></td>`

                                    if(data[i].turma)
                                        str += `<td>${data[i].turma}</td>`
                                    else
                                        str += `<td style="color:red">Sem curso atribuído</td>`

                                    if(data[i].diretorTurma)
                                        str += `<td>${data[i].diretorTurma}</td>`
                                    else
                                    str +=  `<td style="color:red">Sem diretor de turma atribuído</td>`
                                    
                                    str +=  `
                                    <td class="my-auto" style="display: none;" id="botoesT${data[i].idTurma}">
                                        <button type="button"  class="col-6 btn btn-primary mx-1"  onclick="resetModalEdicaoTurma('${data[i].idTurma}','${data[i].idCurso}','${data[i].idConta}','${data[i].ano}','${data[i].numero}'); openModal('edicaoTurma${data[i].idTurma}');">editar</button>
                                        <button type="button" class="col-6 btn btn-danger mx-1"  onclick="openModal('eliminacaoTurma${data[i].idTurma}');">eliminar</button>
                                    </td>
                                </tr>

                                <div class="modal fade" id="edicaoTurma${data[i].idTurma}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                    <div class="container mb-2">
                                                        <div class="criarAluno shadow-lg p-3 mb-1 bg-body rounded">
                                                            <div class="row">
                                                                <div class="col-4 mx-auto">
                                                                    <img class="img-fluid" src="http://localhost:3000/files/Assets/turma.svg" alt="aluno">
                                                                </div>
                                            
                                                                <div class="col-md-8 mx-auto mt-3">
                                                                    <form>
                                                                        <div class="row mt-4">
                                                                            <div class="col-sm-6 mt-1">
                                                                                <label for="turmaCurso${data[i].idTurma}" class="form-label"><strong>Curso</strong></label>
                                                                                <select id="turmaCurso${data[i].idTurma}" class="form-select col-sm-12" onChange="fillAnos(this.value,'ano${data[i].idTurma}'); if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-sm-6 mt-1">
                                                                                <label for="diretor${data[i].idTurma}" class="form-label"><strong>Diretor de turma</strong></label>
                                                                                <select id="diretor${data[i].idTurma}" class="form-select col-sm-12"  onChange="if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">           
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-sm-6 mt-1">
                                                                                <label for="ano${data[i].idTurma}"class="form-label"><strong>Ano</strong></label>
                                                                                    <select id="ano${data[i].idTurma}" class="form-select col-sm-12" onChange="if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                                                    </select>
                                                                            </div>
                                                                            <div class="col-sm-6 mt-1">
                                                                                <label for="numero${data[i].idTurma}" class="form-label"><strong>Numero de turma</strong></label>
                                                                                <input type="number" min="0" class="form-control" id="numero${data[i].idTurma}" placeholder='ex: "1" (Preencher se necessário)' onKeyPress="if(this.value.length==1) return false;" onchange="if(this.value == '0')this.value =''"> </input>
                                                                            </div>'

                                                                            <div class="col-sm-12 mt-4">
                                                                                        <center><button type="button" class="col-sm-3 btn btn-primary  mx-1" style="border-radius: 30px;" data-bs-dismiss="modal" onclick="editarTurma('${data[i].idTurma}',\`\${document.getElementById('turmaCurso${data[i].idTurma}').value}\`,\`\${document.getElementById('diretor${data[i].idTurma}').value}\`,\`\${document.getElementById('ano${data[i].idTurma}').value}\`,\`\${document.getElementById('numero${data[i].idTurma}').value}\`)">Editar turma</button></center>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="modal fade" id="eliminacaoTurma${data[i].idTurma}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                    <div class="container mb-2">
                                                        <div class="criarAluno shadow-lg p-3 mb-1 bg-body rounded">
                                                            <div class="row">
                                                                <div class="col-4 mx-auto">
                                                                    <img class="img-fluid" src="http://localhost:3000/files/Assets/turma.svg" alt="aluno">
                                                                </div>
                                            
                                                                <div class="col-md-8 mx-auto mt-3">
                                                                    <form>
                                                                        <div class="row mt-4">
                                                                            <div class="col-sm-6 mt-1">
                                                                                <label class="form-label"><strong>Curso</strong></label>
                                                                                <select class="form-select col-sm-12" disabled>
                                                                                    <option selected>${data[i].curso}</option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-sm-6 mt-1">
                                                                                <label  class="form-label"><strong>Diretor de turma</strong></label>
                                                                                <select  class="form-select col-sm-12" disabled>    
                                                                                    <option selected>${data[i].diretorTurma}</option>       
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-sm-6 mt-1">
                                                                                <label class="form-label"><strong>Ano</strong></label>
                                                                                    <select class="form-select col-sm-12" disabled>
                                                                                    <option selected>${data[i].ano}</option>
                                                                                    </select>
                                                                            </div>

                                                                            <div class="col-sm-6 mt-1">
                                                                                <label  class="form-label"><strong>Numero de turma</strong></label>
                                                                                <input class="form-control" disabled value="${data[i].numero}"></input>
                                                                            </div>'

                                                                            <div class="col-sm-12 mt-4">
                                                                                        <center><button type="button" data-bs-dismiss="modal" class="col-sm-3 btn btn-danger  mx-1" style="border-radius: 30px;"onclick="eliminarTurma('${data[i].idTurma}')">Eliminar turma</button></center>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `}
                            document.getElementById("tblTurmas").innerHTML = str;
                    }
                    else return;
                    })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha das turmas')
                })
            }
            function fillTabelaFormandos(idTurma){
                document.getElementById("tblFormandos").innerHTML = ``;
                const options = {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
                fetch(`http://localhost:3000/api/admin/formandos/${idTurma}`,options)
                .then((res) =>{
                    if(res.status=200) return res.json()
                    return null
                })
                .then((data) => {
                    if(data){
                        for(let i = 0; i< data.length; i++){
                            if(data[i].turma == null && data[i].curso == null){
                                data[i].turma = '';
                                data[i].curso = '';
                            }
                            document.getElementById("tblFormandos").innerHTML += `
                            <tr id="trF${data[i].idConta}"onmouseover="document.getElementById('botoesF${data[i].idConta}').style.display = 'flex';" onmouseout="document.getElementById('botoesF${data[i].idConta}').style.display = 'none';">
                                <td>${data[i].nome}</td>
                                <td>${data[i].email}</td>`
                                if(data[i].turma)
                                    document.getElementById(`trF${data[i].idConta}`).innerHTML+= `<td>${data[i].turma}</td>`
                                else
                                    document.getElementById(`trF${data[i].idConta}`).innerHTML+= `<td style="color:red">Sem turma atribuída</td>`
                                document.getElementById(`trF${data[i].idConta}`).innerHTML += `
                                <td class="my-auto" style="display: none;" id="botoesF${data[i].idConta}">
                                <button type="button"  class="col-6 btn btn-primary mx-1"  onclick="resetModalEdicaoFormando('${data[i].idConta}','${data[i].nome}','${data[i].email}','${data[i].idCurso}','${data[i].idTurma}'); openModal('edicaoFormando${data[i].idConta}');">editar</button>
                                <button type="button" class="col-6 btn btn-danger mx-1"  onclick="openModal('eliminacaoFormando${data[i].idConta}');">eliminar</button>
                                </td>
                            </tr>

                            
                            <div class="modal fade" id="edicaoFormando${data[i].idConta}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-body">
                                    <div class="container mb-1">
                                        <div class="criarAluno shadow-lg p-3 bg-body rounded">
                                            <div class="row">
                                                <div class="col-4 mx-auto">
                                                    <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/criarAluno.svg" alt="aluno">
                                                </div>
                                                <div class="col-md-8">
                                                    <form>
                                                        <div class="row mt-4">
                                                            <div class="col-sm-6 mt-1">
                                                                <label for="nome${data[i].idConta}" class="form-label"><strong>Primeiro e último nome</strong></label>
                                                                <input type="text" id="nome${data[i].idConta}" class="form-control">
                                                            </div>
                                                                <div class="col-sm-6 mt-1">
                                                                    <label for="email${data[i].idConta}"class="form-label"><strong>Email</strong></label>
                                                                    <input type="text" id="email${data[i].idConta}" class="form-control" disabled>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-sm-6 mt-1">
                                                                    <label for="formandoCurso${data[i].idConta}" class="form-label"><strong>Curso</strong></label>
                                                                    <select id="formandoCurso${data[i].idConta}" class="form-select col-sm-12"  onChange="fillTurmas(this.value,'formandoTurma${data[i].idConta}');if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                                    </select>
                                                                </div>

                                                                <div class="col-sm-6 mt-1">
                                                                    <label for="formandoTurma${data[i].idConta}" class="form-label"><strong>Turma</strong></label>
                                                                    <select id="formandoTurma${data[i].idConta}" class="form-select col-sm-12" onChange="if(this.value != '0')this.style.color='black'; if(this.value == '0')this.style.color='gray'">
                                                                    </select>
                                                                </div>
                                                            </div>
                                                    </form>
                                                    <div class="col-sm-12 mt-4">
                                                        <center><button type="button" data-bs-dismiss="modal" class="col-sm-3 btn btn-primary mx-1" style="border-radius: 30px;" onclick="editarFormando('${data[i].idConta}',\`\${document.getElementById('nome${data[i].idConta}').value}\`,\`\${document.getElementById('formandoTurma${data[i].idConta}').value}\`)">Editar conta</button></center>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="modal fade" id="eliminacaoFormando${data[i].idConta}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                    <div class="modal-content">
                                    <div class="modal-body">
                                    <div class="container mb-1">
                                        <div class="criarAluno shadow-lg p-3 bg-body rounded">
                                            <div class="row">
                                                <div class="col-4 mx-auto">
                                                    <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/criarAluno.svg" alt="aluno">
                                                </div>
                                                <div class="col-md-8">
                                                    <form>
                                                        <div class="row mt-4">
                                                            <div class="col-sm-6 mt-1">
                                                                <label class="form-label"><strong>Primeiro e último nome</strong></label>
                                                                <input type="text" class="form-control" value="${data[i].nome}" disabled>
                                                            </div>
                                                                <div class="col-sm-6 mt-1">
                                                                    <label class="form-label"><strong>Email</strong></label>
                                                                    <input type="text" class="form-control" value="${data[i].email}" disabled>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-sm-6 mt-1">
                                                                    <label class="form-label"><strong>Curso</strong></label>
                                                                    <select class="form-select col-sm-12" disabled>
                                                                    <option selected> ${data[i].curso}<option>
                                                                    </select>
                                                                </div>

                                                                <div class="col-sm-6 mt-1">
                                                                    <label class="form-label"><strong>Turma</strong></label>
                                                                    <select class="form-select col-sm-12" disabled >
                                                                        <option selected> ${data[i].turma}<option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                    </form>
                                                    <div class="col-sm-12 mt-4">
                                                        <center><button type="button" data-bs-dismiss="modal" class="col-sm-3 btn btn-danger mx-1" style="border-radius: 30px;" onclick="eliminarFormando('${data[i].idConta}')">Eliminar conta</button></center>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `}
                    }
                    })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha das Formandos')
                })
            }
            function fillTabelaAdmins(){
                document.getElementById("tblAdmins").innerHTML = ``;
                const options = {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
                fetch('http://localhost:3000/api/admin/admins',options)
                .then((res) =>{
                    if(res.status ==200 ) return res.json()
                    return null
                })
                .then((data) => {
                    let str = '';
                    if(data){
                        for(let i = 0; i< data.length; i++){
                            
                            str+= `
                                <tr id="trA${data[i].idConta}" onmouseover="document.getElementById('botoesA${data[i].idConta}').style.display = 'flex';" onmouseout="document.getElementById('botoesA${data[i].idConta}').style.display = 'none';">
                                    <td>${data[i].nome}</td>
                                    <td>${data[i].email}</td>
                                    <td class="my-auto" style="display: none;" id="botoesA${data[i].idConta}">
                                        <button type="button"  class="col-6 btn btn-primary mx-1" onclick="resetModalEdicaoAdmin('${data[i].idConta}','${data[i].nome}'); openModal('edicaoAdmin${data[i].idConta}');">editar</button>
                                        <button type="button" class="col-6 btn btn-danger mx-1" onclick="openModal('eliminacaoAdmin${data[i].idConta}');">eliminar</button>
                                    </td>
                                </tr>

                                <div class="modal fade" id="edicaoAdmin${data[i].idConta}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <div class="container mb-1">
                                                    <div class="shadow-lg p-3 bg-body rounded">
                                                        <div class="row">
                                                            <div class="col-4 mx-auto">
                                                                <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/admin.svg" alt="aluno">
                                                            </div>
                                                            <div class="col-md-8 mt-sm-4">
                                                                <form>
                                                                    <div class="row mt-4">
                                                                        <div class="col-sm-6 mt-1">
                                                                            <label for="adminNome${data[i].idConta}" class="form-label"><strong>Primeiro e último nome</strong></label>
                                                                            <input type="text" class="form-control" id="adminNome${data[i].idConta}" placeholder='Ex: "Bernardo Branco"'>
                                                                        </div>
                                                                        <div class="col-sm-6 mt-1">
                                                                            <labelclass="form-label"><strong>Email</strong></label>
                                                                            <input type="text" class="form-control" placeholder='Ex: "bernardobranco@gmail.com"' value="${data[i].email}" disabled>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-12 mt-4 mt-sm-5">
                                                                        <center><button type="button" class="col-sm-3 btn btn-primary  mx-1" style="border-radius: 30px;" data-bs-dismiss="modal" onclick="editarAdmin('${data[i].idConta}',\`\${document.getElementById('adminNome${data[i].idConta}').value}\`)">Editar conta</button></center>                                
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="modal fade" id="eliminacaoAdmin${data[i].idConta}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <div class="container mb-1">
                                                    <div class="shadow-lg p-3 bg-body rounded">
                                                        <div class="row">
                                                            <div class="col-4 mx-auto">
                                                                <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/admin.svg" alt="aluno">
                                                            </div>
                                                            <div class="col-md-8 mt-sm-4">
                                                                <form>
                                                                    <div class="row mt-4">
                                                                        <div class="col-sm-6 mt-1">
                                                                            <label class="form-label"><strong>Primeiro e último nome</strong></label>
                                                                            <input type="text" class="form-control" placeholder='Ex: "Bernardo Branco"' value="${data[i].nome}" disabled>
                                                                        </div>
                                                                        <div class="col-sm-6 mt-1">
                                                                            <label for="adminEmail" class="form-label"><strong>Email</strong></label>
                                                                            <input type="text" class="form-control" placeholder='Ex: "bernardobranco@gmail.com"' value="${data[i].email}" disabled>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-12 mt-4 mt-sm-5">
                                                                        <center><button type="button" class="col-sm-3 btn btn-danger  mx-1" style="border-radius: 30px;" data-bs-dismiss="modal" onclick="eliminarAdmin(${data[i].idConta})">Eliminar conta</button></center>                                
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            `}
                            document.getElementById("tblAdmins").innerHTML = str;
                    }
                    else return;
                    })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha dos admins')
                })
            }
            function fillTabelaDiretoresTurma(){
                document.getElementById("tblDiretores").innerHTML = ``;
                const options = {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
                fetch('http://localhost:3000/api/admin/diretores',options)
                .then((res) =>{
                    if(res.status ==200 ) return res.json()
                    return null
                })
                .then((data) => {
                    let str = '';
                    if(data){
                        for(let i = 0; i< data.length; i++){
                            
                            str+= `
                                <tr id="trA${data[i].idConta}" onmouseover="document.getElementById('botoesD${data[i].idConta}').style.display = 'flex';" onmouseout="document.getElementById('botoesD${data[i].idConta}').style.display = 'none';">
                                    <td>${data[i].nome}</td>
                                    <td>${data[i].email}</td>
                                    <td class="my-auto" style="display: none;" id="botoesD${data[i].idConta}">
                                        <button type="button"  class="col-6 btn btn-primary mx-1" onclick="resetModalEdicaoDiretorTurma('${data[i].idConta}','${data[i].nome}'); openModal('edicaoDiretorTurma${data[i].idConta}');">editar</button>
                                        <button type="button" class="col-6 btn btn-danger mx-1" onclick="openModal('eliminacaoDiretorTurma${data[i].idConta}');">eliminar</button>
                                    </td>
                                </tr>

                                <div class="modal fade" id="edicaoDiretorTurma${data[i].idConta}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <div class="container mb-1">
                                                    <div class="shadow-lg p-3 bg-body rounded">
                                                        <div class="row">
                                                            <div class="col-4 mx-auto">
                                                                <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/admin.svg" alt="aluno">
                                                            </div>
                                                            <div class="col-md-8 mt-sm-4">
                                                                <form>
                                                                    <div class="row mt-4">
                                                                        <div class="col-sm-6 mt-1">
                                                                            <label for="diretorNome${data[i].idConta}" class="form-label"><strong>Primeiro e último nome</strong></label>
                                                                            <input type="text" class="form-control" id="diretorNome${data[i].idConta}" placeholder='Ex: "Bernardo Branco"'>
                                                                        </div>
                                                                        <div class="col-sm-6 mt-1">
                                                                            <label class="form-label"><strong>Email</strong></label>
                                                                            <input type="text" class="form-control" placeholder='Ex: "bernardobranco@gmail.com"' value="${data[i].email}" disabled>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-12 mt-4 mt-sm-5">
                                                                        <center><button type="button" class="col-sm-3 btn btn-primary  mx-1" style="border-radius: 30px;" data-bs-dismiss="modal" onclick="editarDiretorTurma('${data[i].idConta}',\`\${document.getElementById('diretorNome${data[i].idConta}').value}\`)">Editar conta</button></center>                                
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="modal fade" id="eliminacaoDiretorTurma${data[i].idConta}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <div class="container mb-1">
                                                    <div class="shadow-lg p-3 bg-body rounded">
                                                        <div class="row">
                                                            <div class="col-4 mx-auto">
                                                                <img class="img-fluid" style="width:auto;" src="http://localhost:3000/files/Assets/admin.svg" alt="aluno">
                                                            </div>
                                                            <div class="col-md-8 mt-sm-4">
                                                                <form>
                                                                    <div class="row mt-4">
                                                                        <div class="col-sm-6 mt-1">
                                                                            <label class="form-label"><strong>Primeiro e último nome</strong></label>
                                                                            <input type="text" class="form-control" placeholder='Ex: "Bernardo Branco"' value="${data[i].nome}" disabled>
                                                                        </div>
                                                                        <div class="col-sm-6 mt-1">
                                                                            <label class="form-label"><strong>Email</strong></label>
                                                                            <input type="text" class="form-control" placeholder='Ex: "bernardobranco@gmail.com"' value="${data[i].email}" disabled>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-12 mt-4 mt-sm-5">
                                                                        <center><button type="button" class="col-sm-3 btn btn-danger  mx-1" style="border-radius: 30px;" data-bs-dismiss="modal" onclick="eliminarDiretorTurma(${data[i].idConta})">Eliminar conta</button></center>                                
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            `}
                            document.getElementById("tblDiretores").innerHTML = str;
                    }
                    else return;
                    })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha das turmas')
                })
            }
            function fillTabelaEmpresas(){
                document.getElementById("tblEmpresas").innerHTML = ``;
                const options = {
                    method: 'GET',
                    headers: {
                        'authorization': localStorage.getItem("token")
                    }
                }
                fetch(`http://localhost:3000/api/admin/empresas`,options)
                .then((res) =>{
                    if(res.status=200) return res.json()
                    return null
                })
                .then((data) => {
                    if(data){
                        for(let i = 0; i< data.length; i++){
                            
                            document.getElementById("tblEmpresas").innerHTML += `
                            <tr id="trE${data[i].idConta}">
                                <td>${data[i].nome}</td>
                                <td>${data[i].email}</td>`;
                            }
                        }
                    })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha das empresas')
                })
            }
        /****   }fillTabela   ****/
        /****   fillData{   ****/
            async function fillCursos(id){
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
                await    fetch('http://localhost:3000/api/admin/cursos',options)
                .then((res) =>{
                    if(res.status == 200) return res.json()
                    return null
                })
                .then((data) => {
                    if(data){            
                        document.getElementById(id).innerHTML='<option value="0" style="color:gray !important">Selecionar curso</option>';
                        for(let i = 0; i< data.length; i++){
                            document.getElementById(id).innerHTML+= `<option value="${data[i].idCurso}" style="color:black !important">${data[i].sigla} - ${data[i].curso}</option>`
                        }
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha dos cursos')
                })
            }
            async function fillDiretoresTurma(id){
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
                await fetch('http://localhost:3000/api/admin/diretores',options)
                .then((res) =>{
                    if(res.status == 200) return res.json()
                    return null
                })
                .then((data) => {
                    if(data){            
                        document.getElementById(id).innerHTML='<option value="0" style="color:gray !important">Selecionar diretor de turma</option>';
                        for(let i = 0; i< data.length; i++){
                            document.getElementById(id).innerHTML+= `<option value="${data[i].idConta}" style="color:black !important">${data[i].nome} - ${data[i].email}</option>`
                        }
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha dos diretores')
                })
            }
            async function fillAnos(idCurso,id){
                if(idCurso =='0'){
                    document.getElementById(id).disabled = true;     
                    document.getElementById(id).innerHTML='';
                }
                else{
                    const options = {
                        method: 'GET',
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    }
                    await fetch(`http://localhost:3000/api/admin/cursos/${idCurso}`,options)
                    .then((res) =>{
                        if(res.status == 200){
                            return res.json();
                        }
                        else{
                        location.reload();
                        return null;
                        }
                    })
                    .then((data) => {
                        if(data){
                            if(data.duracao == '1'){
                                document.getElementById(id).disabled = true;     
                                document.getElementById(id).innerHTML='<option value="1">1º ano</option>';
                            }
                            else{
                                document.getElementById(id).disabled = false;
                                document.getElementById(id).style.color = 'gray';
                                document.getElementById(id).innerHTML=  `<option value="0" style="color:gray !important">Selecionar o ano</option>
                                                                            <option value="1" style="color:black !important">1º ano</option>
                                                                            <option value="2" style="color:black !important">2º ano</option>
                                                                            <option value="3" style="color:black !important">3º ano</option>`;
                            }
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                        alert('Erro na recolha dos anos')
                    })
                }
            }
            async function fillTurmas(idCurso,id){
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
                await fetch(`http://localhost:3000/api/admin/turmas/${idCurso}`,options)
                .then((res) =>{
                    if(res.status == 200) return res.json()
                    return null
                })
                .then((data) => {
                    if(data){
                        if(data.length > 0){
                            document.getElementById(id).disabled = false;
                            document.getElementById(id).style.color = 'gray';
                            document.getElementById(id).innerHTML='<option value="0" style="color:gray !important">Selecionar turma</option>';
                            for(let i = 0; i< data.length; i++){
                                document.getElementById(id).innerHTML+= `<option value="${data[i].idTurma}" style="color:black !important">${data[i].turma}</option>`
                            }
                        }
                        else{
                            document.getElementById(id).innerHTML='';
                            document.getElementById(id).disabled = true;
                        }
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    alert(`Erro na recolha das tumas para o curso ${idCurso}`)
                })
            }
        /****   }fillData   ****/
        /****   resetModal{   ****/
            function resetModalEdicaoCurso(idCurso,curso,sigla,idArea,duracao){
                document.getElementById(`curso${idCurso}`).value = curso;
                document.getElementById(`sigla${idCurso}`).value = sigla;
                
            
                document.getElementById(`area${idCurso}`).innerHTML= ``;
                fetch('http://localhost:3000/api/unrestricted/areas')
                .then(res => res.json())
                .then(data => {
                    for(let i = 0; i< data.length; i++){
                        document.getElementById(`area${idCurso}`).innerHTML+= `<option value="${data[i].idArea}">${data[i].nome}</option>`
                    }
                    document.getElementById(`area${idCurso}`).value = idArea;
            
                    console.log(duracao);
                    document.getElementById(`duracao${idCurso}`).value = duracao;
                })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha das areas')
                })
            
            }
            async function resetModalEdicaoTurma(idTurma,idCurso,idConta,ano,numero){
                document.getElementById(`numero${idTurma}`).value = numero;
                
                await fillCursos(`turmaCurso${idTurma}`);
                document.getElementById(`turmaCurso${idTurma}`).value = idCurso;
            
                await fillDiretoresTurma(`diretor${idTurma}`);
                document.getElementById(`diretor${idTurma}`).value = idConta;
            
                await fillAnos(idCurso,`ano${idTurma}`);
                document.getElementById(`ano${idTurma}`).style.color = 'black';
                document.getElementById(`ano${idTurma}`).value = ano;
            
            
            }
            async function resetModalEdicaoFormando(idConta,nome,email,idCurso,idTurma){
                document.getElementById(`nome${idConta}`).value = nome;
                document.getElementById(`email${idConta}`).value = email;
            
                if(idTurma == null){
                    document.getElementById(`formandoTurma${idConta}`).disabled = true;
                    fillCursos(`formandoCurso${idConta}`);
                }
                else{
                    await fillCursos(`formandoCurso${idConta}`);
                    document.getElementById(`formandoCurso${idConta}`).value = idCurso;
                
                    await fillTurmas(idCurso,`formandoTurma${idConta}`);
                    document.getElementById(`formandoTurma${idConta}`).style.color = "black";
                    document.getElementById(`formandoTurma${idConta}`).value = idTurma;
                }
                
            
            
            }
            function resetModalEdicaoAdmin(idConta,nome){
                document.getElementById(`adminNome${idConta}`).value = nome;
            }
            function resetModalEdicaoDiretorTurma(idConta,nome){
                document.getElementById(`diretorNome${idConta}`).value = nome;
            }
        /****   }resetModal   ****/
    /****   }renders   ****/


    /****   CRUD{   ****/
        /****   curso CRUD{   ****/
            function criarCurso(curso,sigla,idArea,duracao){
                const options = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            nome:curso,
                            sigla:sigla,
                            idArea: idArea,
                            duracao:duracao
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/cursos/', options)
                .then((res) => {
                    if(res.status===200){
                        document.getElementById('curso').value = '';
                        document.getElementById('sigla').value = '';
                        fillAreas('area');
                        document.getElementById('duracao').value =  '0';
                        fillTabelaCursos();
                    }
                })
                .catch((error) => console.log(error));
            }
            function editarCurso(idCurso,curso,sigla,idArea,duracao){
                const options = {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            idCurso: idCurso,
                            nome:curso,
                            sigla:sigla,
                            idArea: idArea,
                            duracao:duracao
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/cursos/', options)
                .then((res) => {
                    if(res.status===200){
                        fillTabelaCursos();
                    }
                })
                .catch((error) => console.log(error));
            }
            function eliminarCurso(idCurso){
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization :  localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        idCurso: idCurso
                    })
                }
                fetch('http://localhost:3000/api/admin/cursos/', options)
                .then((res) => {
                    if(res.status===200){
                        document.getElementById(`trC${idCurso}`).remove();
                        fillTabelaTurmas();
                    }
                })
                .catch((error) => console.log(error));
            }
        /****   }curso CRUD   ****/
        /****   turma CRUD{   ****/
            function criarTurma(idCurso,idConta,ano,numero){
                const options = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            idCurso:idCurso,
                            idConta:idConta,
                            ano:ano,
                            numero:numero
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/turmas', options)
                .then((res) => {
                    if(res.status===200){
                        fillCursos('turmaCurso');
                        fillDiretoresTurma("diretor");
                        document.getElementById('ano').disabled = true;
                        document.getElementById('ano').innerHTML = '';
                        document.getElementById('numero').value =  '';
                        fillTabelaTurmas();
                    }
                })
                .catch((error) => console.log(error));
            }
            function editarTurma(idTurma,idCurso,idConta,ano,numero){    
                const options = {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            idTurma: idTurma,
                            idCurso: idCurso,
                            ano: ano,
                            numero:numero,
                            idConta: idConta,
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/turmas/', options)
                .then((res) => {
                    if(res.status===200){
                        fillTabelaTurmas();
                        document.getElementById("allTurmas").checked = true;
                        fillTabelaFormandos('');
                    }
                })
                .catch((error) => console.log(error));
            }
            function eliminarTurma(idTurma){
                console.log(idTurma)
                    const options = {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            idTurma: idTurma
                        })
                    }
                    fetch('http://localhost:3000/api/admin/turmas/', options)
                    .then((res) => {
                        if(res.status===200){
                            document.getElementById(`trT${idTurma}`).remove();
                            fillTabelaTurmas();
                            fillTabelaFormandos('');
                        }
                    })
                    .catch((error) => console.log(error));
            }
        /****   }turma CRUD   ****/
        /****   formando CRUD{   ****/
            function criarFormando(nome,email,idTurma){
                const options = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            nome: nome,
                            email: email,
                            idTurma: idTurma,
                            tipoConta:'formando'
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/users', options)
                .then((res) => {
                    if(res.status===200){
                        fillCursos('formandoCurso');
                        document.getElementById('nome').value =  '';
                        document.getElementById('email').value =  '';
                        document.getElementById('formandoTurma').disabled = true;
                        document.getElementById('formandoTurma').innerHTML = '';
            
                        document.getElementById("allTurmas").checked = true;
                        fillTabelaFormandos('');
                    }
                })
                .catch((error) => console.log(error));
            }
            function editarFormando(idConta,nome,idTurma){
                const options = {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            idConta: idConta,
                            nome:nome,
                            idTurma:idTurma
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/users/', options)
                .then((res) => {
                    if(res.status===200){
                        document.getElementById("allTurmas").checked = true;
                        fillTabelaFormandos('');
                    }
                })
                .catch((error) => console.log(error));
            }
            function eliminarFormando(idConta){
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization :  localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        idConta: idConta
                    })
                }
                fetch('http://localhost:3000/api/admin/users/', options)
                .then((res) => {
                    if(res.status===200){
                        document.getElementById("allTurmas").checked = true;
                        fillTabelaFormandos('');
                    }
                })
                .catch((error) => console.log(error));
            }
        /****   }formando CRUD   ****/
        /****   admin CRUD{   ****/
            function criarAdmin(nome,email){
                const options = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            nome: nome,
                            email: email,
                            tipoConta:'admin'
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/users', options)
                .then((res) => {
                    if(res.status===200){
                        document.getElementById('adminNome').value =  '';
                        document.getElementById('adminEmail').value =  '';
            
                        fillTabelaAdmins();
                    }
                })
                .catch((error) => console.log(error));
            }

            function editarAdmin(idConta,nome){
                
                const options = {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            idConta: idConta,
                            nome:nome,
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/users/', options)
                .then((res) => {
                    if(res.status===200){
                        fillTabelaAdmins();
                    }
                })
                .catch((error) => console.log(error));
            }
            function eliminarAdmin(idConta){
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization :  localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        idConta: idConta
                    })
                }
                fetch('http://localhost:3000/api/admin/users/', options)
                .then((res) => {
                    if(res.status===200){
                        fillTabelaAdmins();
                    }
                })
                .catch((error) => console.log(error));
            }
        /****   }admin CRUD   ****/
        /****   }diretor CRUD   ****/
            function criarDiretorTurma(nome,email){
                const options = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            nome: nome,
                            email: email,
                            tipoConta:'diretor de turma'
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/users', options)
                .then((res) => {
                    if(res.status===200){
                        document.getElementById('diretorNome').value =  '';
                        document.getElementById('diretorEmail').value =  '';
            
                        fillTabelaDiretoresTurma()
                    }
                })
                .catch((error) => console.log(error));
            }
            function editarDiretorTurma(idConta,nome){
                
                const options = {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json',
                            Authorization :  localStorage.getItem("token")
                        },
                        body: JSON.stringify({
                            idConta: idConta,
                            nome:nome,
                        })
                    }
            
                fetch('http://localhost:3000/api/admin/users/', options)
                .then((res) => {
                    if(res.status===200){
                        fillTabelaDiretoresTurma();
                    }
                })
                .catch((error) => console.log(error));
            }
            function eliminarDiretorTurma(idConta){
                const options = {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization :  localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        idConta: idConta
                    })
                }
                fetch('http://localhost:3000/api/admin/users/', options)
                .then((res) => {
                    if(res.status===200){
                        fillTabelaDiretoresTurma();
                    }
                })
                .catch((error) => console.log(error));
            }
        /****   }diretor CRUD   ****/
    /****   }CRUD   ****/

/****   Admin{   ****/



//renders
function renderNavDiretorTurma(){
    renderCode("navbar",`<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #3898ec;">
                    <div class="container-fluid">
                        <div class="ml-5"  onclick='renderGerirTurmas();'>
                            <img class="d-inline-block align-text-top" src="http://localhost:3000/files/Assets/logoPlataformaPrincipal.png" alt="img-fluid" height="60px" width="auto" style="cursor: pointer;">
                        </div>
                        
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="collapse navbar-collapse" style="justify-content: end !important;" id="navbarNav">
                            <ul class="navbar-nav" style="cursor: pointer;">
                                <li class="nav-item" onclick="renderGerirTurmas();">
                                    <a class="nav-link" >Gerir Turmas</a>
                                </li>
                                <li class="nav-item" onclick="logout();">
                                    <a class="nav-link">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>`)
}

function renderGerirTurmas(){
    renderCode("content",`
    <div class="container shadow-lg p-3 mb-5 bg-body rounded mt-5">
    <h3>Turmas</h3>
        <div class="table-responsive-sm">
            <table class="table text-center">
            <thead >
                <tr>
                <th scope="col"><input class="form-check-input" type="radio" name="inlineRadioOptions" id="allTurmas" value=0 checked="checked" onchange="fillTabelaFormandosDiretor('')"></th>
                <th scope="col">Turma</th>
                <th scope="col">Diretor de turma</th>
                </tr>
            </thead>
            <tbody id="tblTurmas">
                
            </tbody>
        </table>
        </div>
        </div>
    </div>
    <div class="container shadow-lg p-3 mb-5 bg-body rounded">
   
    <h3>Formandos</h3>

    <div class="table-responsive-sm">
    <table class="table text-center">
        <thead >
        <tr>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">Turma</th>
        </tr>
        </thead>
        <tbody id="tblFormandos">
        </tbody>
    </table>
    </div>
    </div>
    </div>
    `    
    );
    fillTabelaTurmasDiretor();
}
//funções
function fillTabelaTurmasDiretor(){
    document.getElementById("tblTurmas").innerHTML = ``;
    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch('http://localhost:3000/api/diretorTurma/turmas',options)
    .then((res) =>{
        if(res.status ==200 ) return res.json()
        return null
    })
    .then((data) => {
        let str = '';
        if(data){
            for(let i = 0; i< data.length; i++){

                str+= `<tr"><td><input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" onchange="fillTabelaFormandosDiretor(${data[i].idTurma});"></td>`

                if(data[i].turma)
                    str += `<td>${data[i].turma}</td>`
                else
                    str += `<td style="color:red">Sem curso atribuído</td>`

                str += `<td>${data[i].diretorTurma}</td></tr>`
                  
                document.getElementById("tblTurmas").innerHTML = str;
            };
        }
    })
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha das turmas')
    })
}

function fillTabelaFormandosDiretor(idTurma){
    document.getElementById("tblFormandos").innerHTML = ``;
    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch(`http://localhost:3000/api/diretorTurma/formandos/${idTurma}`,options)
    .then((res) =>{
        if(res.status ==200 ) return res.json()
        return null
    })
    .then((data) => {
        let str = '';
        if(data){
            for(let i = 0; i< data.length; i++){

                str+=  `<tr"><td>${data[i].nome}</td>
                            <td>${data[i].email}</td>
                            <td>${data[i].turma}</td>
                        </tr>`
                  
                document.getElementById("tblFormandos").innerHTML = str;
            };
        }
    })
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha das formandos')
    })
}
/****   Formando   ****/

//renders
function renderNavFormando(){
    renderCode("navbar",`<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #3898ec;">
                    <div class="container-fluid">
                        <div class="ml-5"  onclick='renderOfertas();'>
                            <img class="d-inline-block align-text-top" src="http://localhost:3000/files/Assets/logoPlataformaPrincipal.png" alt="img-fluid" height="60px" width="auto" style="cursor: pointer;">
                        </div>
                        
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="collapse navbar-collapse" style="justify-content: end !important;" id="navbarNav">
                            <ul class="navbar-nav" style="cursor: pointer;">
                                <li class="nav-item" onclick="renderOfertas();">
                                    <a class="nav-link">Ofertas</a>
                                </li>
                                <li class="nav-item" onclick="logout();">
                                    <a class="nav-link">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>`)
}
function renderOfertas(){
    renderCode('content',`<div class="container mt-5" style="background-color: #3898ec;">
    <div class="collapse navbar-collapse">
        
    </div>
</div>

<div class="container">
    
    <div id="ofertasConfirmadas" style="display: none">
        <div class="mt-5">
            <h2>Oferta confirmada</h2>
        </div>
    </div>


   

    <div id="ofertasInscritas" style="display: none">
        <div class="mt-3">
            <h2>Inscrições pendentes</h2>
        </div>
    </div>



    <div id="ofertasExistentes" style="display: none">
        <div class="mt-3">
            <h2>Ofertas existentes</h2>
        </div>
    </div>
</div>
`);
fillOfertasFormando();
}
//funções
function fillOfertasFormando(){
    document.getElementById("ofertasConfirmadas").innerHTML=`<div class="mt-3"><h2>Oferta confirmada</h2></div>`
    document.getElementById("ofertasInscritas").innerHTML=`<div class="mt-3"><h2>Inscrições pendentes</h2></div>`
    document.getElementById("ofertasExistentes").innerHTML=`<div class="mt-3"><h2>Ofertas existentes</h2></div>`

    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch(`http://localhost:3000/api/formando/ofertas/confirmadas`,options)
    .then((res) =>{
        if(res.status=200) return res.json()
        return null
    })
    .then((data) => {
        if(data){
            if(data.length>0){
                document.getElementById("ofertasConfirmadas").style.display = "block";
                
                document.getElementById("ofertasInscritas").style.display = "none";
                
                document.getElementById("ofertasExistentes").style.display = "none";
                for(let i = 0; i< data.length; i++){
                    document.getElementById("ofertasConfirmadas").innerHTML += `
                        <div class="container">
                            <div class="mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                                <div class="row">
                                    <div class="logo col-sm-3">
                                        <div class="img">
                                            <img src="http://localhost:3000/files/Assets/empresa.png" class="img-fluid" alt="logo" style="width: 225px; height: 225px;">
                                        </div>
                                    </div>

                                    <div class="col-sm-9 mt-3">
                                        <div class="col">
                                            <h2>${data[i].nome}</h2>
                                        </div>

                                        <div class="col mt-4">
                                            <h4 class="card-text">${data[i].titulo}</h4>
                                        </div>
                                        <div class="col mt-3">
                                            <p style="text-align: justify">${data[i].descricao}</p> 
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
                }
            }else{
                fetch(`http://localhost:3000/api/formando/ofertas/inscritas`,options)
                .then((res) =>{
                    if(res.status=200) return res.json()
                    return null
                })
                .then((data) => {
                    if(data){
                        if(data.length>0){
                            document.getElementById("ofertasInscritas").style.display = "block";
                            for(let i = 0; i< data.length; i++){
                                document.getElementById("ofertasInscritas").innerHTML += `
                                <div class="mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                                        <div class="row">
                                            <div class="logo col-sm-3">
                                                <div class="img">
                                                    <img src="http://localhost:3000/files/Assets/empresa.png" class="img-fluid" alt="logo" style="width: 225px; height: 225px;">
                                                </div>
                                            </div>
            
                                            <div class="col-sm-8 mt-3">
                                                <div class="col">
                                                    <h2>${data[i].nome}</h2>
                                                </div>
            
                                                <div class="col mt-4">
                                                    <h4 class="card-text">${data[i].titulo}</h4>
                                                </div>
                                                <div class="col mt-3">
                                                    <p style="text-align: justify">${data[i].descricao}</p> 
                                                </div>
                                            </div>
                                            <div class="col-sm-1 d-flex align-items-center">
                                                <div class="row">
                                                    <div>
                                                        <button type="button" class="btn btn-success mt-2" onclick="confirmar('${data[i].idOferta}')">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z"/>
                                                            </svg>
                                                        </button>
                                                        <button type="button" class="btn btn-danger mt-2" onclick="desinscrever('${data[i].idOferta}')" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-x-fill" viewBox="0 0 16 16">
                                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"/>
                                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm4 7.793 1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708L8 9.293Z"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                            }
                        }
                    }
                })
                document.getElementById("ofertasExistentes").style.display = "block";

                fetch(`http://localhost:3000/api/formando/ofertas/`,options)
                .then((res) =>{
                    if(res.status=200) return res.json()
                    return null
                })
                .then((data) => {
                    if(data){
                        if(data.length>0){
                            for(let i = 0; i< data.length; i++){
                                document.getElementById("ofertasExistentes").innerHTML += `
                                <div class="mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                                        <div class="row">
                                            <div class="logo col-sm-3">
                                                <div class="img">
                                                    <img src="http://localhost:3000/files/Assets/empresa.png" class="img-fluid" alt="logo" style="width: 225px; height: 225px;">
                                                </div>
                                            </div>
            
                                            <div class="col-sm-8 mt-3">
                                                <div class="col">
                                                    <h2>${data[i].nome}</h2>
                                                </div>
            
                                                <div class="col mt-4">
                                                    <h4 class="card-text">${data[i].titulo}</h4>
                                                </div>
                                                <div class="col mt-3">
                                                    <p style="text-align: justify">${data[i].descricao}</p> 
                                                </div>
                                            </div>
                                            <div class="col-sm-1 d-flex align-items-center">
                                                <div class="row">
                                                    <div>
                                                        <button type="button" class="btn btn-primary mt-2" onclick="inscrever('${data[i].idOferta}');">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-plus-fill" viewBox="0 0 16 16">
                                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z"></path>
                                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm4.5 6V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5a.5.5 0 0 1 1 0Z"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
                            }
                        }else{
                            document.getElementById("ofertasExistentes").innerHTML += `                    
                            <div class="container">
                                <div class="card mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                                    <div class="d-flex justify-content-center mt-5 mb-5">
                                        <h1 style="text-align: center;">Nenhuma oferta disponivel</h1>
                                    </div>
                                </div>
                            </div>
                        `
                        }
                    }
                })
                .catch((err)=>{
                    console.log(err)
                    alert('Erro na recolha das ofertas')
                })
            }
        }
    })
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha das ofertas')
    })
}
function inscrever(idOferta){
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization :  localStorage.getItem("token")
        },
        body: JSON.stringify({
            idOferta: idOferta,
        })
    }

    fetch('http://localhost:3000/api/formando/ofertas/inscrever', options)
    .then((res) => {
        if(res.status===200){
            fillOfertasFormando();
        }
    })
    .catch((error) => console.log(error));
}

function confirmar(idOferta){
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            Authorization :  localStorage.getItem("token")
        },
        body: JSON.stringify({
            idOferta: idOferta,
        })
    }

    fetch('http://localhost:3000/api/formando/ofertas/confirmar', options)
    .then((res) => {
        if(res.status===200){
            fillOfertasFormando();
        }
    })
    .catch((error) => console.log(error));
    }

    function desinscrever(idOferta){
        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization :  localStorage.getItem("token")
            },
            body: JSON.stringify({
                idOferta: idOferta,
            })
        }
    
        fetch('http://localhost:3000/api/formando/ofertas/desinscrever', options)
        .then((res) => {
            if(res.status===200){
                fillOfertasFormando();
            }
        })
        .catch((error) => console.log(error));
        }


    
/****   Empresa   ****/

//renders
function renderNavEmpresa(){
    renderCode("navbar",`<nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #3898ec;">
                    <div class="container-fluid">
                        <div class="ml-5"  onclick='renderMinhaArea()'>
                            <img class="d-inline-block align-text-top" src="http://localhost:3000/files/Assets/logoPlataformaPrincipal.png" alt="img-fluid" height="60px" width="auto" style="cursor: pointer;">
                        </div>
                        
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        
                        <div class="collapse navbar-collapse" style="justify-content: end !important;" id="navbarNav">
                            <ul class="navbar-nav" style="cursor: pointer;">
                                <li class="nav-item" onclick="renderMinhaArea();">
                                    <a class="nav-link">Minha Área</a>
                                </li>
                                <li class="nav-item" onclick="logout();">
                                    <a class="nav-link">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>`)
}
function renderMinhaArea(){
    renderCode("content",`
<div class="container mt-5 d-flex">
    <h2>Ofertas Ativas</h2>
    <button type="button" class="btn btn-primary mx-3 rounded" onclick="fillAreas('area'); openModal('criacaoOferta')" >Criar Oferta</button>
</div>

<div id="ofertasAtivas"></div> 

<div class="container">
<h2>Ofertas finalizadas</h2>

<div id="ofertasFinalizadas"></div> 

<div class="modal fade" id="criacaoOferta" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-body">
        <div class="registo shadow-lg p-3 bg-body rounded">
            <div class="row">
                <div class="imgCriarAnuncio col-sm-6 mt-3">
                    <img class="img-fluid" src="http://localhost:3000/files/Assets/criarAnuncio.svg" alt="work">
                </div>

                <div class="formulario col-sm-6 align-self-center">
                    <form class="needs-validation" novalidate>
                        <div class="row">
                            <div class="col-sm-12 mt-2">
                                <label for="area" class="form-label">Área</label>
                                <select class="form-select" id="area">
                                </select>
                            </div>

                            <div class="col-sm-12 mt-2">
                                <label for="titulo" class="form-label">Título da oferta</label>
                                <input type="text" class="form-control" id="titulo" style="border-radius: 15px;" >
                            </div>

                            <div class="col-sm-12 mt-2">
                                <label for="descricao" class="form-label">Descrição da oferta</label>
                                <textarea class="form-control" id="descricao" style="border-radius: 15px;" rows="3" ></textarea>
                            </div>
            
                            <div class="col-sm-12 mt-2">
                                <label for="vagas" class="form-label">Número de vagas</label>
                                <input type="number" class="form-control" id="vagas" style="border-radius: 15px;" onKeyPress="if(this.value.length==2) return false;" >
                            </div>
                            <center>
                                <div class="col-sm-12 mt-4">
                                    <button type="button" class="btn btn-primary col-sm-6" style="border-radius: 30px;" onclick="criarOferta()">Criar Oferta</button>
                                </div>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
        </div>                                              
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
        </div>
    </div>
</div>
</div>
`);
fillOfertasEmpresa()
}
//funçoes

function fillOfertasEmpresa(){
    document.getElementById("ofertasAtivas").innerHTML = ``;
    document.getElementById("ofertasFinalizadas").innerHTML = ``;
    const options = {
        method: 'GET',
        headers: {
            'authorization': localStorage.getItem("token")
        }
    }
    fetch(`http://localhost:3000/api/empresa/ofertas`,options)
    .then((res) =>{
        if(res.status=200) return res.json()
        return null
    })
    .then((data) => {
        if(data){
            for(let i = 0; i< data.length; i++){
                if(data[i].finalizado == '0'){
                    console.log(data[i].descricao);

                    document.getElementById("ofertasAtivas").innerHTML += `
                    <div class="container">
                        <div class="mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                            <div class="row">
                                <div class="logo col-sm-3">
                                    <div class="img">
                                        <img src="http://localhost:3000/files/Assets/empresa.png" class="img-fluid" alt="logo" style="width: 225px; height: 225px;">
                                    </div>
                                </div>

                                <div class="col-sm-8 mt-3">
                                    <div class="col">
                                        <h2>${data[i].nome}</h2>
                                    </div>

                                    <div class="col mt-4">
                                        <h4 class="card-text">${data[i].titulo}</h4>
                                    </div>
                                    <div class="col mt-3">
                                        <p style="text-align: justify">${data[i].descricao}</p> 
                                    </div>
                                </div>
                                <div class="col-sm-1 d-flex align-items-center">
                                    <div class="row">
                                        <div>
                                            <button type="button" class="btn btn-primary mt-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
                                                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z"/>
                                                </svg>
                                            </button>
                                            <button type="button" class="btn btn-success mt-2" onclick="resetModalEdicaoOferta(\`${data[i].idOferta}\`,\`${data[i].idArea}\`,\`${data[i].titulo}\`,\`${data[i].descricao}\`,\`${data[i].vagas}\`); openModal('edicaoOferta${data[i].idOferta}')">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                </svg>
                                            </button>
                                            <button type="button" class="btn btn-danger mt-2" onclick="openModal('eliminacaoOferta${data[i].idOferta}')" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="edicaoOferta${data[i].idOferta}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                <div class="registo shadow-lg p-3 bg-body rounded">
                                    <div class="row">
                                        <div class="imgCriarAnuncio col-sm-6 mt-3">
                                            <img class="img-fluid" src="http://localhost:3000/files/Assets/criarAnuncio.svg" alt="work">
                                        </div>

                                        <div class="formulario col-sm-6 align-self-center">
                                            <form class="needs-validation" novalidate>
                                                <div class="row">
                                                    <div class="col-sm-12 mt-2">
                                                        <label for="area${data[i].idOferta}" class="form-label">Área</label>
                                                        <select class="form-select" id="area${data[i].idOferta}">
                                                        </select>
                                                    </div>

                                                    <div class="col-sm-12 mt-2">
                                                        <label for="titulo${data[i].idOferta}" class="form-label">Título da oferta</label>
                                                        <input type="text" class="form-control" id="titulo${data[i].idOferta}" style="border-radius: 15px;">
                                                    </div>

                                                    <div class="col-sm-12 mt-2">
                                                        <label for="descricao${data[i].idOferta}" class="form-label">Descrição da oferta</label>
                                                        <textarea class="form-control" id="descricao${data[i].idOferta}" style="border-radius: 15px;" rows="3"></textarea>
                                                    </div>
                                    
                                                    <div class="col-sm-12 mt-2">
                                                        <label for="vagas${data[i].idOferta}" class="form-label">Número de vagas</label>
                                                        <input type="number" class="form-control" id="vagas${data[i].idOferta}" style="border-radius: 15px;" onKeyPress="if(this.value.length==2) return false;" disabled>
                                                    </div>
                                                    <center>
                                                        <div class="col-sm-12 mt-4">
                                                            <button type="button" class="btn btn-primary col-sm-6" style="border-radius: 30px;" data-bs-dismiss="modal" onclick="editarOferta('${data[i].idOferta}')">Editar Oferta</button>
                                                        </div>
                                                    </center>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>                                              
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="eliminacaoOferta${data[i].idOferta}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                <div class="registo shadow-lg p-3 bg-body rounded">
                                    <div class="row">
                                        <div class="imgCriarAnuncio col-sm-6 mt-3">
                                            <img class="img-fluid" src="http://localhost:3000/files/Assets/criarAnuncio.svg" alt="work">
                                        </div>

                                        <div class="formulario col-sm-6 align-self-center">
                                            <form class="needs-validation" novalidate>
                                                <div class="row">
                                                    <div class="col-sm-12 mt-2">
                                                        <label class="form-label">Área</label>
                                                        <select class="form-select" disabled>
                                                            <option selected>${data[i].area}</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-sm-12 mt-2">
                                                        <label class="form-label">Título da oferta</label>
                                                        <input type="text" class="form-control" style="border-radius: 15px;" value="${data[i].titulo}" disabled>
                                                    </div>

                                                    <div class="col-sm-12 mt-2">
                                                        <label class="form-label">Descrição da oferta</label>
                                                        <textarea class="form-control" style="border-radius: 15px;" rows="3" disabled>${data[i].descricao}</textarea>
                                                    </div>
                                    
                                                    <div class="col-sm-12 mt-2">
                                                        <label for="${data[i].vagas}" class="form-label">Número de vagas</label>
                                                        <input type="number" class="form-control"  style="border-radius: 15px;" onKeyPress="if(this.value.length==2) return false;" value="${data[i].vagas}" disabled>
                                                    </div>
                                                    <center>
                                                        <div class="col-sm-12 mt-4">
                                                            <button type="button" class="btn btn-danger col-sm-6" style="border-radius: 30px;" data-bs-dismiss="modal" onclick="eliminarOferta('${data[i].idOferta}')">Eliminar Oferta</button>
                                                        </div>
                                                    </center>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>                                              
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>`
                }
                else{
                     document.getElementById("ofertasFinalizadas").innerHTML = `<div class="container">
                     <div class="mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                         <div class="row">
                             <div class="logo col-sm-3">
                                 <div class="img">
                                     <img src="http://localhost:3000/files/Assets/empresa.png" class="img-fluid" alt="logo" style="width: 225px; height: 225px;">
                                 </div>
                             </div>
                             <div class="col-sm-8 mt-3">
                                <div class="col">
                                     <h2>${data[i].nome}</h2>
                                </div>
                 
                                <div class="col mt-4">
                                     <h4 class="card-text">${data[i].titulo}</h4>
                                </div>
                                <div class="col mt-3">
                                     <p style="text-align: justify">${data[i].descricao}</p>
                                </div>
                             </div>
                             <div class="col-sm-1 d-flex align-items-center">
                                 <div class="row">
                                     <div>
                                         <button type="button" class="btn btn-primary mt-2">
                                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
                                                 <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z"/>
                                             </svg>
                                         </button>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 `;
                }
            }
            if(document.getElementById("ofertasAtivas").innerHTML == '')
                    document.getElementById("ofertasAtivas").innerHTML = `
                    <div class="container">
                        <div class="card mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                            <div class="d-flex justify-content-center mt-5 mb-5">
                                <h1 style="text-align: center;">Nenhuma oferta ativa</h1>
                            </div>
                        </div>
                    </div>
                    `;
                if(document.getElementById("ofertasFinalizadas").innerHTML == ''){
                    document.getElementById("ofertasFinalizadas").innerHTML = `
                    <div class="container">
                        <div class="card mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                            <div class="d-flex justify-content-center mt-5 mb-5">
                                <h1 style="text-align: center;">Nenhuma oferta finalizada</h1>
                            </div>
                        </div>
                    </div>
                    `;
                }
        }
        })
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha das ofertas')
    })
}
async function fillAreas(id){
    await fetch('http://localhost:3000/api/unrestricted/areas')
    .then(res => res.json())
    .then(data => {
        document.getElementById(id).innerHTML='<option value="0" style="color:gray !important">Selecionar área</option>';
        for(let i = 0; i< data.length; i++){
            document.getElementById(id).innerHTML+= `<option value="${data[i].idArea}" style="color:black !important">${data[i].nome} </option>`
    }})
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha das areas')
    })
}

async function resetModalEdicaoOferta(idOferta,idArea,titulo,descricao,vagas){
    document.getElementById(`titulo${idOferta}`).value = titulo;
    document.getElementById(`descricao${idOferta}`).value = descricao;
    document.getElementById(`vagas${idOferta}`).value = vagas;

    await fillAreas(`area${idOferta}`)
        document.getElementById(`area${idOferta}`).value = idArea;
}

function criarOferta(){
    const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization :  localStorage.getItem("token")
            },
            body: JSON.stringify({
                idArea: document.getElementById('area').value,
                titulo: document.getElementById('titulo').value,
                descricao: document.getElementById('descricao').value,
                vagas: document.getElementById('vagas').value,
            })
        }

    fetch('http://localhost:3000/api/empresa/ofertas', options)
    .then((res) => {
        if(res.status===200){
            document.getElementById('area').value =  '0';
            document.getElementById('titulo').value =  '';
            document.getElementById('descricao').value =  '';
            document.getElementById('vagas').value =  '';

            fillOfertasEmpresa();
        }
    })
    .catch((error) => console.log(error));
}

function editarOferta(idOferta){
    const options = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                Authorization :  localStorage.getItem("token")
            },
            body: JSON.stringify({
                idOferta: idOferta,
                idArea: document.getElementById(`area${idOferta}`).value,
                titulo: document.getElementById(`titulo${idOferta}`).value,
                descricao: document.getElementById(`descricao${idOferta}`).value,
                vagas: document.getElementById(`vagas${idOferta}`).value,
            })
        }

    fetch('http://localhost:3000/api/empresa/ofertas', options)
    .then((res) => {
        if(res.status===200){
            fillOfertasEmpresa();
        }
    })
    .catch((error) => console.log(error));
}

function eliminarOferta(idOferta){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            Authorization :  localStorage.getItem("token")
        },
        body: JSON.stringify({
            idOferta: idOferta
        })
    }
    fetch('http://localhost:3000/api/empresa/ofertas', options)
    .then((res) => {
        if(res.status===200){
            fillOfertasEmpresa();
        }
    })
    .catch((error) => console.log(error));
}




/****   Todos   ****/
//renders
function renderFooter(){
    renderCode('foot',`
    <footer class="bg-dark text-white">
    <div class="container text-center text-md-left">
        <div class="row text-center text-md-left">
            <div class="col-md-3 col-sm-3 col-sml-3 mx-auto mt-3">
                <h5 class="text-uppercase mb-4 font-weight-bold text-white">ENTA</h5>
                <p> A Enta, iniciou a sua actividade a 6 de Outubro de 1993, 
                    sendo parte integrante do INOVA até Setembro de 2001, 
                    desde então, tem vindo a promover a formação profissionalizante, 
                    disponibilizando cursos de nível V e nivel IV.
                </p>
            </div>

            <div class="col-md-4 col-sm-3 col-sm-3 mx-auto mt-3">
                <h5 class="text-uppercase mb-4 font-weight-bold text-white">Contact</h5>
                <p>
                    <i class="fas fa-home mr-3"></i> R. de São Gonçalo 101, Ponta Delgada
                </p>
                <p>
                    <i class="fas fa-envelope mr-3"></i> enta@gmail.com
                </p>
                <p>
                    <i class="fas fa-phone mr-3"></i> +351 296 650 660
                </p>
            </div>
        </div>

        <hr class="mb-2">

        <div class="row align-items-center">
            <div class="col-sm-6 col-sm-6">
                <p>Copyright ©2021:<a href="https://www.enta.store/" style="text-decoration: none;"><strong
                            class="text-white"> ENTA</strong></a>
                </p>
            </div>
            <div class="col-sm-6 col-sm-6">
                <div class="text-center text-sm-right">
                    <ul class="list-unstyled list-inline">
                        <li class="list-inline-item">
                            <a href="https://www.facebook.com/escoladenovastecnologias/"
                                class="btn-floating btn-sm text-white" style="font-size: 23px;"><i
                                    class="fab fa-facebook"></i></a>
                        </li>
                        <li class="list-inline-item">
                            <a href="https://www.enta.store/" target="_blank" class="btn-floating btn-sm text-white"
                                style="font-size: 23px;"><i class="fas fa-globe"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>`);
}
//funções
function logout(){
    localStorage.removeItem("token");
    location.reload()
}

/****   Metodos Auxiliares   ****/
function openModal(id) {
    var myModal = new bootstrap.Modal(document.getElementById(id), {keyboard: false});
    myModal.show();
}
function mostrarBotao(x){
    document.getElementById(x).style.display = 'block';
}
function esconderBotao(x){
    document.getElementById(x).style.display = "none";
}
function renderCode(id,codigo){
    document.getElementById(id).innerHTML = codigo;
}
/*
function validaEmail(email) {
    if (email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        return true;
    return false;
}
*/
