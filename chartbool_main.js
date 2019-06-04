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

        var vendite = {};

        for (var i = 0; i < 10; i++) {
          console.log(dato[i]);
          var data_corrente = dato[i].date;
          var quantita_corrente = dato[i].amount;
          //console.log(quantita_corrente);
          var data_corrente_modif = data_corrente.slice(3, 5);
          //console.log(data_corrente_modif);
          var mesi_trovati = Object.keys(vendite);

          if (!mesi_trovati.includes(data_corrente_modif)) {
            //allora inizializzo il valore dello sport corrente ad 1 e lo assegno alla propietà giusta
            vendite[data_corrente_modif] = quantita_corrente;
          } else {
            //altrimenti incremento di 1
            vendite[data_corrente_modif] += quantita_corrente;
          }
          //console.log(vendite);
        }
        var assex = Object.keys(vendite);
        console.log(assex);

        //salvo i dati in un array
        var assey = Object.values(vendite);
        console.log(assey);

      },
      'error': function(){
        alert('no')
      }
    });
  //fine funzione stampa
  }

//fine document ready
});

//uso handlebars
// var template_html = $('#entry-template').html();
// var template_function = Handlebars.compile(template_html);

// var html_finale = template_function(variabile_hldbar);
// // appendo questo var all id che è nell'html
// $('.cont').append(html_finale);
