function render(data) {
  var source   = $("#table-template").html();
  var template = Handlebars.compile(source);

  var rendered = template(data);
  $("#table").html(rendered);
}

$.get("json/periodic.json", function(data) {
  render(data);
});

$(document).on("click", ".element:not(.expanded)", function() {

  var $self = $(this);

  $self.addClass("expanded"); //.delay(600).addClass("detailed");

  setTimeout(function() {
    $self.addClass("detailed");
  }, 600);

  // $('#table').addClass("blurred");  
  $(".backdrop").show();
  $self.center();
});

$(document).on("click", ".element.detailed", function() {
  $(this).removeClass("detailed");
  // $('#table').removeClass("blurred");
  $(this).
    velocity({ width: 70, height: 70, translateX: 0, translateY: 0 }, 
    { easing: [ 1.000, -0.025, 0.525, 0.905 ], 
      duration: 100, 
      queue: false,
      complete: function() {
        $(this).removeClass('expanded')
      }
    });
  $(".backdrop").hide();
});

$(window).bind('resize', function() {
    $('.element.expanded').center();
});

Handlebars.registerHelper("coordinatePos", function(pos) {
  var coordinatePos = (pos) * 70;
  return coordinatePos;
});

Handlebars.registerHelper("classify", function(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
});

jQuery.fn.center = function () {
  var top = Math.max(0, (($(window).height() - 480) / 2) + $(window).scrollTop());
  var left = Math.max(0, (($("#table").width() - 640) / 2) + $(window).scrollLeft());

  var origTop = this.css("top").split("px")[0];
  var origLeft = this.css("left").split("px")[0];

  var transX = left - +origLeft;
  var transY = top - +origTop;

  $(this).
    velocity({ width: 640, height: 480, translateX: transX, translateY: transY }, 
    { easing: [ 1.000, -0.025, 0.525, 0.905 ], duration: 100, queue: false,});

  // console.log("top", transX);
  // console.log("left", transY);

  // this.css({"transform": translate});

  return this;
}