 function prtflo_click() {
     u = location.href;
     t = document.title;
     var obj = document.getElementById("addToPortfolio");
     if (obj != null) {
         t = obj.innerHTML;
     }
     var objUrl = document.getElementById("addUrlToPortfolio");
     if (objUrl != null) {
         u = objUrl.href;
     }
     var windowFeatures = "height=500,width=790,status=0,left=" + parseInt((screen.availWidth / 2) - 310) + ",top=50,scrollbars=yes";
     window.open("http://portfolio.bmj.com/portfolio/add-to-portfolio.html?t=" + encodeURIComponent(t) + "&u=" + encodeURIComponent(u), "sharer", windowFeatures);
     return false;
 }
