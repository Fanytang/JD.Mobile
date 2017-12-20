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
	console.log(iNow);
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
		console.log(downX);

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
			console.log(iNow);
		}
		document.addEventListener('touchmove', fnMove, false);
		document.addEventListener('touchend', fnEnd, false);
		//ev.preventDefault(); //事件绑定用的阻止默认事件;
	}, false)
};
document.addEventListener('DOMContentLoaded', function() {
	var oDiv = document.querySelector('#bannerul');
	var aLi = oDiv.children;

	drag(oDiv, aLi[0]);
}, false);

//滚动热门
var index = 0;

function jdHotup() {
	var newsList = document.getElementById("news-list");
	var newsLi = document.getElementById("firstnewli");
	index++;
	var hotup = -1 * (index);
	console.log(index);
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

/*function bannerNext() {
	var sliderUl = document.getElementById("bannerul");
	var LiNow = sliderUl.style.marginLeft;
	var LiNowstring = LiNow.substring(0, LiNow.length - 1);
	var LiNownumber = Number(LiNowstring);
	iNow++;
	var result = -100 * (iNow + 1);
	
	console.log(result);
	if(result == -900) {
		sliderUl.style.marginLeft = 0;
		sliderUl.style.transition = "margin";
		setTimeout(function() {
			sliderUl.style.marginLeft = "-100%";
			sliderUl.style.transition = "margin .3s";
		}, 0);
		iNow = 0;
	} else {
		sliderUl.style.marginLeft = result + "%";
		sliderUl.style.transition = "margin .3s";
	}
};*/
function bannerPre() {
	var sliderUl = document.getElementById("bannerul");
	var LiNow = sliderUl.style.marginLeft;
	var LiNowstring = LiNow.substring(0, LiNow.length - 1);
	var LiNownumber = Number(LiNowstring);
	iNow--;
	var result = -100 * (iNow + 1);
	console.info(result);
	if(result == 0) {
		sliderUl.style.marginLeft = "-900%";
		sliderUl.style.transition = "margin";
		setTimeout(function() {
			sliderUl.style.marginLeft = "-800%";
			sliderUl.style.transition = "margin .3s";
		}, 0);
		iNow = 7;
	} else {
		sliderUl.style.marginLeft = result + "%";
		sliderUl.style.transition = "margin .3s";
	}
	//return iNow;
};