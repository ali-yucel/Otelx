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
let curPage = localStorage.hasOwnProperty('active-page') ? localStorage["active-page"] : 1;

async function init() {
    if(localStorage.hasOwnProperty('hotels')){
        wrapper = document.querySelector('#result');        
        data = JSON.parse( localStorage["hotels"]);
        renderTable();
        document.querySelector('#next-button').addEventListener('click', nextPage, false);
        document.querySelector('#prev-button').addEventListener('click', previousPage, false);
        document.querySelector('.paginate-button').addEventListener('click', paginateButton, true);
        document.querySelector('#sorting-select').addEventListener('change', sortTable, true);
    }else {
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
    };
    if(localStorage.hasOwnProperty('sorting-val') && localStorage["sorting-val"] != ''){
      $('select#sorting-select option[value="'+localStorage["sorting-val"]+'"]').prop("selected", true);
      data.sort(function (a, b) {
        if(a.star == b.star){
          return Date.parse(b.time) - Date.parse(a.time); // by time...  
        }else {
          if(localStorage["sorting-val"] == "asc"){
              return a.star - b.star;
          }else {
              return b.star - a.star; 
          }
        }
      }); 
    }else {
      data.sort(function (a, b) {
        return Date.parse(b.time) - Date.parse(a.time);
      });
    }
    data.filter((row, index) => {
          let start = (curPage-1)*pageSize;
          let end =curPage*pageSize;
          if(index >= start && index < end) return true;
          
    }).forEach(c => {
      var listIndex = Math.abs(pageSize-count-(pageSize*curPage));
      result += `
      <div class="col-md-6 col-lg-12" title="${c.time}">
        <div class="hotel-card hotel-card-${listIndex}">
          <div class="hotel-card-image">
          <img src="/otelx/assets/images/placeholder.jpg" alt="Hotel Name">
          </div>
          <div class="hotel-card-body">
          <div class="hotel-card-name">${c.hotelname}</div>
          <div class="hotel-card-point"><span>${c.star}</span> Puan</div>
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
  activePage(localStorage["active-page"]);
}

function paginate(){
    let pResult = '';
    let totalPage = data.length/pageSize;
    $('.paginate-wrapper .paginate').html('');
    for (let index = 1; index <= Math.ceil(totalPage); index++) {
        pResult += `<button class="btn btn-outline-primary paginate-button" onclick="paginateButton(${index})">${index}</button>`;
    }
    document.querySelector('.paginate-wrapper .paginate').innerHTML = pResult;

    if(curPage > 1){
      document.querySelector('#prev-button').classList.add("active-page");
    }else {
      document.querySelector('#prev-button').classList.remove("active-page");
    }
    if((curPage * pageSize) < data.length) {
      document.querySelector('#next-button').classList.add("active-page");
    }else {
      document.querySelector('#next-button').classList.remove("active-page");
    }
}

function paginateButton(index) {
    curPage = index; 
    renderTable();
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
  $('.paginate > button').removeClass('active-page');
  $('.paginate > button').eq(page -1).addClass('active-page');
  localStorage.setItem('active-page', page);
}

function pointPlus(index) {
   let point = parseFloat($('.hotel-card-'+index).find('.hotel-card-point > span').text());
   let lastPoint = (point+1).toFixed(1);
  if(lastPoint < 10){
    $('.hotel-card-'+index).find('.hotel-card-point > span').text(lastPoint);
    data[index].star = lastPoint; 
    localRender(data); 
    renderTable();
    activePage(localStorage["active-page"]);
  }
}

function pointMinus(index) {
    let point = parseFloat($('.hotel-card-'+index).find('.hotel-card-point > span').text());
    let lastPoint = (point-1).toFixed(1);
    if(lastPoint > 0){
        $('.hotel-card-'+index).find('.hotel-card-point > span').text(lastPoint);
        data[index].star = lastPoint; 
        localRender(data);
        renderTable();
        activePage(localStorage["active-page"]);
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
            if(localStorage["active-page"] > Math.ceil(data.length/pageSize)){
              $('.paginate button:last-child').trigger('click');
            }
            if(data.length < 1){
                localStorage.removeItem('active-page');
                localStorage.removeItem('hotels');
                localStorage.removeItem('sorting-val');
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

function sortTable(){
  let sortingVal = document.querySelector('#sorting-select').value;
  if(sortingVal != ""){ 
    localStorage.setItem('sorting-val', sortingVal);
  }else {
    localStorage.removeItem('sorting-val');
  }
  renderTable();
}
 
 function localRender(object){
    localStorage.setItem('hotels', JSON.stringify(object));
 }

 function demoDataUpload() {
    let demoData =  [
        {hotelname:"Papillon Zeugma Relaxury",star: 7.5,time:"2012-01-17 13:51:50"},
        {hotelname:"Maxx Royal Belek Golf Resort",star: 9.7,time:"2020-02-22 13:51:50"},
        {hotelname:"Vogue Hotel Supreme Bodrum",star: 8.3,time:"2010-10-23 13:51:50"},
        {hotelname:"Nirvana Dolce Vita",star: 7.6,time:"2002-01-20 13:51:50"},
        {hotelname:"Kaya Palazzo Golf Resort",star: 6.3,time:"1998-11-13 13:51:50"},
        {hotelname:"Voyage Torba",star: 9.1,time:"2001-01-26 13:51:50"},
        {hotelname:"Elexus Hotel Resort Casino",star: 9.3,time:"2021-02-17 13:51:50"},
        {hotelname:"Limak Cyprus Deluxe Hotel",star: 8.8,time:"2017-03-16 13:51:50"},
        {hotelname:"Acapulco Resort Convention",star: 8.4,time:"2005-08-06 13:51:50"},
        {hotelname:"Merit Royal Hotel & Casino",star: 8.7,time:"2008-07-06 13:51:50"},
        {hotelname:"My Ella Bodrum Resort & Spa",star: 9.8,time:"2015-01-22 13:51:50"},
        {hotelname:"Korumar Ephesus Beach & Spa Resort",star: 8.4,time:"2010-12-10 13:51:50"},
    ];
    localRender(demoData);
    document.location.reload(true);
} 