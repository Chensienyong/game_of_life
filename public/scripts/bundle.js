(()=>{var t={844:t=>{t.exports=function(t,e){this.id=t,this.state=e,this.newState=e}}},e={};function o(n){var s=e[n];if(void 0!==s)return s.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,o),r.exports}(()=>{const t=o(844);function e(t,e){this.width=e,this.height=t,this.boardArray=[],this.nodes={},this.buttonsOn=!0,this.mouseDown=!1,this.pressedNodeState=!1,this.speed="fast"}function n(t,e,o){var n=0;let s=[0,1,0,-1,0];for(let r=1;r<s.length;r++){let i=e+s[r-1],a=o+s[r];i<0||a<0||i>=t.height||a>=t.width||(n+=t.boardArray[i][a].state)}let r=[-1,-1,1,1,-1];for(let s=1;s<r.length;s++){let i=e+r[s-1],a=o+r[s];i<0||a<0||i>=t.height||a>=t.width||(n+=t.boardArray[i][a].state)}return n}function s(t,e){for(var o=[1,2,3,3,3],n=[3,4,2,3,4],s=0;s<o.length;s++)if(t==o[s]&&e==n[s])return!0;return!1}function r(t){return t?"alive":"dead"}e.prototype.init=function(){this.createBoard(),this.addEventListeners(),this.toggleButtons()},e.prototype.createBoard=function(){let e="";for(let o=0;o<this.height;o++){let n=[],i=`<tr id="row ${o}">`;for(let e=0;e<this.width;e++){let a=s(o,e),d=`${o}-${e}`,h=new t(d,a);n.push(h),i+=`<td id="${d}" class="${r(a)}"></td>`,this.nodes[`${d}`]=h}this.boardArray.push(n),e+=`${i}</tr>`}document.getElementById("board").innerHTML=e},e.prototype.addEventListeners=function(){let t=this;for(let e=0;e<t.height;e++)for(let o=0;o<t.width;o++){let n=`${e}-${o}`,s=t.getNode(n),r=document.getElementById(n);r.onmousedown=e=>{e.preventDefault(),this.buttonsOn&&(t.mouseDown=!0,t.pressedNodeState=!s.state,t.changeNode(s,this.pressedNodeState))},r.onmouseup=()=>{this.buttonsOn&&(t.mouseDown=!1)},r.onmouseenter=()=>{this.buttonsOn&&this.mouseDown&&t.changeNode(s,this.pressedNodeState)}}},e.prototype.getNode=function(t){let e=t.split("-"),o=parseInt(e[0]),n=parseInt(e[1]);return this.boardArray[o][n]},e.prototype.changeNode=function(t,e){t.state=e,document.getElementById(t.id).className=r(t.state)},e.prototype.updateStateFromNewState=function(){for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)this.boardArray[t][e].updateStateFromNewState()},e.prototype.toggleButtons=function(){document.getElementById("adjustFast").onclick=()=>{this.speed="fast",document.getElementById("adjustSpeed").innerHTML='Speed: Fast<span class="caret"></span>'},document.getElementById("adjustAverage").onclick=()=>{this.speed="average",document.getElementById("adjustSpeed").innerHTML='Speed: Average<span class="caret"></span>'},document.getElementById("adjustSlow").onclick=()=>{this.speed="slow",document.getElementById("adjustSpeed").innerHTML='Speed: Slow<span class="caret"></span>'},document.getElementById("randomizeButton").onclick=()=>{for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)this.changeNode(this.boardArray[t][e],Math.random()<.5)},document.getElementById("clearButton").onclick=()=>{for(let t=0;t<this.height;t++)for(let e=0;e<this.width;e++)this.changeNode(this.boardArray[t][e],!1)},document.getElementById("startButton").onclick=()=>{var t;t=this,function e(o){let s="fast"===t.speed?0:"average"===t.speed?50:150;setTimeout((function(){for(let e=0;e<t.height;e++)for(let o=0;o<t.width;o++){let s=t.boardArray[e][o],r=n(t,e,o);s.state?s.newState=!(r<=1||r>=4):s.newState=3==r}for(let e=0;e<t.height;e++)for(let o=0;o<t.width;o++){let n=t.boardArray[e][o];t.changeNode(n,n.newState)}e(o+1)}),s)}(1)}};let i=$("#navbarDiv").height(),a=$("#buttonDiv").height();new e(Math.floor(($(document).height()-i-a)/28),Math.floor($(document).width()/25)).init()})()})();