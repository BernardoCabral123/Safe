function renderCode(id,codigo){
    document.getElementById(id).innerHTML = codigo;
}

function validacao() {  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('click', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          else{
            cConta();
          }
          form.classList.add('was-validated')
        }, false)
      })
}

async function fillIlhas(){
    await fetch('http://localhost:3000/api/localizacao/ilhas')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i< data.length; i++){
            document.getElementById("ilha").innerHTML+= `<option value="${data[i].idIlha}">${data[i].nome}</option>`
    }})
    .catch((err)=>{
        console.log(err)
        alert('Erro na recolha das ilhas')
    })
}

async function fillConcelhos(){
    if(document.getElementById("ilha").value != 0){
        document.getElementById('concelho').disabled = false;
        await fetch(`http://localhost:3000/api/localizacao/concelhos/${document.getElementById("ilha").value}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("concelho").innerHTML="";
            for(let i = 0; i< data.length; i++){
                document.getElementById("concelho").innerHTML+= `<option value="${data[i].idConcelho}">${data[i].nome}</option>`
        }})
        .catch((err)=>{
            alert('Erro na recolha dos concelhos')
        })
    }
    else{

        document.getElementById('concelho').value = 0;
        document.getElementById('concelho').disabled = true;
    }
}


  /*                        <div class="col-sm-6 mt-1">
                            <label for="ilha" class="form-label">Ilha</label>
                            <select class="form-select" aria-label="Default select example" id="ilha" onchange="fillConcelhos();" required>
                                <option selected></option>
                            </select>
                        </div>
            
                        <div class="col-sm-6 mt-1">
                            <label for="conselho" class="form-label">Concelho</label>
                            <select class="form-select" aria-label="Default select example" id="concelho" disabled required>
                                <option selected></option>
                            </select>
                        </div>

                        <div class="col-sm-6 mt-1">
                            <label for="morada" class="form-label">Rua</label>
                            <input type="text" class="form-control" id="rua" maxlength="100" required>
                        </div>

                        <div class="col-sm-6 mt-1">
                            <label for="nRua" class="form-label">Nº Porta</label>
                            <input type="text" class="form-control" id="numero" maxlength="10" required>
                        </div> 
                        */