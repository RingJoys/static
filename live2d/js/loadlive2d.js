function getCookie(name) {
	var a, c = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (a = document.cookie.match(c)) {
		return unescape(decodeURI(a[2]))
	} else {
		return ""
	}
}
function setCookie(name, value, time) {
	var c = new Date();
	c.setTime(c.getTime() + Number(time) * 3600 * 1000 * 24);
	document.cookie = name + "=" + value + "; path=/;expires = " + c.toGMTString()
}
function live2dload() {
let pio;
$.get("https://cdn.jsdelivr.net/gh/RingJoys/static@latest/live2d/model/Pio/model.json", a => {
	pio = parseInt(Math.random() * a.textures.length);
	pio = a.textures[pio];
	var tex = document.getElementById("tex");
	tex.src="https://cdn.jsdelivr.net/gh/RingJoys/static@latest/live2d/model/Pio/" + pio;
    loadlive2d("live2d", "https://cdn.jsdelivr.net/gh/RingJoys/static@latest/live2d/model/Pio/model.json", pio);
	console.log("当前服装",pio);
	live2dmessage()
});
}
function isIE() {
	if ( !! window.ActiveXObject || "ActiveXObject" in window) return true;
	else return false
}

if (!isIE()) {
    if (getCookie('live2d') == 'false') {
        $("<link>").attr({href: "https://cdn.jsdelivr.net/gh/RingJoys/static@latest/live2d/css/live2d.css", rel: "stylesheet", type: "text/css"}).appendTo('head');
        $('body').append('<div id="live2d-manage"><span>Live2D:关闭</span></div>');
    } else {
		$('body').append('<div id="pio">\n<div class="message" style="opacity:0"></div>\n<canvas id="live2d" width="280" height="220" class="live2d"></canvas>\n<img id="tex" src="" crossorigin="Anonymous" hidden width=0 height=0>\n</div>');
        $("<link>").attr({href: "https://cdn.jsdelivr.net/gh/RingJoys/static@latest/live2d/css/live2d.css", rel: "stylesheet", type: "text/css"}).appendTo('head');
        $('body').append('<div id="live2d-manage"><span>Live2D:开启</span></div>');
        live2dload();
    }
        	
	$('#live2d-manage').on('click', function() {
		if (getCookie('live2d') == 'false') {
			if ($('#live2d-manage span').text() == 'Live2D:开启') {
				setCookie('live2d', 'false', 365);
				window.setTimeout(function() {$('#pio').hide();}, 1300);
				$('#live2d-manage span').text('Live2D:关闭')
			} else if ($('#live2d-manage span').text() == 'Live2D:关闭') {
				setCookie('live2d', 'true', 365);
				$('#live2d-manage span').text('Live2D:开启')
				window.setTimeout(function() {window.location.reload();}, 500);
			}
		} else {
			if ($('#live2d-manage span').text() == 'Live2D:关闭') {
				setCookie('live2d', 'true', 365);
				$('#live2d-manage span').text('Live2D:开启')
				window.setTimeout(function() {window.location.reload();}, 500);
			} else if ($('#live2d-manage span').text() == 'Live2D:开启') {
				window.setTimeout(function() {$('#pio').hide();}, 1300);
				setCookie('live2d', 'false', 365);
				$('#live2d-manage span').text('Live2D:关闭')
			}
		}
    });
};