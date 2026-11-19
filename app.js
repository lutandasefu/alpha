const DIV=[{"id": "construction", "t": "Construction & Infrastructure", "c": "#e37a35", "d": "Construction, renovations, remodeling, alterations, plastering, Rhinolite, repairs, waterproofing and damp-proofing.", "tags": ["Renovations", "Alterations", "Plastering", "Rhinolite", "Waterproofing", "Damp-proofing"], "hint": "e.g. type of work, size of the area, location and any damage"}, {"id": "cleaning", "t": "Cleaning & Facilities", "c": "#33c1f0", "d": "Commercial and domestic cleaning, deep cleaning, carpet, couch and mattress cleaning, plus facilities support.", "tags": ["Commercial", "Domestic", "Deep cleaning", "Carpets", "Couches", "Mattresses"], "hint": "e.g. property type, size, how often you need cleaning"}, {"id": "security", "t": "Security & Access Technology", "c": "#2a7bbf", "d": "Wi-Fi and fibre, access control, CCTV and security systems, clocking systems, card readers, turnstiles and boom gates.", "tags": ["Wi-Fi", "Fibre", "CCTV", "Access control", "Clocking", "Turnstiles", "Boom gates"], "hint": "e.g. site type, number of entrances or cameras, new install or repair"}, {"id": "property", "t": "Property & Real Estate", "c": "#e63038", "d": "Property acquisition, sales, rentals, property management, maintenance and investment-oriented property services.", "tags": ["Acquisition", "Sales", "Rentals", "Management", "Maintenance"], "hint": "e.g. buying, selling, renting or managing; area and budget"}, {"id": "events", "t": "Events Management", "c": "#a76bd1", "d": "Planning, coordination, staffing and operational support for corporate, private and institutional events.", "tags": ["Corporate", "Private", "Institutional", "Staffing"], "hint": "e.g. event type, date, venue, number of guests"}, {"id": "mining", "t": "Mining & Industrial Support", "c": "#e37a35", "d": "Mining support services, equipment and accessories, industrial supply opportunities and strategic partnerships.", "tags": ["Support services", "Equipment", "Accessories", "Industrial supply"], "hint": "e.g. items or services needed, quantities, delivery location"}, {"id": "business", "t": "Business & Investment", "c": "#33c1f0", "d": "A platform for strategic partnerships, investment opportunities, procurement relationships and scalable African ventures.", "tags": ["Partnerships", "Investment", "Procurement"], "hint": "e.g. the opportunity, your organisation and the markets involved"}];
const CFG={email:"info@yourdomain.com",bul:"263775293932",jhb:"27728876103"};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
document.documentElement.classList.add("js");
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const msg=o=>`Enquiry from the Alpha Vision website\nService: ${o.svc}\nLocation: ${o.loc||"Not given"}\nTimeline: ${o.when||"Not given"}\nDetails: ${o.det||"-"}\n\nName: ${o.nm}\nCompany: ${o.co||"-"}\nPhone: ${o.ph||"-"}\nEmail: ${o.em||"-"}`;
const wa=(office,m)=>`https://wa.me/${CFG[office]}?text=${encodeURIComponent(m)}`;
const mail=(svc,m)=>`mailto:${CFG.email}?subject=${encodeURIComponent("Enquiry: "+svc)}&body=${encodeURIComponent(m)}`;
$("#yr")&&($("#yr").textContent=new Date().getFullYear());
addEventListener("scroll",()=>{$("#bar").style.width=scrollY/Math.max(1,document.body.scrollHeight-innerHeight)*100+"%"},{passive:true});
/* nav */
$("#burger").onclick=e=>{const o=$(".menu").classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",o)};
const menu=$(".menu"),ind=$(".ind");
$$(".menu>li").forEach(li=>li.addEventListener("pointerenter",()=>{ind.style.opacity=1;ind.style.left=li.offsetLeft+"px";ind.style.width=li.offsetWidth+"px"}));
menu.addEventListener("pointerleave",()=>ind.style.opacity=0);
/* spotlight cards + reveal */
$$(".card").forEach(c=>c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--mx",e.clientX-r.left+"px");c.style.setProperty("--my",e.clientY-r.top+"px")}));
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12});
$$(".rv").forEach(e=>io.observe(e));
/* generic builders */
$$("[data-svc-opts]").forEach(box=>DIV.forEach(d=>box.insertAdjacentHTML("beforeend",`<label class="opt"><input type="checkbox" value="${d.t}"><span>${d.t}</span></label>`)));
/* quote wizard */
const qf=$("#qf");
if(qf){let step=0;const steps=$$(".step"),bars=$$(".steps i");
 const go=n=>{step=n;steps.forEach((s,i)=>s.classList.toggle("on",i==n));bars.forEach((b,i)=>b.classList.toggle("on",i<=n))};
 const pre=new URLSearchParams(location.search).get("s");const pi=DIV.findIndex(d=>d.id==pre);if(pi>-1)$$("#svc input")[pi].checked=true;
 $$("[data-back]").forEach(b=>b.onclick=()=>go(step-1));
 $$("[data-next]").forEach(b=>b.onclick=()=>{
  if(step==0&&!$$("#svc input:checked").length){$("#e0").textContent="Select at least one service.";return}
  if(step==1&&!$("#det").value.trim()){$("#e1").textContent="Add a few details so we can quote accurately.";$("#det").focus();return}
  $("#e0").textContent=$("#e1").textContent="";go(step+1)});
 qf.addEventListener("submit",e=>{e.preventDefault();const em=$("#em").value.trim(),ph=$("#ph").value.trim();
  if(!$("#nm").value.trim()||!(ph||em)){$("#e2").textContent="Enter your name and a phone number or email.";return}
  if(em&&!/^\S+@\S+\.\S+$/.test(em)){$("#e2").textContent="That email address looks incomplete.";return}
  const svc=$$("#svc input:checked").map(x=>x.value).join(", "),m=msg({svc,loc:$("#loc").value,when:$("#when").value,det:$("#det").value,nm:$("#nm").value,co:$("#co").value,ph,em});
  $("#sum").textContent=m;$("#sendwa").href=wa($("#of").value,m);$("#sendem").href=mail(svc,m);
  steps.forEach(s=>s.classList.remove("on"));bars.forEach(b=>b.classList.add("on"));$("#done").style.display="block"});
 $("#copy").onclick=async e=>{try{await navigator.clipboard.writeText($("#sum").textContent);e.target.textContent="Copied"}catch(x){e.target.textContent="Select the text to copy"}}}
/* contact form */
const cf=$("#cf");
if(cf)cf.addEventListener("submit",e=>{e.preventDefault();const nm=$("#cn").value.trim(),ph=$("#cp").value.trim();
 if(!nm||!ph){$("#ce").textContent="Enter your name and phone number.";return}
 const m=msg({svc:"General enquiry",det:$("#cm").value,nm,ph});window.open(wa($("#co2").value,m),"_blank","noopener");$("#ce").textContent=""});
/* security planner */
const PL={"Office or commercial building":["Access control","CCTV","Time-attendance clocking","Wi-Fi and fibre"],"Factory, warehouse or mine site":["Boom gates","Turnstile gates","CCTV","Card readers","Time-attendance clocking"],"Residential estate":["Boom gates","Access control","CCTV","Fibre installation"],"School or campus":["Access control","CCTV","Turnstile gates","Wi-Fi"],"Retail or hospitality":["CCTV","Access control","Card readers","Wi-Fi"]};
const pl=$("#planner");
if(pl){pl.insertAdjacentHTML("afterbegin",Object.keys(PL).map((k,i)=>`<label class="opt"><input type="radio" name="site" value="${k}"${i?"":" checked"}><span>${k}</span></label>`).join(""));
 const show=()=>{const k=pl.querySelector("input:checked").value;$("#plout").innerHTML=PL[k].map(x=>`<span class="chip live">${x}</span>`).join("");$("#plq").href="quote.html?s=security"};
 pl.addEventListener("change",show);show()}
/* popup enquiry */
const modal=document.createElement("div");modal.className="modal";modal.id="modal";modal.setAttribute("role","dialog");modal.setAttribute("aria-modal","true");modal.setAttribute("aria-labelledby","mt");
modal.innerHTML=`<div class="mbox"><button class="x" aria-label="Close">&times;</button><div class="mside"><img src="assets/emblem.png" alt=""><div><h3 id="mt">What can we help you with?</h3><p style="margin-top:10px;opacity:.9">Pick a service and tell us a little. We respond quickly.</p></div></div><div class="mmain"><h4>Choose a service</h4><div class="mchips" id="mchips">${DIV.map((d,i)=>`<button type="button" aria-pressed="false" style="--c:${d.c}" data-i="${i}">${d.t}</button>`).join("")}</div><label class="f" for="mh" id="mhl">Tell us about it</label><textarea id="mh" placeholder="Select a service to see what to include"></textarea><div class="two"><div><label class="f" for="mn">Name</label><input class="t" id="mn" autocomplete="name"></div><div><label class="f" for="mp">Phone</label><input class="t" id="mp" type="tel" autocomplete="tel"></div></div><label class="f" for="mo">Send to</label><select id="mo"><option value="bul">Bulawayo office</option><option value="jhb">Johannesburg office</option></select><div class="err" id="me" role="alert"></div><div class="nav2"><a class="btn pri" id="mwa" target="_blank" rel="noopener" href="#">Send on WhatsApp</a><a class="btn ghost" href="quote.html" style="color:var(--ink)">Full quotation form</a></div></div></div>`;
document.body.appendChild(modal);
let mi=-1,last=null;
const close=()=>{modal.classList.remove("open");store.set("av_seen","1");last&&last.focus()};
const open=()=>{last=document.activeElement;modal.classList.add("open");modal.querySelector(".x").focus()};
modal.querySelector(".x").onclick=close;modal.onclick=e=>{if(e.target==modal)close()};
addEventListener("keydown",e=>{if(e.key=="Escape"&&modal.classList.contains("open"))close()});
$$("#mchips button").forEach(b=>b.onclick=()=>{mi=+b.dataset.i;$$("#mchips button").forEach(x=>x.setAttribute("aria-pressed",x==b));$("#mh").placeholder=DIV[mi].hint});
$("#mwa").addEventListener("click",e=>{const nm=$("#mn").value.trim(),ph=$("#mp").value.trim();
 if(mi<0||!nm||!ph){e.preventDefault();$("#me").textContent=mi<0?"Choose a service first.":"Enter your name and phone number.";return}
 e.currentTarget.href=wa($("#mo").value,msg({svc:DIV[mi].t,det:$("#mh").value,nm,ph}));store.set("av_seen","1")});
$$("[data-open-enquiry]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();open()}));
if($("#home")&&(!store.get("av_seen")||/popup=1/.test(location.search))){
 setTimeout(()=>{if(!modal.classList.contains("open"))open()},7000);
 document.addEventListener("mouseout",e=>{if(e.clientY<=0&&!e.relatedTarget&&!modal.classList.contains("open")&&!store.get("av_seen"))open()},{once:true})}
