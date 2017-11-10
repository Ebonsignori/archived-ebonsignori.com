/* Global variables */
var waitingForInput = false;
var waitingFor = "none";

// Contact message information
var message_name;
var message_email;
var message_subject;
var message_content;

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

          // reset - Reset Terminal
       case "reset":
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
         case "domain":
         case "where am i?":
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
    /* TODO implement type.js for terminal intro and implement reset to reset intro */
ClearTerminal();
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
      OutputQuery("Resets the terminal <br><br> There are no alternative inputs for this command.  <br>");
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


// Make taskbar buttons clickable
$('#toolbar-red').click(function() {
  ResetTerminal();
});

$('#toolbar-yellow').click(function() {
  $('#shell').toggleClass('minimize');
  console.log("min called");
});

$('#toolbar-green').click(function() {
  ClearTerminal();
});
