/**
 * @author adam.bankin
 */
(function(){
	var _FC = (function(){
		var _node, _id, _flash, _wdth, _expandedWidth, _columnWidth;
		
		var _getStyle = function(x, s){
			var y;
			if (x.currentStyle) y = x.currentStyle[s];
			else if (window.getComputedStyle) y = document.defaultView.getComputedStyle(x, null).getPropertyValue(s);
			return y;
		};
		
		var _addEvent = function(obj, evt, fn){
			if (obj.addEventListener) 
				obj.addEventListener(evt, fn, false);
			else if (obj.attachEvent) 
				obj.attachEvent('on' + evt, fn);
		};
		
		var _removeEvent = function(obj, type, fn) {
			if (obj.removeEventListener)
				obj.removeEventListener(type,fn,false);
			else if (obj.detachEvent)
				obj.detachEvent('on'+type,fn);
		};
		
		var _setOffset = function () {
			var __arr = _wdth.split("'");
			
			if (_node.className.indexOf('expand') != -1) {
				_expandedWidth = Number(__arr[1])
				_columnWidth = Number(_getStyle(_node.parentNode, 'width').split('px')[0]);
			} else {
				return false;
			}
			
			if (_columnWidth >= _expandedWidth){
				return false;
			}
			
			_node.style.display = 'none';
			
			_flash.style.position = 'absolute';
			_flash.style.width = __arr[1] + 'px';
			_flash.style.top = 0;
			_flash.style.right = 0;
			
			_node.style.overflow = 'hidden';
			_node.style.position = 'relative';
			_node.style.height= __arr[3] + 'px';
			_node.style.marginLeft = (-1*(_expandedWidth - _columnWidth)) + 'px';
			
			_node.style.display = 'block';
			return true;
		}
		
		var _setOverflow = function (e) {
			_node.style.display = 'none';
			switch (e.type) {
				case 'mouseover':
					_node.style.marginLeft = (-1*(_expandedWidth - _columnWidth)) + 'px';
					_node.style.overflow = 'auto';
					_node.style.width = _expandedWidth + 'px';
					break;
				case 'mouseout':
					_node.style.marginLeft = 0;
					_node.style.overflow = 'hidden';
					_node.style.width = _columnWidth + 'px';
					break;
			}
			_node.style.display = 'block';
			
			return true
		}
		
		return function(){
			this.doOffset = function(id, wdth){
				if (document.getElementById('OAS_RMF_Right1_FLASH')) {
					var __length;
					
					_id = id;
					_wdth = wdth;
					_node = document.getElementById(id);
					__length = _node.childNodes.length;
					
					while (__length--) {
						_flash = (_node.childNodes[__length].tagName == 'DIV') ? _node.childNodes[__length] : false;
						if (_flash) 
							break;
					}
					
					if (_setOffset() && _flash) {
						_addEvent(_node, 'mouseover', _setOverflow);
						_addEvent(_node, 'mouseout', _setOverflow);
					}
				}
			}
		}
	})();
	
	window.TFSMFlash_OASDIM = false;
	window.FC = new _FC();
})();
						