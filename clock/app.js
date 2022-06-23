$(document).ready(function () {
   //Random Ucapan
  //  Pagi
  let pagi = [
    "'Selamat pagi dan tetap produktif'",
    "'Waktunya Sholat Sunnah Dhuha'",
    "'Bismillah for ALhamdulillah'",
    ];
let rand = Math.random();
let pagiRange = pagi.length;
let randIndex = Math.floor(rand * pagiRange);
let randomPagi = pagi[randIndex];
  //  Siang
  let siang = [
    "'Bertahan di tengah hari yang bikin gerah'",
    "'Jangan lupa Sholat Dzuhur'",
    "'Istirahat sejenak'",
    ];
let siangRange = siang.length;
let siangIndex = Math.floor(rand * siangRange);
let randomsiang = siang[siangIndex];
  //  Sore
  let sore = [
    "'Ngabuburit Yuk'",
    "'Cukup melelahkan yah'",
    "'Jangan lupa Sholat Ashar'",
    ];
let soreRange = sore.length;
let soreIndex = Math.floor(rand * soreRange);
let randomsore = sore[soreIndex];
  //  petang
  let petang = [
    "'Siap - siap berbuka puasa'",
    "'Baca do'a sebelum berbuka'",
    "'Jangan lupa Sholat Maghrib'",
    ];
let petangRange = petang.length;
let petangIndex = Math.floor(rand * petangRange);
let randompetang = petang[petangIndex];
  //  petang
  let malam = [
    "'Ayo Sholat Tarawih'",
    "'Ingat Sholat Isya'",
    "'Jangan tidur dulu'",
    "'Tadarus Al - Qur'an dulu sebelum tidur'"
    ];
let malamRange = petang.length;
let malamIndex = Math.floor(rand * malamRange);
let randommalam = malam[malamIndex];
  //  sahur
  let sahur = [
    "'Sahurrr Sahurrr'",
    "'Makan Secukupnya'",
    "'Jangan tidur setelah sahur'",
    ];
let sahurRange = sahur.length;
let sahurIndex = Math.floor(rand * sahurRange);
let randomsahur = sahur[sahurIndex];
  //  shubuh
  let shubuh = [
    "'Yok Sholat Shubuh bejamaah'",
    "'Jangan lupa tadarus'",
    "'Semangat memulai hari'",
    ];
let shubuhRange = shubuh.length;
let shubuhIndex = Math.floor(rand * shubuhRange);
let randomshubuh = shubuh[shubuhIndex];
  function currentTime() {
    var date = new Date();
    var day = date.getDay();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var month = date.getMonth();
    var currDate = date.getDate();
    var year = date.getFullYear();
    var monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var showDay = $('.dayDiv span')
    var midDay= "AM"
    midDay = (hour>=12)? "PM":"AM";
    hour = (hour==0)?12:((hour<12)? hour:(hour-12));
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    currDate= updateTime(currDate);
    $("#time").html(`${hour}:${min}`);
    $("#sec").html(`${sec}`);
    $("#med").html(`${midDay}`);
    $("#full-date").html(`${monthName[month]}, ${currDate} ${year}`);
    showDay.eq(day).css('opacity','1')

  
console.log(hour)
  if(hour >= 05 && hour < 11 && midDay == "AM" ){
    $("#ucapan").html(randomPagi)
  }else if(hour < 03 && midDay == "PM"){
    $("#ucapan").html(randomsiang)
  }else if(hour >= 03 && hour < 06 && midDay == "PM" ){
    $("#ucapan").html(randomsore)
  }else if(hour >= 06 && hour < 07 && midDay == "PM"){
    $("#ucapan").html(randompetang)
  }else if(hour > 07 && hour <= 12 && midDay == "PM"){
    $("#ucapan").html(randommalam)
  }else if(hour > 01 && hour < 04 && midDay === "AM"){
    $("ucapan").html(randomsahur)
  }else if(hour >= 04 && hour < 5 && midDay == "AM"){
    $("#ucapan").html(randomshubuh)
  }
  }
  updateTime = function(x){
    if(x<10){
      
      return "0"+x
    }
    else{
      
      return x;
    }
    
  }
  setInterval(currentTime,1000);

  
  $.ajax({
    url : `https://api-alquranid.herokuapp.com/surah`,
    type : 'get',
    dataType : 'json',
    success : function(result){
      console.log(result.data[0])
      $.each(result.data, function(key,rs) {
        console.log(rs)
        console.log(rs.audio)
        $("#pilih").append(`<option class="" value="${rs.nomor}">${rs.nama}</option>`)

      });
       
       
        $('.loader').addClass('hidden');
    },
    error : $(document).ajaxError(function(){
        alert("An error occurred!");
      }),
    
});

$("#pilih").val()

$(".button").on('click', function(){
  $(".button").html(`<i class="loader fas fa-cog fa-spin"></i> Generating...`)
  $.ajax({
    url : `https://api-alquranid.herokuapp.com/surah/${$("#pilih").val()}`,
    type : 'get',
    dataType : 'json',
    success : function(result){
      $(".button").html("Generate Ayat")
      console.log($("#pilih option:selected").html())
      console.log(result)
      $(".bacaan").empty()
      $.each(result.data, function(key,rs) {
        console.log(rs)
        console.log(rs.ar)
        $(".bacaan").append(`<div class="my-3">
        <div class="flex items-center">
        <p class="w-full block font-serif text-2xl text-right">${rs.ar}</p><p class="mx-3 inline-block border-2 rounded-full border-slate-900 p-2">${rs.nomor}</p>
        </div>
        <div class="my-1 flex items-center"><p class="rounded-lg mx-3 border-2 border-slate-800 inline-block p-3">${rs.nomor}</p><p>${rs.id}</p></div>
        </div>`)
      }); 
    },
    error : $(document).ajaxError(function(){
        alert("An error occurred!");
      }),
    
});
  $.ajax({
    url : `https://api-alquranid.herokuapp.com/surat/${$("#pilih option:selected").html()}`,
    type : 'get',
    dataType : 'json',
    success : function(result){
      console.log($("#pilih option:selected").html())
      console.log(result.data)
      $(".namasurat").html(result.data.nama)
      $(".arti").html(result.data.arti)
      $(".murotal").empty()
      $(".murotal").append(`<audio controls><source src="${result.data.audio}" type="audio/mpeg"></audio>`)
    },
    error : $(document).ajaxError(function(){
        alert("An error occurred!");
      }),
    
});



});

})