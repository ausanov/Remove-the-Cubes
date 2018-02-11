var obj, JS_obj, current_obj;

if (typeof(Storage) !== "undefined") {
  if(JSON.parse(localStorage.getItem("key")) == null) {
    obj = [];
    JS_obj = JSON.stringify(obj);
    localStorage.setItem("key", JS_obj);
  } else{
    obj = [];
    obj = JSON.parse(localStorage.getItem("key"));
  }
} else {
  alert("Sorry, your browser does not support Web Storage...");
}

function toTable (new_obj) {
  obj.push(new_obj);
  JS_obj = JSON.stringify(obj);
  localStorage.setItem("key", JS_obj);
}

var time = 60, min, sec;
var timerID, points = 0;

function setCube() {
    var colors = ['green', 'red', 'blue', 'orange', 'violet'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var count = Math.floor(Math.random() * 2 + 1);

    var top = 0, right = 0;

    for(var i = 0; i < count; i++) {
      top = Math.floor(Math.random() * ($(".square").height() - 120) + 20);
      right = Math.floor(Math.random() * ($(".square").width() - 220) + 20);
      var flag = Math.round(Math.random() * 1);
      if(flag == 1) $("<div>").addClass('cube').css({"top": top, "right": right, "background-color": color}).appendTo(".square");
      else $("<div>").addClass('half-cube').css({"top": top, "right": right, "background-color": color}).appendTo(".square");
    }
}

$(document).ready(function() {

  $(".start").on('click', function () {

    if($(".start").hasClass("start")) {
      points = 0;
      sec = time % 60;
      min = (time - sec) / 60;
      if(sec == '0'|| sec < 10) sec = '0' + sec;
      $(".minute").text(min + ':' + sec);
      $('#btn-start').removeClass('start').html('Pause');

      setCube();

      timerID = setInterval(function () {
        time--;
        sec = time % 60;
        min = (time - sec) / 60;
        if(sec == '0'|| sec < 10) sec = '0' + sec;
        $(".minute").text(min + ":" + sec);

        if(sec == 0) {

          clearTimeout(timerID);

          time = 60;

          $(".square").empty();
          $(".minute").text('1:00');
          $(".sum_points").text('0');
          $('#btn-start').addClass('start').html('Start');
          $("#pts").html('You scored: ' + points + ' points!');
          $("#add-record").modal('show');
        }
      },1000);
    }else{
      $('#btn-start').addClass('start').html('Start');
      clearTimeout(timerID);
    }
  });

  $(".save").on('click', function () {
    current_obj = [$('#name').val(), points];
    toTable(current_obj);
    $('#btn-start').addClass('start').html('Start');
  });

  $(".new-game").on('click', function () {
    clearTimeout(timerID);
    time = 60;
    points = 0;
    $('#btn-start').addClass('start').html('Start');
    $(".square").empty();
    $(".minute").text('1:00');
    $(".sum_points").text('0');
  });

  $(".see-table").on('click', function () {
    var record = JSON.parse(localStorage.getItem("key"));
    if(record.length != null) {
      $("#record").empty();
      for(var i = 0; i < record.length; i++) {
        $("<span>" + record[i][0] + " - " + record[i][1] + "</span><br/>").appendTo("#record");
      }
    }
  });

  $(".square").on('click', '.cube', function () {
    var current_cube = $(this);
    if(!($("#btn-start").hasClass('start'))) {
      current_cube.remove();
      setCube();
      points++;
      $(".sum_points").html(points);
    }
  });

  $(".square").on('click', '.half-cube', function () {
    var current_cube = $(this);
    if(!($("#btn-start").hasClass('start'))) {
      current_cube.remove();
      setCube();
      points += 3;
      $(".sum_points").html(points);
    }
  });

});
