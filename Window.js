/*
    parameter
    {
        url : "",
        data:{},
        W:0,
        H:0,
        title : "",
    }
*/

/*
    send JSON to server
    {
        data:{},
        windowID : 0,
    }
*/
        
/*
    recieve JSON
    {
        title : "",
        W:"",
        H:"",
        content : "",
    }
*/
FWindow.pool = [];
FWindow.close = function(id){
    for (var index = 0; index < FWindow.pool.length; index++) {
        var element = FWindow.pool[index];
        if(element.id == id)
            element.close();
    }
}
function FWindow(arg) {
    var self = this;
    // وضع النافذة في مستنقع النوافذ
    var id = Math.round(Math.random()*100000000);
    FWindow.pool.push(self);

    // تعيين اعدادات
    var _data = arg.data || null,
        _title = arg.title || "No title",
        _W = arg.W || 300,
        _H = arg.H || 200,
        _X = 0,
        _Y = 0,
        _url = arg.url || null,
        _obj = {},
        _Z = $('[flouting]').length + 200, // حساب عدد الفلوتر
        _onLoad = function () { },
        _onExit = function () { };

    _obj.body = $('<div>').prependTo($("body"));
    _obj.over = $('<div>').prependTo($("body"));
    _obj.head = $('<div>').prependTo(_obj.body);
    _obj.exit = $('<div>').prependTo(_obj.head);
    _obj.title = $('<a>').appendTo(_obj.head);
    _obj.cont = $('<div>').appendTo(_obj.body);

    // حساب المكان
    _X = self.Y === null ? (window.innerHeight / 2 - _H / 2) : _Y;
    _Y = self.X === null ? (window.innerWidth / 2 - _W / 2) : _X;

    // رسم خلفية للنافذة
    _obj.over.addClass("FWindowOverlay");
    _obj.over.css({
        "height": $(window).height() + "px",
        'z-index': _Z * 2 + 1
    });

    // بناء جسم النافذة
    _obj.body.addClass("FWindowBody");
    _obj.body.attr("flouting")
    _obj.body.css({
        'z-index': _Z * 2 + 2,
        'top': _Y + 'px',
        'left': _X + 'px'
    });
    resize(_W, _H);

    // اضافة رأس لجسم النافذة
    _obj.head.addClass("FWindow_header");

    //جعل الرأس قابل للسحب
    _obj.head.mousedown(function (e) {
        drag(_obj.body, e);
    });

    // اضافة زر خروج
    _obj.exit.html("X");
    _obj.exit.addClass("FWindowExitBtn");

    _obj.exit.on("click", function () {
        close();
    });

    // اضافة عنوان للرأس
    _obj.title.html(_title);
    _obj.title.addClass("FWindowTitle");

    // اضافة منطقة محتويات
    _obj.cont.html("Loading");
    _obj.cont.addClass("FWindowContent");

    function close() {
        console.log("Fwindow close");
        _obj.body.remove();
        _obj.over.remove();

        FWindow.pool = FWindow.pool.splice(FWindow.pool.indexOf(self) , 0 )

        if (_onExit)
            _onExit();

    }

    function setContent(e) {
        console.log("Fwindow setContent");
        _obj.cont.html(e);
    }
    function setTitle(e) {
        console.log("Fwindow setTitle");
        _obj.title.html(e);
    }
    function resize(w, h) {
        console.log("Fwindow resize");
        _obj.body.css({
            "width": w + "px",
            "height": h + "px",
        });
    }
    function centerWindow() {
        console.log("Fwindow centerWindow");
        _W = _obj.body.outerWidth();
        _H = _obj.body.outerHeight();

        var Wh = window.innerHeight;
        var Ww = window.innerWidth;

        _Y = Wh / 2 - _H / 2;
        _X = Ww / 2 - _W / 2;

        console.log({
            "innerHeight" : Wh,
            "innerWidth" : Ww,
            "_W": _W ,
            "_H": _H ,
            "_X": _X ,
            "_Y": _Y 
        });

        _obj.body.offset({ top: _Y, left: _X});
        // _obj.body.css({
        //     'top': _Y + 'px',
        //     'left': _X + 'px'
        // });
    }
    function send() {
        console.log("Fwindow send");
        $.ajax({
            url: _url,
            type: 'POST',
            data: {data:_data , windowID : id},
            error: function (data) {
                setContent("خطأ في التحميل");
            },
            success: function (data, status) {
                console.log("Fwindow success");
                console.log(data);
                setData(data);
                centerWindow();
                if (self.onLoad) self.onLoad();
            }
        });
    }
    function setData(data) {
        console.log("Fwindow setData");
        setContent(data.content);
        setTitle(data.title);
        resize(data.W, data.H);
    }
    send();

    // publics ---------------------------------
    this.close = function () { close(); }
    this.elements = function (){return _obj};
    this.center = function () { centerWindow(); }
    this.onExit = function (e) { _onExit = e; }
    this.onLoad = function (e) { _onLoad = e; }

    // property ---------------------------------
    Object.defineProperty(this, "id", {
		get: function () { return id; }
    });
    

    return this;
}
