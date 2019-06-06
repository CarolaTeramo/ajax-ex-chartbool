$(document).ready(function(){

  var template_html_select_one = $('#entry-template_select_one').html();
  var template_function_select_one = Handlebars.compile(template_html_select_one);

  var template_html_select_two = $('#entry-template_select_two').html();
  var template_function_select_two = Handlebars.compile(template_html_select_two);


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

          // //se metto parseInt
          // function zero_giorno (mes){
          //   if (mes <10){
          //     return '0' + mes
          //   } else {
          //     return mes
          //   }
          //   return mes;
          // }
          // var formato_mesi = zero_giorno (data_corrente_modif);
          // //console.log(days);
          // //console.log(zero_giorno (j));
          // var data_modif =  formato_mesi;
          // //console.log(data_modif);


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


        var no_stringa = {};
        for (var field in vendite_x_mese) {
          //console.log(field);
          var pp = parseInt(field);
          //console.log(pp);
          no_stringa[pp] = vendite_x_mese[field]
          //console.log(no_stringa);
        }


        var ordinato ={};
        Object.keys(no_stringa).sort().forEach(function(key){
          ordinato[key] = no_stringa[key];
        })
        console.log(ordinato);

        var assex = Object.keys(ordinato);
        //console.log(assex);
        //salvo i dati in un array
        var assey = Object.values(ordinato);
        console.log(assey);

        //per il trimestre
        var quarter = [];
        var primo_trimestre = assey[0]+ assey[1]+ assey[2];
        var secondo_trimestre = assey[3]+ assey[4]+ assey[5];
        var terzo_trimestre = assey[6]+ assey[7]+ assey[8];
        var quarto_trimestre = assey[9]+ assey[10]+ assey[11];
        quarter.push(primo_trimestre, secondo_trimestre, terzo_trimestre, quarto_trimestre)
        console.log(quarter);

        ogni_mese = [];
        for (var i = 0; i < assex.length; i++) {
          var assex_mese = moment([2017, 0, 31]).month(assex[i]-1).format('MMMM');
          //console.log(assex_mese);
          ogni_mese.push(assex_mese);
          //console.log(ogni_mese);
        }

        for (var i = 0; i < ogni_mese.length; i++) {
          var variabile_hldbar_one = {
            'mese_vendita': ogni_mese[i],
          };
          var html_finale_select_one = template_function_select_one(variabile_hldbar_one);
          // appendo questo var all id che è nell'html
          $('.seleziono_mese').append(html_finale_select_one);

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

        // grafico 1 bis

        var ctx3 = document.getElementById('myChart3').getContext('2d');

        var myChart3 = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [{
                    label: 'Fatturato mensile',
                    data: quarter,
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
        //fine grafico 1 bis



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
        //console.log(asse_x);
        //salvo i dati in un array
        var asse_y = Object.values(vendite_x_venditore);
        //console.log(asse_y);

        for (var i = 0; i < asse_x.length; i++) {
          var variabile_hldbar_two = {
            'nome_venditore': asse_x[i],
          };
          var html_finale_select_two = template_function_select_two(variabile_hldbar_two);
          // appendo questo var all id che è nell'html
          $('.seleziono_venditore').append(html_finale_select_two);

        }
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
        //fine grafico 2
        });



      // fine success
      },

      'error': function(){
        alert('no')
      }
    });
  //fine funzione stampa
  }

  $('.bt_modifica').click(function(){
    //leggi input
    var valore_inserito = $('.input_modifica').val();
    var valore_inserito_int = parseInt(valore_inserito);
    console.log(valore_inserito_int);
    //azzera input
    $('.input_modifica').val('');
    //prendo valore selezione tendina
    var nome_scelto = $('.seleziono_venditore').val();
    var mese_scelto = $('.seleziono_mese').val();
    var mese_scelto_format = moment([2017, 0, 31]).month(mese_scelto).format("DD/MM/YYYY");
    console.log(mese_scelto_format);

    // //altra chiamata per inserire valore input
    var dato_ajax_post = {
      'salesman': nome_scelto,
      'amount': valore_inserito_int,
      'date': mese_scelto_format,
    }

    function valida_dati_inseriti (nome_scelto, mese_scelto, valore_inserito){
      if (nome_scelto.length == 0 || mese_scelto.length == 0 || isNaN(valore_inserito) || valore_inserito<= 0) {
        return false;
      }
      return false;
    }

    var controllo = valida_dati_inseriti (nome_scelto, mese_scelto, valore_inserito);
    if (controllo == 'true') {
      // al posto di JSON.stringify avrei potuto mettere
      //parseInt nella chiamata GET nella lettura di dato[i].amount
      $.ajax({
        'url': url_base,
        'method': 'POST',
        'contentType': 'application/json',
        'data' : JSON.stringify(dato_ajax_post),
        'success': function(dato_post){
          console.log(dato_post);
          stampa_get_ajax();
        },
        'error': function(){
          alert('no')
        }
      //fine ajax post
      });


    } else {
      alert('Valori inseriti non conformi')
    }

    //recupero valore inserito e ristampo tutto



  //fine click
  });

  //chiamata ajax per cancellare

  // $.ajax({
  //   'url': url_base + '/' +,
  //   'method': 'DELETE',
  //   'success': function(dato_delete){
  //     console.log(dato_delete);
  //     //stampa_get_ajax();
  //   },
  //   'error': function(){
  //     alert('no')
  //   }
  // });

//fine document ready
});
