var waitingForInput = false;
var waitingFor = "none";

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
       console.log(waitingFor);
       switch (waitingFor) {
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
       }
        waitingForInput = false;
        waitingFor = "none";
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
         OutputQuery("My name is Evan Bonsignori and I\'m a <strong>computer scientist in training</strong> (<em>aka Student</em>). <br /> I began and completed my studies in electical engineering up to an associates, but found the little MATLAB programming we used to be the most rewarding aspect of my engineering courses. Thus, I tested out an online Python class and haven\'t stopped programming since. I plan to graduate with a bachelors in computer science accompanied by a minor in mathematics by 2018. Until then <strong> this website and its portfolio contents are a work in progress. </strong>");
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
       // uname - Site description
       case "uname":
       case "hostname":
       case "uname -a":
       case "what is this site?":
          OutputQuery("ebonsignori.com which is the homepage of me, Evan Bonsignori. I started it to gain expierence with AWS and Digital Ocean server based hosting, but since it has grown into a portfolio, blog, and about me page. I hope you like it.");
          break;
       // history - My history
       case "history":
       case "are you a web developer?":
         OutputQuery("I didn't know what an HTML tag looked like until March of 2017! Since, I've referenced hundreds of resources, pages of documentation, and a Django Udemy course to learn the basics of full stack web development. Though my other work isn't as \"from scratch\" as this site, you can <a href=\"#portfolio\"> check out my budding Portfolio.</a>");
         break;
       //pwd - output domain
       case "pwd":
         OutputQuery("<a href='https://ebonsignori.com'>https://ebonsignori.com</a>");
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
       case "contact":
       case "contact info":
       case "find . -name \"Evan Bonsignori\"":
       case "find":
       case "find evan":
       case "find evan bonsignori":
          OutputQuery(" Email: <a href=\"mailto:evanabonsignori@gmail.com\"> Evanabonsignori@gmail.com </a> <br> Phone Number: <a href=\"tel:1-912-508-3345\"> (912-508-3345) </a>");
         break;
       // Default
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
      history.go(-1);
      NewQuery();
      break;
    case "home":
      window.location = "#background-slider";
      NewQuery();
      break;
    case "blog":
      window.location = "blog";
      NewQuery();
      break;
    case "portfolio":
      window.location = "#portfolio";
      NewQuery();
      break;
    case "contact":
      window.location = "#contact-section";
      NewQuery();
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
    case "":
    case "man man":
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
    default:
      OutputQuery("Please pass a valid command as an argument for <em>man</em>. For help \
      with the <em>man</em> command, type <br> <ul> <li> <em>man?</em> </li> <li> or </li> \
        <li> <em>man man</em> </li> </ul>");
  }
  return;
}


// Make taskbar buttons clickable
$('#toolbar-red').click(function() {
  ResetTerminal();
});

$('#toolbar-yellow').click(function() {
  $('#shell').toggleClass('minimize');
});

$('#toolbar-green').click(function() {
  ClearTerminal();
});
