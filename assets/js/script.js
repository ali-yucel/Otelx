// function getNotUnique(array) {
//     var map = new Map();
//     array.forEach(a => map.set(a, (map.get(a) || 0) + 1));
//     return array.filter(a => map.get(a) > 1);
// }

document.addEventListener('DOMContentLoaded', init, false);

var hotels = [];
let data, table, sortCol;
let sortAsc = false;
const pageSize = 5;
let curPage = 1;

async function init() {
    if(localStorage.hasOwnProperty('hotels')){
        wrapper = document.querySelector('#result');        
        data = JSON.parse( localStorage["hotels"]);
        renderTable();
        paginate();
        activePage();
        document.querySelector('#next-button').addEventListener('click', nextPage, false);
        document.querySelector('#prev-button').addEventListener('click', previousPage, false);
        document.querySelector('.paginate-button').addEventListener('click', paginateButton, true);
    }else {
        // let resp = await fetch('https://yeniaksesuar.com/otelx/data.json');
        // data = await resp.json();
        $('#info').removeClass('d-none');
        $('.paginate-wrapper').addClass('d-none');
        $('#sorting-select').addClass('d-none');
    }
}

function renderTable() {
  // create html
  let count  = 0;
  let result = '';
    if(data.length > 0) {
      $('.hotel-count').removeClass('d-none').find('span').text(data.length);
    }
    data.filter((row, index) => {
          let start = (curPage-1)*pageSize;
          let end =curPage*pageSize;
          if(index >= start && index < end) return true;
          
    }).forEach(c => {
      var listIndex = Math.abs(pageSize-count-(pageSize*curPage));
      result += `
      <div class="col-md-6 col-lg-12">
        <div class="hotel-card hotel-card-${listIndex}">
          <div class="hotel-card-image">
          <img src="/otelx/assets/images/placeholder.jpg" alt="Hotel Name">
          </div>
          <div class="hotel-card-body">
          <div class="hotel-card-name">${c[0]}</div>
          <div class="hotel-card-point"><span>${c[1]}</span> Puan</div>
          <div class="hotel-card-point-buttons">
              <button class="btn btn-outline-primary point-plus" onclick="pointPlus(${listIndex})">PUAN ARTIR</button>
              <button class="btn btn-outline-primary point-minus" onclick="pointMinus(${listIndex})">PUAN AZALT</button>
          </div>
          </div>
          <button class="btn btn-danger delete-hotel" onclick="deleteHotel(${listIndex})"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg></button>
      </div>
      </div>`;
      count++;    
  });
  wrapper.innerHTML = result;
  paginate();
}

function paginate(){
    var totalPage = data.length/pageSize;
    $('.paginate-wrapper .paginate').html('');
    for (let index = 1; index <= Math.ceil(totalPage); index++) {
        // console.log(index);
        $('.paginate-wrapper .paginate').append(`<button class="btn btn-outline-primary paginate-button" onclick="paginateButton(${index})">${index}</button>`)   
    }
}

function paginateButton(index) {
    curPage = index; 
    renderTable();
    localStorage.setItem('active-page', index);
    activePage(index);
}

function previousPage() {
    if(curPage > 1) curPage--;
    renderTable(); 
    activePage(curPage);
}
  
function nextPage() {
    if((curPage * pageSize) < data.length) curPage++;
    renderTable();
    activePage(curPage);
}

function activePage(page=1){
  $('.paginate > button').eq(page -1).addClass('active-page');
  localStorage.setItem('active-page', page);
}

function pointPlus(index) {
   let point = parseFloat($('.hotel-card-'+index).find('.hotel-card-point > span').text());
   let lastPoint = (point+1).toFixed(1);
  if(lastPoint < 10){
    $('.hotel-card-'+index).find('.hotel-card-point > span').text(lastPoint);
    data[index][1] = lastPoint; 
    localRender(data); 
 }
}

function pointMinus(index) {
    var point = parseFloat($('.hotel-card-'+index).find('.hotel-card-point > span').text());
    let lastPoint = (point-1).toFixed(1);
    if(lastPoint > 0){
        $('.hotel-card-'+index).find('.hotel-card-point > span').text(lastPoint);
        data[index][1] = lastPoint; 
        localRender(data);
    }
 }

function deleteHotel(index) {
    let hotelCardName = $('.hotel-card-'+index).find('.hotel-card-name').text();
    Swal.fire({
        title: 'Oteli Sil',
        html: `<b>${hotelCardName}</b> i silmek istediğinizden emin misiniz?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oteli Sil',
        cancelButtonText: 'Vazgeç'
      }).then((result) => {
        if (result.isConfirmed) {
            data.splice(index, 1);
            localRender(data);
            renderTable();
            activePage(localStorage["active-page"]);
            if(data.length < 1){
                localStorage.removeItem('active-page');
                localStorage.removeItem('hotels');
                document.location.reload(true);
            }
          Swal.fire(
            {
                title : 'Otel Silindi!',
                icon: 'success'
            }
          )
        }
      })
}

 function localRender(object){
    localStorage.setItem('hotels', JSON.stringify(object));
 }

 function demoDataUpload() {
    let demoData = [
        ["Papillon Zeugma Relaxury","7.5"],
        ["Maxx Royal Belek Golf Resort","9.7"],
        ["Vogue Hotel Supreme Bodrum","8.3"],
        ["Nirvana Dolce Vita","7.6"],
        ["Kaya Palazzo Golf Resort","4.2"],
        ["Voyage Torba","9.1"],
        ["Elexus Hotel Resort Casino","9.33"],
        ["Limak Cyprus Deluxe Hotel","9.1"],
        ["Acapulco Resort Convention Spa","8.4"],
        ["Merit Royal Hotel & Casino","8.7"],
        ["My Ella Bodrum Resort & Spa","9.8"],
        ["Korumar Ephesus Beach & Spa Resort","8.4"]
    ];
    localRender(demoData);
    document.location.reload(true);
} 