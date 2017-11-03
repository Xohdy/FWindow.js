# FWindow.js
flouting window in javascript

Dependant library
- Jquery
- drag.js // you can embbid in Fwindow.js

-------------------
parameter
{
  url : "",
  data:{},
  W:0,
  H:0,
  title : "",
}
-------------------
data send JSON to server
{
    data:{},
    windowID : 0,
}
-------------------
data should recieve in this JSON structure
{
    title : "", // title of window
    W:"", // height
    H:"", // width
    content : "", // html data
}

---------------------------
#how to use :
#new window
var w = new FWindow({
                    url : './Windows/Clients/Clients_Edit.php',
                    data:{id: id},
                    title : "تعديل منتج",
                });
---------------------------
#create on load event
w.onLoad(function(
  //do somethig
));
---------------------------
#create on Exit event
w.onExit(function(
  //do somethig
));
---------------------------
#get id of window
console.log(w.id);
---------------------------
#to close window
w.close();
// OR
FWindow.close(w.id);
---------------------------


