!function(){var t=document.querySelector(".data-start"),e=document.querySelector(".data-stop"),a=document.querySelector("body"),d=null;e.disabled=!0;var n=function(){var t=Math.floor(16777215*Math.random()).toString(16).padStart(6,0);a.style.backgroundColor="#".concat(t)};t.addEventListener("click",(function(){d=setInterval(n,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(d),t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.86fa80fa.js.map