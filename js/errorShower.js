
 (function () {
  const $ = id => id && document.getElementById(id),
        $n = tag => document.createElement(tag),
        ClearChild = (...arr) => arr.forEach(ele => (ele === null || ele === void 0 ? void 0 : ele.parentNode) && ele.parentNode.removeChild(ele)),
      
  SetBlock = (...arr) => arr.forEach(ele => ele.style.display = "block"),
        SetNone = (...arr) => arr.forEach(ele => ele.style.display = "none"),
        
  SetVisible = (...arr) => arr.forEach(ele => ele && (ele.style.visibility = "visible")),
        SetHidden = (...arr) => arr.forEach(ele => ele.style.visibility = "hidden"),
        
  SetAlpha = (ele, alpha) => ele.style.opacity = alpha,
        innerText = (ele, str) => ele.innerText = str,
        SetStyle = (ele, json) => {
    for (let key in json) {
      ele.style[key] = json[key];
    }

    return ele;
  },
        NewEle = function (id, tag, cssText, properties, wrap) {
   
    const ele = $n(tag);
    ele.id = id;
    ele.style.cssText = cssText;
    Object.assign(ele, properties);
    wrap && wrap.appendChild(ele);
    return ele;
  },
        NewImg = function (id, src, cssText, wrap, properties) {
   
    let _properties = {
      src
    };
    Object.assign(_properties, properties);
    return NewEle(id, 'img', cssText, _properties, wrap);
  },
        EditEle = function (ele, attributes, style, wrap, properties) {
    //编辑现有元素
    if (attributes) {
      for (let index in attributes) ele.setAttribute(index, attributes[index]);
    }

    SetStyle(ele, style);
    Object.assign(ele, properties);
    wrap && wrap.appendChild(ele);
    return ele;
  },
        EditImg = function (ele, id, src, style, wrap) {
    SetStyle(ele, style);
    id && (ele.id = id);
    src && (ele.src = src);
    wrap && wrap.appendChild(ele);
    return ele;
  };

  let oEffects = {
    Animate(ele, properties, duration = 0.4, ease = 'linear', callback, delay = 0, iterationCount = 1) {
      let cssValues = {};//
      let cssProperties = [];//
      let cssList = ['-name', '-property', '-duration', '-delay', '-timing-function'];//name , properties, duration, delay, time-functions
      let effectType;
      typeof duration === 'string' && (duration = {
        fast: 0.2,
        slow: 0.6
      }[duration]);//duration key matches with object and that is assigned
      /* 生成css代码 */

      if (typeof properties === 'string') {
        cssValues['animation-name'] = properties;
        cssValues['animation-duration'] = duration + 's';
        cssValues['animation-delay'] = delay + 's';
        cssValues['animation-timing-function'] = ease;
        cssValues['animation-iteration-count'] = iterationCount;
        cssValues['animation-fill-mode'] = 'none';
        effectType = 'animation';
      } else {
        for (let index in properties) {//obj index is key
          //自定义样式
          cssValues[index] = properties[index];
          cssProperties.push(index); //记录需要为哪些样式调用动画
        }

        cssValues['transition-property'] = cssProperties.join(', ');//animate transition properties only
        let traverse = {
          "duration": [duration, "s, ", "s"],//value, joiner ,suffix
          "delay": [delay, "s, ", "s"],
          "timing-function": [ease, ", ", ""]
        };

        for (let i in traverse) {
          if (typeof traverse[i][0] != 'object') { //array
            cssValues['transition-' + i] = traverse[i][0] + traverse[i][2];
          } else {
            cssValues['transition-' + i] = traverse[i][0].join(traverse[i][1]) + traverse[i][2];//join them together with suffix and seprator
          }
        }

        effectType = 'transition';
      }

      cssList = cssList.map(key => effectType + key);//retrn new array
      /* 设置动画完成监听 */

      ele.addEventListener(effectType + 'end', function _callback(event) {//animation completes
        if (event.target !== event.currentTarget) return; //规避冒泡 //avoid bbbles

        ele.removeEventListener(effectType + 'end', _callback);//remove event 

        for (let index of cssList) ele.style[index] = ''; 


        callback && callback(ele); 
      })
    

      ele.clientLeft;//flush previous style before new //reflow 

      SetStyle(ele, cssValues);
      return ele;
    },

    
    fadeTo: (ele, opacity, duration, callback) => oEffects.Animate(ele, {
      opacity: opacity
    }, duration, undefined, callback),
   
    fadeIn: (ele, duration, callback) => oEffects.fadeTo(ele, 1, duration, callback),
   
    fadeOut: (ele, duration, callback, delay) => oEffects.fadeTo(ele, 0, duration, callback, delay)
  };
  let nowY = 0;
  let errorMsgs = {};
  let emoji = ["∑(っ°Д°;)っ", "(°ー°〃)", "Σ(°△°||)", "⊙▽⊙", $__language_Array__["74d1bb3bb02a499f662942b0b04c05b4"]];
  let A1 = [$__language_Array__["3d24cfddcaa42d351527eeec00a1c54f"], $__language_Array__["9f632dc91ec799f06b45e6410890a50e"], $__language_Array__["ec53882bc1810667587e4bc150f97053"], $__language_Array__["b07725ab42545f15387154329da529b1"]];

  let getFileName = o => {
    var pos = o.lastIndexOf('/');
    return o.substring(pos + 1).split(".")[0];
  };

  let BoxErr = (type = 1, message, source, lineno, colno, error) => {
    let s = NewEle("error_" + Math.random(), "div", `pointer-events:none;z-index:3000;box-shadow:0 0 5px black;position:absolute;height:80px;transform:scaleX(0);width:300px;opacity:0;right:-150px;bottom:${nowY}px;background:white;margin:6px;border-radius:4px;font-size:0.75em;padding:10px;`, {
      innerText: type == 0 ? `${$__language_Array__["9e5ae0020f3fc3da57a61fc6631ea7e2"][0]}${source}${$__language_Array__["9e5ae0020f3fc3da57a61fc6631ea7e2"][1]}${emoji[Math.floor(Math.random() * emoji.length)]}${$__language_Array__["9e5ae0020f3fc3da57a61fc6631ea7e2"][2]}` : `${$__language_Array__["390bb451547a8159903bb918b1d6240b"][0]}${message} in ${getFileName(source)}_${lineno}_${colno}\n${A1[Math.floor(Math.random() * A1.length)]}${emoji[Math.floor(Math.random() * emoji.length)]}${$__language_Array__["390bb451547a8159903bb918b1d6240b"][1]}`
    }, document.body);
    let height = s.offsetHeight + Number.parseFloat(s.style.margin);
    errorMsgs[s.id] = s;
    oEffects.Animate(s, {
      opacity: 0.8,
      transform: "scaleX(1)",
      right: "0"
    }, 0.5, false);
    setTimeout(function () {
      delete errorMsgs[s.id];
      oEffects.Animate(s, {
        opacity: 0
      }, 0.5, false, ClearChild);

      if (Object.keys(errorMsgs).length == 0) {
        nowY = 0;
      }
    }, 7000);
    nowY += height;
  };

  window.onerror = function (...arr) {
    localStorage.JNG_DEV !== 'true' && BoxErr(1, ...arr);
  };

  window.addEventListener('error', e => {
    if (e.constructor === Event) {
      let tmp;

      if (tmp = e.target.getAttribute("src")) {
        localStorage.JNG_DEV !== 'true' && BoxErr(0, false, getFileName(tmp));
      }
    }
  }, {
    capture: true
  });
  window.addEventListener("unhandledrejection", function (e) {
    if (e.constructor === ErrorEvent) {
      localStorage.JNG_DEV !== 'true' && BoxErr(1, e.message, e.source, e.lineno, e.colno, e.error);
      e.preventDefault();
    }
  }, true);
})();