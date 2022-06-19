
  <?php 
    $pagetitle = "Otel Ekle";
    include('includes/head.php');
  ?> 
  <body>  
  <?php include('includes/header.php'); ?> 
    <main role="main">
      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Otel Ekle</h1>
        </div>
      </section>
      <div class="py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 offset-lg-3"> 
              <form id="hotel-add-form">
                <div class="form-row">              
                  <div class="form-group col-12">
                    <label for="max-container">Otel Adı</label>
                    <input type="text" class="form-control" name="hotel_name" placeholder="Otel Adını yazınız">
                  </div>
                </div>
                <div class="form-row">              
                  <div class="form-group col-12">
                    <label for="max-container">Otel Puan</label>
                    <input type="number" class="form-control" name="hotel_point" placeholder="Otel Puanını yazınız" min="1" max="10">
                  </div>
                </div>
                <div class="form-row"> 
                  <div class="form-group col-md-12 text-right">
                      <button type="button" id="otel-add-btn" class="btn btn-primary">EKLE</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <?php include('includes/footer.php'); ?>
    <script>
      $('#otel-add-btn').click(function(){
          var items = [];
          if(localStorage.hasOwnProperty('hotels')){
            var items =  JSON.parse(localStorage.getItem('hotels'));
          }          
          hotelName = $('[name="hotel_name"]').val();
          hotelPoint = $('[name="hotel_point"]').val();
          if(hotelName == '' || hotelPoint === ''){
              Swal.fire({
                  icon: 'error',
                  title: 'Tüm alanları doldurunuz',
                 confirmButtonText: 'Tamam'
             });
          }
          else if(hotelPoint <1 || hotelPoint > 10){
              Swal.fire({
                  icon: 'error',
                  title: 'Puan 1-10 arasında olmalıdır.',
                  confirmButtonText: 'Tamam'
             });
          }else {
            var d = new Date();
            let dMonth = ("0" + (d.getMonth() + 1)).slice(-2);
            var date = d.getFullYear()+'-'+dMonth+'-'+d.getDate()+ " " +d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
            let hotel = { hotelname : hotelName,star : parseFloat(hotelPoint).toFixed(1),time : date};
            items.push(hotel);
            $(this).text('EKLENDİ').addClass('btn-success').removeClass('btn-primary').prepend('<svg style="margin-right:10px;" id="i-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2 20 L12 28 30 4" /></svg>');
            localStorage.setItem('hotels', JSON.stringify(items));
          }
      })
    </script>
  </body>
</html>