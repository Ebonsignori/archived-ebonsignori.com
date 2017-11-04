/* Navbar JS */
function openNav() {
    var panel = document.getElementById("mySidenav");
    var rightSide = document.getElementsByClassName("dim")[0];
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
      panel.style.width = "100%";
    } else {
      rightSide.style.marginLeft = "265px";
      panel.style.width = "250px";
    }
    rightSide.style.opacity = ".4";
}

function closeNav() {
    var panel = document.getElementById("mySidenav");
    var rightSide = document.getElementsByClassName("dim")[0];
    panel.style.width = "0";
    rightSide.style.marginLeft = "0";
    rightSide.style.opacity = "1";
}

/* Close nav if clicked off of nav */
$(".dim").eq(0).click(closeNav);
