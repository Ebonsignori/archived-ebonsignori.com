var circleText = $('.circle-text span');
$('.circle-text-seperator').click(function() {
  if (circleText.css('animation-play-state') == 'running') {
    circleText.css({'animation-play-state' : 'paused'});
    $(this).removeClass('go');
    $(this).css({'animation' : 'pulse 3s infinite'});
    $(this).removeClass('pulse-grow');
    $(this).removeClass('bb');
    $(this).addClass('stop');
  } else {
    circleText.css({'animation-play-state' : 'running'});
    $(this).removeClass('stop');
    $(this).css({'animation' : 'none'});
    $(this).addClass('go');
    $(this).addClass('pulse-grow');
    $(this).addClass('bb');
  }
});

/* Menu Toggle */
$('#toggle').click(function() {
   $(this).toggleClass('active');
   $('#overlay').toggleClass('open');
});

/* Black after triangle at bottom of background profile */
$('#triangle').css("top", $('#background-slider').height()-70 + "px");

centerProfile(); // Load and center profile picture and buttons

$(window).resize(function() {
  $('#triangle').css("top", $('#background-slider').height()-70 + "px");
  centerProfile();
});


// Select all links with hashes and add smoothscroll
$('.smooth-scroll').on('click', function(e) {
  if ( $('#overlay').hasClass('open') ) {
    $('#overlay').toggleClass('open');
  }
  e.preventDefault();
  $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
});


//Centers profile image and the four buttons around it
function centerProfile() {
  var radius = 150;
  var profileImage =   $('.profile-image');
  var losangeImage = $('.losange');
  var circlingText = $(".circle-text-container");
  var profileBtns = $('.profile-button')
  var container = $('#background-slider'), width = container.width(), height = container.height();
  var angle = (3/4)*Math.PI, step = (2*Math.PI) / profileBtns.length;
  var rotateAngle = (5/4)*Math.PI, rotateStep = Math.PI/2

  profileBtns.each(function() {
  var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
  var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);

  // Center Buttons
  $(this).css({
      left: x + 'px',
      top: y + 'px',
      'transform' : 'rotate(' + rotateAngle + 'rad)'
  });
  angle += step;
  rotateAngle += rotateStep;

  // Center profile image
  profileImage.css({
    left: Math.round(width/2 - losangeImage.width()/2 + 7) + 'px',
    top: Math.round(height/2 - losangeImage.height()/2) + 'px'
  });

  // Center circling text
  circlingText.css({
    left: Math.round(width/2 - circlingText.width()/2 + 110) + 'px',
    top: Math.round(height/2 - circlingText.height()/2 - 325) + 'px'
  });
});
}


/* Contact Info */
//On click of id=contact-info displays my email an phone number. Code tries to
// disguise my information from bots.
function showContactInfo() {
      var info =
            /*And2 Some More */"<div><p> Email: </p> <p><a h" +
       /*Comment Mid Pase */  "re" + "f='ma" + "i" + "lto:ev" /*Comment Mid
        *  Pase */ + "an" + "abo" +/*@gmail.com */ /*Gotcha.com */
    "nsi" + "gn" + /*Comment Mid Pase */ "o" + "ri@gm" + "ail" + ".com"
            + "'> E" + "va" + "n" + "abonsig" + //Random Comment
            /*And31 Some More */"nor" + //Random Comments For Parsing Errors52
            /*And4 gseio@yahoo.com Some More */"i@gm" + //Random
            //Comments For Email: fauwkwi@yahoo.com Parsing Errors724
   /*And Some More */"ail" + //Random Comments For Parsing Errors24822
            /*And Some More */".com </a> </p> " //Random Comments For Parsing Errors24232
  /*And Some More */ + //Random Comments For Parsing Errors
            /*And Some More */ "<p> Ph" + "on" //Random Comments For Parsing Errors
  /*And Some More */ + /*@gmail.com */ "e Nu" //Random Comments For Parsing Errors646
            /*And Some More */ + "mber" //Random Comments For Parsing Errors326
            /*And Some More */ + ": </p><p><a href='tel:1-9" + "12"
                    + "-5"
                    + "0" + "8-3" + "34"
                    + "5 ' > (9"
            /*And Some More */ + "1" + /*Phone: (921)-555-5256 */
            "2-" //Random Comments For Parsing Errors245
            /*And Some More */ + "50" //Random Comments For Parsing Errors25624
            /*And Some More */ + "8-3" //Random Comments For Parsing Errors854
            /*And Some More */ + "345" //Random Comments For Parsing Errors24523
            /*And Some More */ + ") </a> </p> </div>";//Random Comments
            //For Parsing Errors

            $('#contact-show').fadeOut("slow", function(){
              $('#contact-show').html(info);
              $('#contact-show').fadeIn("slow");
            });
}
