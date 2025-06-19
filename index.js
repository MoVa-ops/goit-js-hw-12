import{a as p,S as f,i as s}from"./assets/vendor-67BWzQEt.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const m="https://pixabay.com/api/",y="50786624-1add8080b253d44feed6410de";function h(i){return p(m,{params:{key:y,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data.hits)}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),g=new f(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlayOpacity:.3});function b(i){const r=i.map(({webformatURL:o,largeImageURL:a,tags:e,likes:t,views:n,comments:u,downloads:d})=>`
      <li class="gallery-item">
        <a href="${a}">
          <img src="${o}" alt="${e}" />
        </a>
        <div class="gallery-info">
          <p><b>Likes</b> ${t}</p>
          <p><b>Views</b> ${n}</p>
          <p><b>Comments</b> ${u}</p>
          <p><b>Downloads</b> ${d}</p>
        </div>
      </li>`).join("");c.insertAdjacentHTML("beforeend",r),g.refresh()}function L(){c.innerHTML=""}function S(){l.classList.remove("hidden")}function q(){l.classList.add("hidden")}const v=document.querySelector(".form"),P=document.querySelector('input[name="search-text"]');v.addEventListener("submit",w);function w(i){i.preventDefault();const r=P.value.trim();if(!r){s.error({title:"Error",message:"Please enter a search query.",position:"topRight"});return}S(),L(),h(r).then(o=>{if(o.length===0){s.warning({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"center"});return}b(o)}).catch(o=>{s.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>q())}
//# sourceMappingURL=index.js.map
