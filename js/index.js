window.addEventListener("load", function(){
	
	
		var isMobile = false;

		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|playbook|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
			isMobile = true;
		}

		

		//visual_Slide(end)=========================================================================================


		function visual_Slide(_targetWrap, _intervalTime, _type){



			const $slide_wrap = _targetWrap;
			const $slides = document.querySelectorAll($slide_wrap +" .slides");
			const $btn_prev = document.querySelector($slide_wrap +" button.btn_pre");
			const $btn_next = document.querySelector($slide_wrap +" button.btn_next");
			const $pn_btns = document.querySelectorAll($slide_wrap +".pagina");

			let cnt = 0;
			let _foNum;
			let si_01 = null;
			let click_Event = true;

			if(_type == "fade"){
				for(var i = 0; i < $slides.length; i++){
					$slides[i].classList.remove("cur", "prev", "next");
					$slides[i].style.visibility = "hidden";
				}
				$slides[cnt].style.opacity = 1;
				$slides[cnt].style.visibility = "visible";
			}

			function fadeOut(element){
				let opa_val = 1;
				let timer = setInterval(function(){
					if(!timer) click_Event = true;
					if(opa_val <= 0.1){
						opa_val = 0;
						element.style.opacity = opa_val;
						element.style.visibility = "hidden";
						clearInterval(timer);
					}
					element.style.opacity = opa_val;
					opa_val -= opa_val * 0.1
				}, 20);
			}

			function fadeIn(element){
				let opa_val = 0.4;
				element.style.visibility = "visible";
				let timer = setInterval(function(){
					if(opa_val >= 1){
						opa_val = 1;
						element.style.opacity = opa_val;
						click_Event = true;
						start_si();
						clearInterval(timer);
					}
					element.style.opacity = opa_val;
					opa_val += opa_val * 0.2
				}, 20);
			}

			function fade_slide(_num, _foNum){
				click_Event = false;
				fadeOut($slides[_foNum]);
				fadeIn($slides[_num]);
			}
			
			
			if($btn_prev) $btn_prev.onclick = function(){
				count_change(-1);
			}
			if($btn_next) $btn_next.onclick = function(){
				count_change(1);
			}

			if($pn_btns.length){
				for(var i = 0; i < $pn_btns.length; i++){
					$pn_btns[i].index = i;
					$pn_btns[i].onclick = function(){
						if(cnt == this.index) return false;
						count_change(0, this.index);
						//pn_change(cnt);
					}
			}

			
		}

		

		function count_change(_dir, _idx){
				if(!click_Event) return false; // clickEvent 해결
				stop_si();
				click_Event = false; // clickEvent 해결
				_foNum = cnt;
				if(_dir < 0) cnt = cnt == 0 ? $slides.length - 1 : cnt - 1;
				else if(_dir > 0) cnt = cnt == $slides.length - 1 ? 0 : cnt + 1;
				else if(_dir == 0) cnt = _idx;
				(_type == "slide") ? move_slide(cnt, -1) : fade_slide(cnt, _foNum);
				if($pn_btns.length) pn_change(cnt);
		}


		function move_slide(_num, _dir){
			let prev_num = _num == 0 ? $slides.length - 1 : _num - 1;
			let next_num = _num == $slides.length - 1 ? 0 : _num + 1;

			//console.log('prev : '+ prev_num);
			//console.log('cur : '+ _num);
			//console.log('next : '+ next_num);

			for(var i = 0; i < $slides.length; i++){
				$slides[i].classList.remove("cur", "prev", "next");
				$slides[i].style.transition = "none";
			}

			for(var i = 0; i < $slides.length; i++){
				if(_dir == 0) $slides[i].style.transition = "none";
				else{
					$slides[i].style.transition = "transform 0.3s";
				}
			}


			// z-index, clickEvent issue

			// z-index 해결

			if(_dir < 0){
				$slides[prev_num].style.zIndex = "4";
				$slides[next_num].style.zIndex = "5";
			}
			else if(_dir > 0){
				$slides[prev_num].style.zIndex = "5";
				$slides[next_num].style.zIndex = "4";
			}
			$slides[_num].style.zIndex = "10";

			$slides[_num].classList.add("cur");
			$slides[prev_num].classList.add("prev");
			$slides[next_num].classList.add("next");
			

			// clickEvent 해결
			setTimeout(function(){
				start_si();
				click_Event = true;
			}, 400);

		}



		function start_si(){

			if(si_01 != 0) clearInterval(si_01);
			si_01 = setInterval(function(){ count_change(1); }, _intervalTime);
			}
			function stop_si(){
				if(si_01 != 0) clearInterval(si_01);
				si_01 = null;
			}
			start_si();


		}



		//rolling_Slide(start)=========================================================================================


		function rolling_Slide(_targetWrap, _view_ea_D, _view_ea_T, _view_ea_M){
			const $wrap = _targetWrap;
			const $wrap_el = document.querySelector($wrap);
			const $view_mask = document.querySelector($wrap + " .view_mask");
			const $inner_ul = document.querySelector($wrap + " .view_mask > ul");
			let $inner_ul_li = $inner_ul.children;
			const $btn_prev = document.querySelector($wrap + " button.btn_pre");
			const $btn_next = document.querySelector($wrap + " button.btn_next");
			const $pn_btns = document.querySelectorAll($wrap + " .pagination > button");

			let cnt = 0; 
			let move_ea = 1;
			let view_ea = (function(){
				let result;
				if(!isMobile) result = _view_ea_D;
				else {
					if (screen.width >= 768) result = _view_ea_T;
					else if (screen.width < 768) result = _view_ea_M;
				}
				return result;
			})();
			let li_width = $view_mask.clientWidth / view_ea;
			let si_01 = null;
			let click_Event = true; 

			(function init(){
				for (var i = 0 ; i < $inner_ul_li.length ; i++ ){
					$inner_ul_li[i].style.width = li_width + "px";
				}
				$inner_ul.style.width = (li_width * $inner_ul_li.length) + "px";
				for (var i = 0 ; i < move_ea ; i++){
					$inner_ul.insertBefore($inner_ul_li[$inner_ul_li.length - 1], $inner_ul.firstChild);
				}
				$inner_ul.style.marginLeft = -(li_width * move_ea) + "px";
				$inner_ul.style.left = "0px"; 
				$inner_ul.style.transition = "left 0.3s";
			})();

			
			if($btn_prev) $btn_prev.addEventListener("click", function(){
				move_ul("prev");
			});
			if($btn_next) $btn_next.addEventListener("click", function(){
				move_ul("next");
			});
			if($pn_btns.length){
				
				for (var i = 0; i < $pn_btns.length; i++ ){
					stop_si();
					$pn_btns[i].index = i;
					$pn_btns[i].onclick = function(){
						let cur_num = this.index; 
						for (var j = 0; j < $inner_ul_li.length; j++ ){
							$inner_ul.appendChild(document.querySelector($wrap + " div.view_mask > ul > li[data-index = '" + cur_num + "']"));
							cur_num = cur_num + $inner_ul_li.length - 1 ? 0 : cur_num + 1; 
						}
						for (var i = 0 ; i < move_ea; i++){
							$inner_ul.insertBefore($inner_ul_li[$inner_ul_li.length - 1], $inner_ul.firstChild);
						}
						cnt = cur_num;
						pn_change(cnt);
						start_si();
					}
				}
				function pn_change(_num){
					for (var i = 0; i < $pn_btns.length; i++ ){
						$pn_btns[i].classList.remove("active");
					}
					$pn_btns[_num].classList.add("active");
				}

			}

				function move_ul(_dir){
					if (click_Event){
						click_Event = false;
						stop_si();
						$inner_ul.style.left = _dir == "prev" ? li_width * move_ea + "px" : -(li_width) * move_ea + "px";
						$inner_ul.style.transition = "left 0.3s"
						if (_dir == "prev") cnt = cnt == 0 ? $inner_ul_li.length - 1 : cnt - 1; 
						else if (_dir == "next") cnt = cnt == $inner_ul_li.length - 1 ? 0 : cnt + 1; 
						if ($pn_btns.length) pn_change(cnt);

						setTimeout(function(){move_child(_dir); }, 300);
					}
					else { return false; }
				}
				function move_child(_dir){
					_dir == "prev" ? $inner_ul.insertBefore( $inner_ul_li[$inner_ul_li.length - 1], $inner_ul.firstElementChild) : $inner_ul.appendChild($inner_ul.firstElementChild);
					
				
					$inner_ul.style.left = "0px"; 
					$inner_ul.style.transition = "none";
					click_Event = true;
					start_si();
				}
				function start_si(){
					if (si_01 != 0) clearInterval(si_01); 
					
					si_01 = setInterval(function(){ move_ul("next"); }, 4000);
					
				}
				function stop_si(){
					if (si_01 != 0){
						clearInterval(si_01);
					}

					si_01 = null; 
				}
				start_si();






				}






		//rolling_Slide(end)=========================================================================================



		if(!isMobile){


		}


		else {

			if(screen.width >= 768){


			}
			else { 

				

			}

		}

		let visual_Slide_01 = visual_Slide(".visual", 3000, "fade");

		let rolling_Slide_01 = rolling_Slide(".reivew", 4, 3, 1);

		




});