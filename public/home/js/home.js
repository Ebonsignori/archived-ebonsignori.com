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


// Scroll to about section if passing by user scroll or smooth scroll to it
var $root = $('html, body');
var trigger = false;
var contactInfoShown = false;
var unlockScreen = false;

function elementScrolled(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
}

/* Detect if device is mobile */
var isMobile = false;
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

$(window).scroll(function () {
    if (!unlockScreen) {
        // This is then function used to detect if the element is scrolled into view
        if (isMobile) {
            if (elementScrolled('#about-section')) {
                if (!trigger) {
                    TerminalIntro();
                    trigger = true;
                    $root.animate({scrollTop: $('#about-section').offset().top}, 500, 'linear');
                }
            }
        } else {
             if (elementScrolled('#center-about-scroll')) {
                if (!trigger) {
                    TerminalIntro();
                    trigger = true;
                    $root.animate({ scrollTop: $('#about-section').offset().top}, 500, 'linear');
                }
            }
        }
    }

    if (elementScrolled('#contact-show') && !contactInfoShown) {
        contactInfoShown = true;
        showContactInfo();
    }
});


// Smooth Scroll
$('.smooth-scroll').on('click', function(e) {
  if ( $('#overlay').hasClass('open') ) {
      $('#toggle').toggleClass('active');
      $('#overlay').toggleClass('open');
  }
  // Make sure not to lock screen at about section
  if ($(this).attr('href') == "#about-section") {
      $root.animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  } else if (!unlockScreen && $(this).attr('href') != "#about-section") {
      unlockScreen = true;
      $root.animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
      setTimeout(function () {
                  unlockScreen = false;
              }, 500);
  } else {
      $root.animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  }

});

// Contact Honey-pot
function submitContact() {
    if ($("#honey").val() == "") {
        $("#contact-form").submit();
    } else {
        console.log("Sugar Sugar.... Ooooh _____ _____")
    }
}


//Centers profile image and the four buttons around it
function centerProfile() {
  var radius = 150;
  var profileImage =   $('.profile-image');
  var losangeImage = $('.losange');
  var circlingText = $(".circle-text-container");
  var profileBtns = $('.profile-button');
  var container = $('#background-slider'), width = container.width(), height = container.height();
  var angle = (3/4)*Math.PI, step = (2*Math.PI) / profileBtns.length;
  var rotateAngle = (5/4)*Math.PI, rotateStep = Math.PI/2;

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
            /*And2 Some More */"<p class='contact-email'> Email <br/><a h" +
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
            /*And Some More */ "<p class='contact-phone'> Mo" + "b" //Random Comments For Parsing Errors
  /*And Some More */ + /*@gmail.com */ "i" //Random Comments For Parsing Errors646
            /*And Some More */ + "le" //Random Comments For Parsing Errors326
            /*And Some More */ + ": <br/><a href='tel:1-9" + "12"
                    + "-5"
                    + "0" + "8-3" + "34"
                    + "5 ' > (9"
            /*And Some More */ + "1" + /*Phone: (921)-555-5256 */
            "2)-" //Random Comments For Parsing Errors245
            /*And Some More */ + "50" //Random Comments For Parsing Errors25624
            /*And Some More */ + "8-3" //Random Comments For Parsing Errors854
            /*And Some More */ + "345" //Random Comments For Parsing Errors24523
            /*And Some More */ + "</a> </p>";//Random Comments
            //For Parsing Errors

            $('#contact-show').fadeOut("slow", function(){
              $('#contact-show').html(info);
              $('#contact-show').fadeIn("slow");
            });
}

/* Contact Form */
$(document).ready(function() {
	// Test for placeholder support
    $.support.placeholder = (function(){
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    // Hide labels by default if placeholders are supported
    if($.support.placeholder) {
        $('.form-label').each(function(){
            $(this).addClass('js-hide-label');
        });

        // Code for adding/removing classes here
        $('.form-group').find('input, textarea').on('keyup blur focus', function(e){

            // Cache our selectors
            var $this = $(this),
                $parent = $this.parent().find("label");

            if (e.type == 'keyup') {
                if( $this.val() == '' ) {
                    $parent.addClass('js-hide-label');
                } else {
                    $parent.removeClass('js-hide-label');
                }
            }
            else if (e.type == 'blur') {
                if( $this.val() == '' ) {
                    $parent.addClass('js-hide-label');
                }
                else {
                    $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
                }
            }
            else if (e.type == 'focus') {
                if( $this.val() !== '' ) {
                    $parent.removeClass('js-unhighlight-label');
                }
            }
        });
    }
});




/* All of Terminal JS */
/* Global variables */
var waitingForInput = false;
var waitingFor = "none";

// Contact message information
var message_name;
var message_email;
var message_subject;
var message_content;

// Intro Messages
var typeSpeed = 45;
var pauseBetween = 300;
var quitIntro = false;
var unlockButtons = true;
var firstMessage = "Hello and welcome to the About Evan Bonsignori Terminal!";
var secondMessage = "This terminal acts as my \"about me\" section.";
var thirdMessage = "To use it, type a supported command and press enter.";
var fourthMessage = "For instance, this is how you would view the supported commands:";
var commandMessage = "commands";
var finalMessage = "If you'd rather see a more traditional about me page, press the traditional button, otherwise press the terminal button.";

/* Stick taskbar to top of div */
$('#upper').each(function(){

  var $that = $(this),
      $page = $that.closest('#shell');

  $page.scroll(function(){
    $that.css({top: this.scrollTop});
  });

});

// Remove filler text on click
$("#filler").click(function(){
    $(this).remove();
});

/* On enter key, cycle through commands */
$('#main').keyup(function(e) {
   if(e.keyCode == 13){
     query = $('#query').text().toLowerCase();
     //Check if waiting for input of another function
     if (waitingForInput == true) {
       console.log("Waiting for state: " + waitingFor);
       switch (waitingFor) {
           // When waiting for "cd ." response
         case "cd .":
           if (query == 'y') {
             OutputQuery("Ok. Cool.");
           } else if (query == 'n') {
             OutputQuery("Alright then... let me take you somewhere.");
             setTimeout(function () {
               window.location.href = "http://www.staggeringbeauty.com/";
             }, 2000); // Call function after 2 seconds
           } else {
             OutputQuery("Hey no, only 'y' or 'n' please");
           }
           break;

           // Send message series of prompts and input
           case "send_message_prompt":
               // If yes ask for name
               if (query == 'y') {
                   waitingForInput = true;
                 waitingFor = "send_message_name";
                 OutputQuery("Please enter your name:");
               } else if (query == 'n') {
                   waitingForInput = false;
                 waitingFor = "none";
                 OutputQuery("Ok, that's fine by me.");
               } else {
                   waitingForInput = true;
                 OutputQuery("Please only enter 'y' or 'n'");

               }
               break;

           case "send_message_name":
               message_name = query;
                waitingForInput = true;
               waitingFor = "send_message_email";
               OutputQuery("Please enter your email:");
               break;
           case "send_message_email":
               message_email = query;
               OutputQuery("Please enter the subject of your message:");
               waitingForInput = true;
               waitingFor = "send_message_subject";
               break;
           case "send_message_subject":
               message_subject = query;
               OutputQuery("Please enter the contents of your message:");
               waitingForInput = true;
               waitingFor = "send_message_contents";
               break;
           case "send_message_contents":
           message_content = query;
           waitingForInput = false;
           waitingFor = "none";
           SendMessage(true)
           break;
       }
        // waitingForInput = false;
        // waitingFor = "none";
        return;
     }

     // Command name:
     if (query.substring(0,2) == "cd") {
       ChangeDirectoryCommand(query.substring(3,query.length));
       return;
     } else if (query.substring(0,3) == "man") {
       ManualCommand(query.substring(4,query.length));
       return;
     }
     // Cycle through supported commands
     switch(query) {
       //whoami - About me intro
       case "whoami":
       case "who is evan?":
       case "who are you?":
       case "who is evan bonsignori?":
       case "tell me about yourself":
         OutputQuery("My name is Evan Bonsignori, and although I make a hobby of web development, I'm really not a web developer.\n" +
             "I'm a problem solver regardless of domain. I dual majored in computer science and applied mathematics, and\n" +
             "I love finding excuses to <a href=\"#portfolio\">make projects</a>, especially when they direct me in learning something new.");
         break;

       // help - List Commands
       case "help":
       case "?":
       case "what?":
       case "commands":
       case "compgen -c":
         OutputQuery("Commands Supported: <br> <ul> <li>whoami</li> <li>find</li> <li>history</li> <li>uname</li> <li>pwd </li> <br> <li>ls</li> <li>cd</li> <li>mail</li> <li>reset</li> <li>clear</li> <br> <li>commands</li>  <li>man</li> </ul>");
         break;

       // clear - Clear Terminal
       case "clear":
       case "clc":
       case "clean":
          ClearTerminal();
          break;

          // reset - Reset Terminal
       case "reset":
       case "restart":
       case "intro":
         ResetTerminal();
         break;

       // uname - Site description
       case "uname":
       case "hostname":
       case "uname -a":
       case "what is this site?":
          OutputQuery("ebonsignori.com, the homepage of Evan Bonsignori. It's made from scratch using bootstrap for some of the front-end and the Django framework for all of the backend. I started it to gain experience with AWS and Digital Ocean server based hosting, but eventually moved it to shared hosting. The process of creating it has been a learning experience. It now contains a portfolio, blog, and this cool (at least I think so) terminal.");
          break;

       // history - My history
       case "history":
       case "are you a web developer?":
         OutputQuery("I didn't know what an HTML tag looked like until March of 2017! Since, I've referenced hundreds of resources, pages of documentation, and a Django Udemy course to learn the basics of full stack web development. Though my other work isn't as \"from scratch\" as this site, you can <a href=\"#portfolio\"> check out my budding Portfolio.</a>");
         break;

       //pwd - output domain
         case "domain":
         case "where am i?":
       case "pwd":
         OutputQuery("<a href='https://ebonsignori.com'>https://ebonsignori.com</a> (I'd say Duh, but this is really on me for not making this command more useful)");
         break;

       // ls - list site links
       case "ls":
       case "ls -a":
       case "ls -al":
       case "ls -l":
       case "ls -la":
         OutputQuery("[Like most commands in this terminal, this isn't an accurate ls command, however, you can cd to any 'directory' if you'd like, or simply click on them] <br> <ul> <li><a href=\"https://ebonsignori.com/#about-section\">. </li> <li>..</li> <li><a href=\"#background-slider\">home</li> <li><a href=\"blog\">blog</li> <li><a href=\"#portfolio\">portfolio</li> <br> <li><a href=\"#contact-section\">contact</li>  <li><a href=\"https://www.facebook.com/ebonsignori\">facebook</li> <li><a href=\"https://github.com/Ebonsignori\">github</li> <li><a href=\"https://www.linkedin.com/in/evan-bonsignori-33167787\">linkedin</li> <li><a href=\"https://www.instagram.com/ebonsignori/\">instagram</li> <br> <li><a href=\"acknowledgements\">acknowledgements</li> </ul>");
         break;

       // find - contact Info
       case "contact info":
       case "find . -name \"Evan Bonsignori\"":
       case "find":
       case "find evan":
       case "find evan bonsignori":
          OutputQuery(" Email: <a href=\"mailto:evanabonsignori@gmail.com\"> Evanabonsignori@gmail.com </a> <br> Phone Number: <a href=\"tel:1-912-508-3345\"> (912-508-3345) </a>");
         break;

         // mail - send message through contact forms
     case "mail":
     case "contact":
     case "message":
         SendMessage();
         break;

       // Default no valid command entered
       default:
         OutputQuery("Please enter a valid command. <br> Type \"help\" or \"commands\" for list of valid commands.");

     } // End Switch
   } // End If
}); // End Function

// Called to output argument to terminal
function OutputQuery(input) {
  $('.enter').last().append(input + "<br>");
  NewQuery();
  return;
}

function NewQuery() {
  $('#query').attr('contenteditable','false');
  $('#query').removeAttr('id');
  $('#main').append("<span class=\"fore\">about@ebonsignori.com</span>:<span class=\"accent\"> $ </span>");
  $('#main').append("<div class=\"enter\" id=\"query\" contenteditable=\"true\"></div>");

  /* Scroll to bottom of terminal */
  var outerTop = $('#shell').scrollTop();
  var outerBottom = outerTop + $('#shell').height();
  var innerTop = $('#main')[0].offsetTop;
  var innerBottom = innerTop + $('#main').height();
  if (innerBottom > outerBottom)
  $('#shell').scrollTop(innerBottom - $('#shell').height() + 7);

  /* Set textcursor focus */
  var div = document.getElementById("query");
  div.onfocus = function() {
      window.setTimeout(function() {
          var sel, range;
          if (window.getSelection && document.createRange) {
              range = document.createRange();
              range.selectNodeContents(div);
              range.collapse(true);
              sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
          } else if (document.body.createTextRange) {
              range = document.body.createTextRange();
              range.moveToElementText(div);
              range.collapse(true);
              range.select();
          }
      }, 1);
  };
  div.focus();

  return;
}

// Introduction that runs through a series of introduction messages
function TerminalIntro() {
    quitIntro = false;
    unlockButtons = false;
    $('#main').html("<button class=\"quit-intro-btn\" onclick=\"QuitIntro();\">Skip To Terminal</button> <button class=\"traditional-intro-btn\" onclick=\"MinimizeTerminal(true);\">Show Traditional About Me</button> <br/> <span class=\"fore\"></span><span class=\"accent\"> $ </span> <div class=\"enter\" id=\"query\" contenteditable=\"true\"></div>");
    (function printMsg (i) {
        if (quitIntro) {
            quitIntro = false;
            ClearTerminal();
            return;
        }
       setTimeout(function () {
          $('.enter').last().append(firstMessage.charAt(i));
          i++;
          if (i < firstMessage.length) {
              printMsg(i);
          } else {
              $('.enter').last().append("<br/>");
              setTimeout(function () {
                  SecondMessage();
              }, pauseBetween);
          }
       }, typeSpeed)
    })(0);
}

function SecondMessage() {
    $('.enter').append("<span class=\"accent\"> $ </span>");
     (function printMsg (i) {
         if (quitIntro) {
            quitIntro = false;
            ClearTerminal();
            return;
        }
       setTimeout(function () {
          $('.enter').last().append(secondMessage.charAt(i));
          i++;
          if (i < secondMessage.length) {
              printMsg(i);
          } else {
               $('.enter').last().append("<br/>");
              setTimeout(function () {
                  ThirdMessage();
              }, pauseBetween);
          }
       }, typeSpeed)
    })(0);
}

function ThirdMessage() {
    $('.enter').append("<span class=\"accent\"> $ </span>");
     (function printMsg (i) {
         if (quitIntro) {
            quitIntro = false;
            ClearTerminal();
            return;
        }
       setTimeout(function () {
          $('.enter').last().append(thirdMessage.charAt(i));
          i++;
          if (i < thirdMessage.length) {
              printMsg(i);
          } else {
               $('.enter').last().append("<br/>");
              setTimeout(function () {
                  FourthMessage();
              }, pauseBetween);
          }
       }, typeSpeed)
    })(0);
}

function FourthMessage() {
    $('.enter').append("<span class=\"accent\"> $ </span>");
     (function printMsg (i) {
         if (quitIntro) {
            quitIntro = false;
            ClearTerminal();
            return;
        }
       setTimeout(function () {
          $('.enter').last().append(fourthMessage.charAt(i));
          i++;
          if (i < fourthMessage.length) {
              printMsg(i);
          } else {
               $('.enter').last().append("<br/>");
               NewQuery();
              setTimeout(function () {
                  CommandMessage();
              },  pauseBetween); // Wait 3 seconds for reading command output
          }
       }, typeSpeed)
    })(0);
}

function CommandMessage() {
     (function printMsg (i) {
         if (quitIntro) {
            quitIntro = false;
            ClearTerminal();
            return;
        }
       setTimeout(function () {
          $('.enter').last().append(commandMessage.charAt(i));
          i++;
          if (i < commandMessage.length) {
              printMsg(i);
          } else {
               $('.enter').last().append("<br/> <br/>");
               $('.enter').last().append("Commands Supported: <br> <ul> <li>whoami</li> <li>find</li> <li>history</li> <li>uname</li> <li>pwd </li> <br> <li>ls</li> <li>cd</li> <li>mail</li> <li>reset</li> <li>clear</li> <br> <li>commands</li>  <li>man</li> </ul>" + "<br/><br/>");
              setTimeout(function () {
                  FinalMessage()
                  }, 2000);
          }
       }, typeSpeed)
    })(0);
}

function FinalMessage() {
     (function printMsg (i) {
         if (quitIntro) {
            quitIntro = false;
            ClearTerminal();
            return;
        }
       setTimeout(function () {
          $('.enter').last().append(finalMessage.charAt(i));
          i++;
          if (i < finalMessage.length) {
              printMsg(i);
          } else {
              setTimeout(function () {
                  quitIntro = true;
                  unlockScreen = true;
                  unlockButtons = true;
                  $('.enter').last().append("<br/> <br/>" +
                  "<div class=\'about-type-wrap\'><button class=\'about-type-btn\' onclick=\'ClearTerminal();\'>Terminal</button> <button class='about-type-btn' onclick=\'MinimizeTerminal(true);\'>Traditional</button></div>" +
                  "<br /> You can view the traditional about me page at any time by pressing the yellow minimize button in the top left of this terminal.");
                  }, pauseBetween);
          }
       }, typeSpeed)
    })(0);
}

function QuitIntro() {
    if (quitIntro == true) {
        ClearTerminal();
    } else {
       quitIntro = true;
    }
    unlockScreen = true;
    unlockButtons = true;
}

// Clear the previous outputs of the terminal window
function ClearTerminal() {
  $('#main').html("<span class=\"fore\">about@ebonsignori.com</span>:<span class=\"accent\"> $ </span> <div class=\"enter\" id=\"query\" contenteditable=\"true\"></div>");
  $('#main:after').css('content','');
   /* Set textcursor focus */
  var div = document.getElementById("query");
  div.onfocus = function() {
      window.setTimeout(function() {
          var sel, range;
          if (window.getSelection && document.createRange) {
              range = document.createRange();
              range.selectNodeContents(div);
              range.collapse(true);
              sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
          } else if (document.body.createTextRange) {
              range = document.body.createTextRange();
              range.moveToElementText(div);
              range.collapse(true);
              range.select();
          }
      }, 1);
  };
  div.focus();
}

// Reset terminal to first scroll-by state
function ResetTerminal() {
    TerminalIntro();
}

function MinimizeTerminal(clear) {
    if (clear) {
        ClearTerminal();
    }
    $('#shell').toggleClass('minimize');
}

// Commands that require extra logic
// cd - change directory (aka go to link)
function ChangeDirectoryCommand(input) {
  switch(input) {
    case ".":
      OutputQuery("Really? You want to just stay here? <br> y/n (type 'y' for yes, 'n' for no)");
      waitingForInput = true;
      waitingFor = "cd .";
      break;
    case "..":
      window.history.back();
      NewQuery();
      break;
    case "home":
      location.href = "#";
      location.href = "#background-slider";
      break;
    case "blog":
      window.location = "blog";
      NewQuery();
      break;
    case "portfolio":
      location.href = "#";
      location.href = "#portfolio";
      break;
    case "contact":
      location.href = "#";
      location.href = "#contact-section";
      break;
    case "facebook":
      window.location = "https://www.facebook.com/ebonsignori";
      NewQuery();
      break;
    case "github":
      window.location = "https://github.com/Ebonsignori";
      NewQuery();
      break;
    case "linkedin":
      window.location = "https://www.linkedin.com/in/evan-bonsignori-33167787";
      NewQuery();
      break;
    case "instagram":
      window.location = "https://www.instagram.com/ebonsignori/";
      NewQuery();
      break;
    case "acknowledgements":
      window.location = "acknowledgements";
      NewQuery();
      break;
    default:
      OutputQuery("Please enter a valid cd command. To find the 'directories' (let's be real they are just links) use the 'ls' command.");
   }
  return;
}

function ManualCommand(input) {
  switch(input){
      // man about man options
    case "":
    case "man":
    case "what is man":
    case "what is man?":
    case "?":
    case "man?":
      OutputQuery("The man command isn't a legitimate man command, but if you type \
      <em>man</em> and pass it one of the given commands as an argument, you will see \
      what the command does followed by the alternative syntax that will execute \
      said command. <br><br> For example, if you type <strong><em>man whoami</em></strong> into the console, \
       it will tell you that the command introduces you to Evan Bonsignori.\
        <br><br> In addition, <em>man</em> will show alternative commands that can be used to call it, such as:<br> \
        <ul> <li> <em>who is evan? </em> </li> <li> <em>who are you?</em> </li> <br> <li> <em>who is evan bonsignori?</em> </li>  \
        <li> <em>tell me about yourself</em> </li> </ul> <br>");
        break;

      // man whoami
      case "whoami":
          OutputQuery("This is like the \" About Me \" blurb that would typically be displayed in an \"About Me \" section. It introduces you to me, Evan Bonsignori, and doesn't significantly change your life." +
              "<br> <br> Input Alternatives: <br> " +
              "<ul> <li> <em>who is evan? </em> </li> <li> <em>who are you?</em> </li> <br> <li> <em>who is evan bonsignori?</em> </li>  \n        <li> <em>tell me about yourself</em> </li> </ul> <br>");
          break;

       // man find
      case "find":
          OutputQuery("Displays Evan Bonsignori\'s contact email and phone number. You can press the on the information to immediately send an email on your default client or to open a phone number prompt on a mobile device." +
              "<br> <br> Input Alternatives: <br> " +
              "<ul> <li> <em>contact info</em> </li> <li> <em>find . -name \"Evan Bonsignori\"</em> </li> <br> <li> <em>find evan</em> </li>  \n        <li> <em>find evan bonsignori</em> </li> </ul> <br>");
          break;

      // man history
      case "history":
          OutputQuery("Another truly useless prompt that just tells you more about me, Evan, and my history. It doesn't contain a log of every command you've wasted your time entering into this prompt :)" +
              "<br> <br> Input Alternatives (yes, this is actually accepted): <br> " +
              "<ul> <li> <em>are you a web developer?</em> </li> </ul> <br>");
          break;

      // man uname
      case "uname":
          OutputQuery("Just the domain name and an explanation behind why this website exists." +
              "<br> <br> Input Alternatives: <br> " +
              "<ul> <li> <em>uname</em> </li> <li><em>hostname</em></li> <li><em>uname -a</em></li> <li><em>what is this site?</em></li></ul> <br>");
          break;

       // man pwd
      case "pwd":
          OutputQuery("Print Working Directory. A commonly used command in UNIX shells, but for this website it outputs a link to this domain. It primarily exists because it wouldn't feel like a real terminal without it." +
              "<br> <br> Input Alternatives: <br> " +
              "<ul> <li> <em>where am i?</em> </li> <li><em>domain</em></li></ul> <br>");
          break;

      // man ls
      case "ls":
      OutputQuery("List. A command that, similar to pwd, would just be insulting to omit from a terminal. <br>" +
          "ls displays links to almost everywhere on this site. You can use the \'cd\' (change directory) command to navigate to any link." +
          "<br> Try navigating to this directory, \'.\' using the cd command for an easter egg. <br>" +
          "<br> <br> Input Alternatives: <br> " +
          "<ul> <li> <em>where am i?</em> </li> <li><em>domain</em></li></ul> <br>");
            break;

      // man cd
      case "cd":
      OutputQuery("Change Directory. Navigates to any of the links listed using the \'ls\' command. Try navigating to this directory." +
          "<br> <br> There are no alternative inputs for this command. <br> ");
            break;

      // man mail
      case "mail":
      OutputQuery("Sends me an email message that I can reply to if you include your real email address. <br> " +
          "This is more of a fun feature than anything else, since the <a href=\"#contact-section\">contact form</a> is a better medium for typing out your message." +
          "<br> <br> Input Alternatives: <br> " +
          "<ul><li><em>message</em></li> <li><em>contact</em></li></ul>");
      break;

      // man reset
      case "reset":
      OutputQuery("Resets the terminal to the introduction screen. The red close button in the top left of this terminal serves the same function." +
            "<br> <br> Input Alternatives: <br> " +
          "<ul><li><em>intro</em></li> <li><em>restart</em></li></ul>");
      break;

      // man clear
      case "clear":
      OutputQuery("Clears the terminal." +
          "<br> <br> Input Alternatives: <br> " +
          "<ul><li><em>clc</em></li> <li><em>clean</em></li></ul>");
      break;

      // man commands
      case "commands":
      OutputQuery("Lists all functional commands. Alternatives names for calling the commands can be viewed in the man pages." +
          "<br> <br> Input Alternatives: <br> " +
          "<ul><li><em>help</em></li>  <li><em>?</em></li> <br> <li><em>what?</em></li> <li><em>compgen -c</em></li></ul>");
      break;

      // Default Case if nothing is correctly entered
      default:
      OutputQuery("Please pass a valid command as an argument for <em>man</em>. For help \
      with the <em>man</em> command, type <br> <ul> <li> <em>man?</em> </li> <li> or </li> \
        <li> <em>man man</em> </li> </ul>");
  }
  return;
}


function SendMessage(contents_exist) {
    if (!contents_exist) {
        waitingForInput = true;
        waitingFor = "send_message_prompt";
        OutputQuery("Send me a message? <br> y/n (type 'y' for yes, 'n' for no)");
    } else if (contents_exist) {
        document.getElementById('id_contact_name').value = message_name;
        document.getElementById('id_contact_email').value = message_email;
        document.getElementById('id_subject').value = message_subject;
        document.getElementById('id_message').value = message_content;
        document.getElementById('contact-form').submit();
        OutputQuery("Message Sent")
    }
}

var clicked = false;
// Make taskbar buttons clickable
$('#toolbar-red').click(function() {
    if ($('#shell').hasClass('minimize')) {
        MinimizeTerminal();
    }
    if (!unlockButtons) {
        quitIntro = true;
        if (!clicked) {
            clicked = true;
         setTimeout(function () {
                  quitIntro = true;
                  ResetTerminal();
              }, 500);
        } else {
            setTimeout(function () {
                  clicked = false;
              }, 600);
        }
    } else {
        ResetTerminal();
    }
});

$('#toolbar-yellow').click(function() {
     if (!unlockButtons) {
         quitIntro = true;
     }
         MinimizeTerminal();

});

$('#toolbar-green').click(function() {
    if ($('#shell').hasClass('minimize')) {
        MinimizeTerminal();
     }
     if (!unlockButtons) {
        quitIntro = true;
        ClearTerminal();
     }
});
