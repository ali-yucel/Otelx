
  <?php 
    $pagetitle = "Tüm Oteller";
    include('includes/head.php');
  ?> 
  <body>  
  <?php include('includes/header.php'); ?> 
    <main role="main">
      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">Tüm Oteller</h1>
          <div class="hotel-count d-none">(<span></span>) otel bulunmaktadır.</div>
        </div>
      </section>
      <div class="album py-5 bg-light">        
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 mb-4">
              <div id="info" class="d-none text-center">
                <div class="mb-3">Sistemde hiç otel bulunmamaktadır. Hemen Ekleyin yada demo datayı yükleyin!</div>
                <a href="/otelx/otel-ekle.php" class="btn btn-primary">
                  <svg style="width:30px;" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Add</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg>
                  <span>OTEL EKLE</span>
                </a>
                <a id="demo-data" href="javascript:void(0)" onclick="demoDataUpload()" class="btn btn-outline-primary ml-2">
                  <span>DEMO DATAYI YÜKLE</span>
                </a>
              </div>
              <select class="form-control" id="sorting-select">
                <option value="">Sıralama</option> 
                <option value="asc">Puan (Artan)</option>
                <option value="desc">Puan (Azalan)</option>
              </select>
              <div id="result" class="row"></div>
              
              <div class="paginate-wrapper">
                <button class="btn btn-outline-primary" id="prev-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                  </svg>
                </button>
                <div class="paginate"></div>
                <button class="btn btn-outline-primary" id="next-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </button> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </main> <?php include('includes/footer.php'); ?> 
    <script src="assets/js/script.js" crossorigin="anonymous"></script>
  </body>
</html>