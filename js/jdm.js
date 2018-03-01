/*导航栏变色*/
window.onload = function() {
	var boxSearch = document.querySelector(".jd-search-box-cover");
	var ticking = false;
	window.addEventListener("scroll", function(e) {
		var scroll2bot = window.scrollY;
		if(scroll2bot > 100 && !ticking) {
			boxSearch.classList.add("scrolledDown");
			ticking = true;
		}
		if(scroll2bot < 100 && ticking) {
			boxSearch.classList.remove("scrolledDown");
			ticking = false;
		}
	});
	showtime();
	get();
};
/*ajax请求数据*/
function get(){
	var xhr = new XMLHttpRequest();
	xhr.open('get','myproduct.json');
	xhr.onreadystatechange = function(){
		if (xhr.readyState==4 && xhr.status==200) {
			var res=xhr.responseText;
			var getdata=JSON.parse(res);
			for (var i = 0 ; i<getdata.length; i++) {
			var result = template('template', getdata[i]);
			$('#jd-similar-ul').append(result);
			}
		}
	};
	xhr.send(null);

}

/*秒杀倒计时*/
var lefttime = 7200;

function showtime() {
	var skh = document.getElementById('sk-h');
	var skm = document.getElementById('sk-m');
	var sks = document.getElementById('sk-s');
	var h = Math.floor(lefttime / (60 * 60));
	var m = Math.floor(lefttime / 60 % 60);
	var s = Math.floor(lefttime % 60);
	if(lefttime >= 0) {
		skh.innerHTML = '0' + h;
		if(m < 10) {
			skm.innerHTML = '0' + m;
		} else {
			skm.innerHTML = m;
		}
		if(s < 10) {
			sks.innerHTML = '0' + s;
		} else {
			sks.innerHTML = s;
		}
		--lefttime;
	} else {
		clearTimeout(timer);
	}
	var timer;
	timer = setTimeout(showtime, 1000);
};
/*轮播图*/
var iNow = 0;
var int = null;
autoplay();
newsautoplay();

function autoplay() {
	clearInterval(int);
	int = setInterval(bannerNext, 3000);

};

function newsautoplay() {
	setTimeout(function() {
		setInterval(jdHotup, 3000)
	}, 500);
};

function bannerNext() {
	var sliderUl = document.getElementById("bannerul");
	var sliderLi = document.getElementById("firstli");
	iNow++;
	var result = -1 * (iNow);
	if(result <= -7) {
		sliderUl.style.transform = 'translateX(' + -7 * sliderLi.offsetWidth + 'px)';
		sliderUl.style.transition = '.3s all linear';
		setTimeout(function() {
			sliderUl.style.transform = 'translateX(' + sliderLi.offsetWidth + 'px)';
			sliderUl.style.transition = 'none';
		}, 300);
		iNow = -1;
	} else {
		sliderUl.style.transform = 'translateX(' + result * sliderLi.offsetWidth + 'px)';
		sliderUl.style.transition = '.3s all linear';
	}
	buttonsShow();
};
//轮播图小点
var buttonsUl = document.getElementById("point");
var buttons = document.getElementsByTagName("li");;

function buttonsShow() {
	//清除之前的样式
	for(var i = 10; i < 19; i++) {
		if(buttons[i].className == 'on') {
			buttons[i].className = '';
		}
	}
	buttons[iNow + 10].className = 'on';
	if(iNow == -1) {
		buttons[17].className = 'on';
	}
}

/*touch滑动轮播图*/
function drag(oDiv, aLi) {
	var x = 0;

	oDiv.addEventListener('touchstart', function(ev) {
		clearInterval(int);
		x = -iNow * aLi.offsetWidth;
		var id = ev.targetTouches[0].identifier;
		var disX = ev.targetTouches[0].pageX - x
		var downX = ev.targetTouches[0].pageX;

		function fnMove(ev) {
			if(ev.targetTouches[0].identifier == id) {
				x = ev.targetTouches[0].pageX - disX;
				oDiv.style.transform = 'translateX(' + x + 'px)';
			}
		}

		function fnEnd(ev) {
			if(ev.changedTouches[0].identifier == id) {
				document.removeEventListener('touchmove', fnMove, false);
				document.removeEventListener('touchend', fnEnd, false);
				oDiv.style.transition = '.3s all linear';
				var upX = ev.changedTouches[0].pageX;
				if(Math.abs(upX - downX) > 100) {
					if(upX - downX < 0) {
						iNow++;
						if(iNow == 7) {
							oDiv.style.transform = 'translateX(' + -7 * aLi.offsetWidth + 'px)';
							iNow = -1;
						} else {
							oDiv.style.transform = 'translateX(' + -iNow * aLi.offsetWidth + 'px)';
						}
						buttonsShow();
					} else if(upX - downX > 0) {
						iNow--;
						if(iNow == -1) {
							oDiv.style.transform = 'translateX(' + aLi.offsetWidth + 'px)';
							/*setTimeout(function() {
								oDiv.style.transform = 'translateX(' + -7* aLi.offsetWidth + 'px)';
								oDiv.style.transition = "none";
								}, 300);*/
							iNow = 7;

						} else {
							oDiv.style.transform = 'translateX(' + -iNow * aLi.offsetWidth + 'px)';

						}
						buttonsShow();
					}
				} else {
					oDiv.style.transform = 'translateX(' + -iNow * aLi.offsetWidth + 'px)';
				}
				oDiv.addEventListener('transitionend', function() {
					oDiv.style.transition = 'none';
					x = -iNow * aLi.offsetWidth;
				}, false);

			}

			autoplay();
		}
		document.addEventListener('touchmove', fnMove, false);
		document.addEventListener('touchend', fnEnd, false);
		//ev.preventDefault(); 
	}, false)
};
document.addEventListener('DOMContentLoaded', function() {
	var oDiv = document.querySelector('#bannerul');
	var aLi = oDiv.children;
	var skDrag = document.querySelector("#jd-skill-list");
	seckDrag(skDrag);
	drag(oDiv, aLi[0]);
}, false);

/*滚动热门*/
var index = 0;

function jdHotup() {
	var newsList = document.getElementById("news-list");
	var newsLi = document.getElementById("firstnewli");
	index++;
	var hotup = -1 * (index);
	if(hotup <= -5) {
		newsList.style.transform = 'translateY(' + -5 * 23 + 'px)';
		newsList.style.transition = '.3s all linear';
		setTimeout(function() {
			newsList.style.transform = 'translateY(' + 23 + 'px)';
			newsList.style.transition = 'none';
		}, 300);
		index = -1;
	} else {
		newsList.style.transform = 'translateY(' + hotup * 23 + 'px)';
		newsList.style.transition = '.3s ';

	}
};

/*拖动商品*/

var d = 0;
var Dx;
var startX;

function seckDrag(skDrag) {
	skDrag.addEventListener('touchstart', function(ev) {
		Dx = ev.targetTouches[0].pageX - d;
		startX = ev.targetTouches[0].pageX;
	}, false);
	tMove();

	function tMove() {
		skDrag.addEventListener('touchmove', function(ev) {
			d = ev.targetTouches[0].pageX - Dx;
			skDrag.style.left = d + 'px';
		}, false);
	};
	tEnd();

	function tEnd() {
		skDrag.addEventListener('touchend', function(ev) {
			document.removeEventListener('touchmove', tMove, false);
			document.removeEventListener('touchend', tEnd, false);
			var endX = ev.changedTouches[0].pageX;
			var skleft = skDrag.style.left;
			var skleftstring = skleft.substring(0, skleft.length - 2);
			var skleftnum = parseInt(skleftstring);
			var skulWidth = skDrag.offsetWidth;
			var skscreeWidth = window.screen.width
			if(skscreeWidth >= 640) {
				skscreeWidth = 640;
			}
			var changeDis = skulWidth - skscreeWidth;
			if(skleftnum >= 0) {
				skDrag.style.left = 0;
				d = 0;
				skDrag.style.transition = '.3s all linear';
			} else if(skleftnum <= -changeDis) {
				skDrag.style.left = -changeDis + 'px';
				d = -changeDis;
				skDrag.style.transition = '.3s all linear';
			}
			skDrag.addEventListener('transitionend', function() {
				skDrag.style.transition = 'none';
			}, false);
		}, false);
	};
};