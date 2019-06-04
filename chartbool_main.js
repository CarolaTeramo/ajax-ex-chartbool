$(document).ready(function(){

  var url_base = 'http://157.230.17.132:4022/sales';

  stampa_get_ajax();

  function stampa_get_ajax (){

    $.ajax({
      'url': url_base,
      'method': 'GET',
      //'data' : dato_ajax,
      'success': function(dato){
        //console.log(dato);

        var vendite_x_mese = {};

        for (var i = 0; i < dato.length; i++) {
          //console.log(dato[i]);
          var data_corrente = dato[i].date;
          var quantita_corrente = dato[i].amount;
          //console.log(quantita_corrente);
          var data_corrente_modif = data_corrente.slice(3, 5);
          //console.log(data_corrente_modif);
          var mesi_trovati = Object.keys(vendite_x_mese);

          if (!mesi_trovati.includes(data_corrente_modif)) {
            //allora inizializzo il valore corrente ad 1 e lo assegno alla propietà giusta
            vendite_x_mese[data_corrente_modif] = quantita_corrente;
          } else {
            //altrimenti incremento
            vendite_x_mese[data_corrente_modif] += quantita_corrente;
          }
          //console.log(vendite_x_mese);
        //fine for
        }
        // for (var field in vendite) {
        //   var chiave = field;
        //   console.log(chiave);
        // }
        var assex = Object.keys(vendite_x_mese);
        console.log(assex);
        //salvo i dati in un array
        var assey = Object.values(vendite_x_mese);
        console.log(assey);

        ogni_mese = [];
        for (var i = 0; i < assex.length; i++) {
          var assex_mese = moment([2017, 0, 31]).month(assex[i]-1).format('MMMM');
          console.log(assex_mese);
          ogni_mese.push(assex_mese);
          console.log(ogni_mese);
        }

        //grafico 1
        var ctx1 = document.getElementById('myChart1').getContext('2d');

        var myChart1 = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ogni_mese,
                datasets: [{
                    label: 'Fatturato mensile',
                    data: assey,
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1
                }
              ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        //fine grafico 1


        //ciclo per SECONDO grafico
        var vendite_x_venditore = {};

        for (var i = 0; i < dato.length; i++) {
          //console.log(dato[i]);
          var venditore_corrente = dato[i].salesman;
          var quantita_corrente = dato[i].amount;

          var venditori_trovati = Object.keys(vendite_x_venditore);

          if (!venditori_trovati.includes(venditore_corrente)) {
            //allora inizializzo il valore corrente ad 1 e lo assegno alla propietà giusta
            vendite_x_venditore[venditore_corrente] = quantita_corrente;
          } else {
            //altrimenti incremento
            vendite_x_venditore[venditore_corrente] += quantita_corrente;
          }
          //console.log(vendite_x_venditore);
        //fine for
        }

        var asse_x = Object.keys(vendite_x_venditore);
        //console.log(assex);
        //salvo i dati in un array
        var asse_y = Object.values(vendite_x_venditore);
        //console.log(assey);


        //grafico 2
        var ctx2 = document.getElementById('myChart2').getContext('2d');

        var myChart2 = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: asse_x,
                datasets: [{
                    label: 'Vendite per venditore',
                    data: asse_y,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }
              ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });




      },
      'error': function(){
        alert('no')
      }
    });
  //fine funzione stampa
  }

//fine document ready
});
