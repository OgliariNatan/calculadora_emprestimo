//Inicia o JS
"use strict"; //usa o mode restrito do JS5

/*
*Define a funlção calculate() chamadas pela rotinas de tratamentos
*/
function calculate() {
    //pesquisa os valores de entrada e saída
    var amount = document.getElementById("amount");
    console.log(amount.value);
    var apr = document.getElementById("apr");
    console.info(apr.value);
    //alert('Juros anuais: ' + apr.value)
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totallinterest = document.getElementById("totallinterest");

    //obtem a entrada do usuario sem tratamento de valores 
    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;

    //calcula o valor mensal de pagamento
    var x = Math.pow(1 + interest, payments); //calcula potencias
    var monthly = (principal * x * interest) / (x - 1);

    //verificar se é um numero finito e mostrar no campo 
    if (isFinite(monthly)) {
        //preenche os campos de saida arrendodando para 2 casa decimais
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totallinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

        //salvar a entrada do usuario para que possamos recuperar na proxima em que visitar
        save(amount.value, apr.value, years.value, zipcode.value);

        //anuncio: localiza as financeiras no código postal exibido
        try {//captura qualquer erro
            getLenders(amount.value, apr.value, years.value, zipcode.value);
        }
        catch (e) {/*e ignora estes erro, poderá tratar estes erros */ }

        //iremos traçar o gráfico
        chart(principal, interest, monthly, payments);
    }
    else { //caso seja um numero infinito
        payment.innerHTML = ""; //apaga o conteudo
        total.innerHTML = "";
        totallinterest = "";
        chart(); //vazio apaga o gráfico
    }
}