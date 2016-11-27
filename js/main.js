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

  $self.addClass("expanded selected");
  $(".backdrop").show();

  $(".backdrop").velocity({
    opacity: 1
  }, {
    duration: 700
  });

  $self.center();
});

$(document).on("click", ".details-close", function() {

  var $el = $(this).closest(".element");

  $el.removeClass("detailed selected");
  
  $el.
    velocity({ 
      width: 60,
      height: 60,
      translateX: 0, 
      translateY: 0,
      translateZ: 0
    }, 
    { 
      easing: [ 1.000, -0.025, 0.525, 0.905 ], 
      duration: 800, 
      queue: false,
      complete: function() {
        $el.removeClass('expanded');
        $el.find('.details').hide();
      }
    });

  $(".backdrop").velocity({
    opacity: 0
  }, {
    duration: 700,
    complete: function() {
      $(".backdrop").hide();
    }
  });

});

$(window).bind('resize', function() {
    $('.element.expanded').center();
});

Handlebars.registerHelper("coordinatePos", function(pos) {
  var coordinatePos = (pos) * 60;
  return coordinatePos;
});

Handlebars.registerHelper("classify", function(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
});

Handlebars.registerHelper("checkEmpty", function(val) {
    if(val === null) return "Unknown";
    return val;
});

jQuery.fn.center = function () {
  var top = Math.max(0, (($(window).height() - 480) / 2) + $(window).scrollTop());
  var left = Math.max(0, (($("#table").width() - 640) / 2) + $(window).scrollLeft());

  var origTop = this.css("top").split("px")[0];
  var origLeft = this.css("left").split("px")[0];
  
  $(this).find('.details').show();
  
  $(this).
    velocity({
      width: 640,
      height: 480,
      translateX: left - +origLeft,
      translateY: top - +origTop,
      translateZ: 0      
    }, 
    { 
      easing: [ 1.000, -0.025, 0.525, 0.905 ], 
      duration: 800, 
      queue: false,
      complete: function() {
        $(this).addClass('detailed');
        countTo($(this));
      }
    });

  return this;
}

function countTo ($el) {
  $el.find('.count').each(function () {
      if($(this).text() === 'Unknown') return;
      $(this).prop('Counter', 0).animate({
          Counter: $(this).text()
      }, {
          duration: 1000,
          easing: 'swing',
          step: function (now) {
              $(this).text(now.toFixed(4));
          }
      });
  });
}
