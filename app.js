var names=[["Aarav Sharma","10-A"],["Diya Nair","10-A"],["Rohan Gupta","10-B"],["Meera Iyer","10-B"],["Kabir Rao","9-A"],["Ananya Das","9-A"],["Vikram Reddy","9-B"],["Sneha Patel","9-B"]],base=[88,80,68,74,57,86,62,78],subs=["Maths","Science","English","Computer"],tests=["Unit Test 1","Unit Test 2","Mid-Term"];
var S=names.map(function(n,i){return{id:"S"+(101+i),name:n[0],cls:n[1],email:n[0].split(" ")[0].toLowerCase()+"@school.in"}}),A=[];
S.forEach(function(s,i){subs.forEach(function(u,j){tests.forEach(function(t,k){A.push({sid:s.id,sub:u,test:t,score:Math.max(35,Math.min(98,base[i]+[3,-2,4,-5][j]+[-3,1,4][k]+((i+j+k)%3)))})})})});
var $=function(i){return document.getElementById(i)},edit=null;
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function avg(l){return l.length?l.reduce(function(a,b){return a+b},0)/l.length:0}
function sAvg(id){return avg(A.filter(function(a){return a.sid==id}).map(function(a){return a.score}))}
function lv(v){return v>=80?["Excellent","ok"]:v>=60?["Good","warn"]:["Needs support","bad"]}
function bar(v){return '<div class="bar"><i class="b-'+lv(v)[1]+'" style="width:'+v+'%"></i></div>'}
function tag(v){var l=lv(v);return '<span class="tag t-'+l[1]+'">'+l[0]+'</span>'}
function ini(n){return n.split(" ").map(function(w){return w[0]}).slice(0,2).join("")}
function who(s){return '<div class="who"><div class="av">'+esc(ini(s.name))+'</div><div>'+esc(s.name)+'<small>'+esc(s.id)+'</small></div></div>'}
function name(id){var s=S.find(function(x){return x.id==id});return s?s.name:id}
function toast(m){var t=$("toast");t.textContent=m;t.classList.add("on");setTimeout(function(){t.classList.remove("on")},2200)}
var ico={dashboard:'<path d="M3 13h8V3H3zM13 21h8v-6h-8zM13 3v8h8V3zM3 21h8v-6H3z"/>',students:'<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6M17 4a4 4 0 010 8M22 21c0-3-2-5-4-5.5"/>',assess:'<path d="M5 3h11l3 3v15H5zM9 11h6M9 15h6"/>',reports:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>'};
var tabs=[["dashboard","Dashboard","Overview of learning progress"],["students","Students","Manage student profiles"],["assess","Assessments","Record and review scores"],["reports","Reports","Individual progress reports"]];
$("nav").innerHTML=tabs.map(function(t,i){return '<button data-t="'+t[0]+'"'+(i?'':' class="on"')+'><svg viewBox="0 0 24 24">'+ico[t[0]]+'</svg>'+t[1]+'</button>'}).join("");
$("nav").onclick=function(e){var b=e.target.closest("button");if(!b)return;var t=b.dataset.t;document.querySelectorAll(".sub").forEach(function(s){s.classList.toggle("on",s.id==t)});document.querySelectorAll("aside button").forEach(function(x){x.classList.toggle("on",x==b)});var m=tabs.find(function(x){return x[0]==t});$("ttl").textContent=m[1];$("sub").textContent=m[2]};
function kpi(v,l,i){return '<div class="card kpi"><div class="ic"><svg viewBox="0 0 24 24">'+ico[i]+'</svg></div><div><b>'+v+'</b><span>'+l+'</span></div></div>'}
function render(){
 var av=S.map(function(s){return sAvg(s.id)}),ov=avg(av),risk=S.filter(function(s){return sAvg(s.id)<60});
 $("kpis").innerHTML=kpi(S.length,"Students enrolled","students")+kpi(A.length,"Assessments recorded","assess")+kpi(ov.toFixed(1)+"%","Overall average","reports")+kpi(risk.length,"Need support","dashboard");
 var tn=[];A.forEach(function(a){if(tn.indexOf(a.test)<0)tn.push(a.test)});var tv=tn.map(function(t){return avg(A.filter(function(a){return a.test==t}).map(function(a){return a.score}))});
 var mn=Math.min.apply(0,tv)-6,mx=Math.max.apply(0,tv)+6,pts=tv.map(function(v,i){return[40+i*(tn.length>1?320/(tn.length-1):0),150-(v-mn)/(mx-mn)*120]});
 $("trend").innerHTML='<svg viewBox="0 0 400 190" width="100%"><polyline fill="none" stroke="var(--acc)" stroke-width="3" points="'+pts.map(function(p){return p.join(",")}).join(" ")+'"/>'+pts.map(function(p,i){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="var(--acc)"/><text x="'+p[0]+'" y="'+(p[1]-11)+'" text-anchor="middle">'+tv[i].toFixed(1)+'</text><text x="'+p[0]+'" y="178" text-anchor="middle">'+esc(tn[i])+'</text>'}).join("")+'</svg>';
 var c={ok:0,warn:0,bad:0};av.forEach(function(v){c[lv(v)[1]]++});var col={ok:"var(--ok)",warn:"var(--warn)",bad:"var(--bad)"},lb={ok:"Excellent (80+)",warn:"Good (60-79)",bad:"Needs support (<60)"},off=0,R=52,C=2*Math.PI*R,tot=S.length||1;
 $("donut").innerHTML='<svg viewBox="0 0 140 140" width="150" style="display:block;margin:auto"><circle cx="70" cy="70" r="'+R+'" fill="none" stroke="var(--line)" stroke-width="16"/>'+["ok","warn","bad"].map(function(k){var d=c[k]/tot*C,o='<circle cx="70" cy="70" r="'+R+'" fill="none" stroke="'+col[k]+'" stroke-width="16" stroke-dasharray="'+d+' '+(C-d)+'" stroke-dashoffset="'+(-off)+'" transform="rotate(-90 70 70)"/>';off+=d;return o}).join("")+'<text x="70" y="76" text-anchor="middle" style="font-size:22px;font-weight:700;fill:var(--ink)">'+S.length+'</text></svg><div class="leg">'+["ok","warn","bad"].map(function(k){return '<span><em style="font-style:normal"><i class="dot" style="background:'+col[k]+'"></i>'+lb[k]+'</em><b>'+c[k]+'</b></span>'}).join("")+'</div>';
 var bs=subs.map(function(u){return avg(A.filter(function(a){return a.sub==u}).map(function(a){return a.score}))});
 $("chart").innerHTML='<svg viewBox="0 0 400 190" width="100%">'+bs.map(function(v,i){var h=v*1.5;return '<rect x="'+(i*98+22)+'" y="'+(160-h)+'" width="56" height="'+h+'" rx="6" fill="var(--acc)" opacity="'+(0.55+i*0.15)+'"/><text x="'+(i*98+50)+'" y="'+(154-h)+'" text-anchor="middle">'+v.toFixed(0)+'</text><text x="'+(i*98+50)+'" y="178" text-anchor="middle">'+esc(subs[i])+'</text>'}).join("")+'</svg>';
 var rk=S.slice().sort(function(a,b){return sAvg(b.id)-sAvg(a.id)});
 $("top").innerHTML='<tr><th>Student</th><th>Average</th></tr>'+rk.slice(0,4).map(function(s){return '<tr><td>'+who(s)+'</td><td>'+sAvg(s.id).toFixed(1)+'%</td></tr>'}).join("");
 $("risk").innerHTML='<tr><th>Student</th><th>Class</th><th>Average</th><th>Progress</th></tr>'+(risk.length?risk.map(function(s){return '<tr><td>'+who(s)+'</td><td>'+esc(s.cls)+'</td><td>'+sAvg(s.id).toFixed(1)+'%</td><td>'+bar(sAvg(s.id))+'</td></tr>'}).join(""):'<tr><td colspan="4">No students below 60%. Every student is on track.</td></tr>');
 var cur=$("fc").value,cl=[];S.forEach(function(s){if(cl.indexOf(s.cls)<0)cl.push(s.cls)});
 $("fc").innerHTML='<option value="">All classes</option>'+cl.map(function(x){return '<option'+(x==cur?" selected":"")+'>'+esc(x)+'</option>'}).join("");
 students();
 var o=S.map(function(s){return '<option value="'+s.id+'">'+esc(s.name)+' ('+s.id+')</option>'}).join(""),a=$("as").value,r=$("rs").value;$("as").innerHTML=o;$("rs").innerHTML=o;if(a)$("as").value=a;if(r)$("rs").value=r;
 $("atbl").innerHTML='<tr><th>Student</th><th>Subject</th><th>Test</th><th>Score</th></tr>'+A.slice(-8).reverse().map(function(x){return '<tr><td>'+esc(name(x.sid))+'</td><td>'+esc(x.sub)+'</td><td>'+esc(x.test)+'</td><td>'+x.score+'</td></tr>'}).join("");
 report();
}
function students(){var q=$("q").value.toLowerCase(),c=$("fc").value,l=S.filter(function(s){return(!c||s.cls==c)&&(s.name+s.id+s.cls).toLowerCase().indexOf(q)>-1});
 $("stbl").innerHTML='<tr><th>Student</th><th>Class</th><th>Email</th><th>Average</th><th>Status</th><th></th></tr>'+(l.length?l.map(function(s){var v=sAvg(s.id);return '<tr><td>'+who(s)+'</td><td>'+esc(s.cls)+'</td><td>'+esc(s.email)+'</td><td>'+v.toFixed(1)+'%</td><td>'+tag(v)+'</td><td><button class="lk" data-e="'+s.id+'">Edit</button><button class="lk d" data-d="'+s.id+'">Delete</button></td></tr>'}).join(""):'<tr><td colspan="6">No students match your search. Try another name, ID or class.</td></tr>')}
$("q").oninput=students;$("fc").onchange=students;
$("stbl").onclick=function(e){var d=e.target.dataset;
 if(d.d){S=S.filter(function(s){return s.id!=d.d});A=A.filter(function(a){return a.sid!=d.d});render();toast("Student deleted")}
 if(d.e){var s=S.find(function(x){return x.id==d.e});edit=s.id;$("fid").value=s.id;$("fn").value=s.name;$("fcl").value=s.cls;$("fe").value=s.email;$("ft").textContent="Edit student";$("save").textContent="Update student";$("fn").focus()}};
$("save").onclick=function(){var o={id:$("fid").value.trim(),name:$("fn").value.trim(),cls:$("fcl").value.trim(),email:$("fe").value.trim()};
 if(!o.id||!o.name){toast("Enter a student ID and full name");return}
 if(edit){var i=S.findIndex(function(s){return s.id==edit});S[i]=o;toast("Student updated")}else{if(S.some(function(s){return s.id==o.id})){toast("That student ID already exists");return}S.push(o);toast("Student saved")}
 edit=null;["fid","fn","fcl","fe"].forEach(function(i){$(i).value=""});$("ft").textContent="Add student";$("save").textContent="Save student";render()};
$("add").onclick=function(){var m=parseFloat($("am").value),u=$("asub").value.trim();if(!u||isNaN(m)||m<0||m>100){toast("Enter a subject and a score from 0 to 100");return}
 A.push({sid:$("as").value,sub:u,test:$("at").value.trim()||"Test",score:m});if(subs.indexOf(u)<0)subs.push(u);["asub","at","am"].forEach(function(i){$(i).value=""});render();toast("Assessment recorded")};
function report(){var id=$("rs").value,s=S.find(function(x){return x.id==id});if(!s){$("rep").innerHTML='<div class="card">Add a student to see a report.</div>';return}
 var l=A.filter(function(a){return a.sid==id}),v=sAvg(id),best=l.slice().sort(function(a,b){return b.score-a.score})[0];
 $("rep").innerHTML='<div class="card"><div class="who" style="margin-bottom:16px"><div class="av" style="width:48px;height:48px;font-size:16px">'+esc(ini(s.name))+'</div><div><b style="font-size:17px">'+esc(s.name)+'</b><small>'+esc(s.id)+' | Class '+esc(s.cls)+' | '+esc(s.email)+'</small></div></div><div class="grid" style="margin-bottom:16px"><div class="card"><span style="color:var(--mute)">Overall average</span><br><b style="font-size:22px">'+v.toFixed(1)+'%</b></div><div class="card"><span style="color:var(--mute)">Status</span><br>'+tag(v)+'</div><div class="card"><span style="color:var(--mute)">Best result</span><br><b>'+(best?esc(best.sub)+' ('+best.score+')':"-")+'</b></div></div><div class="wrap"><table><tr><th>Subject</th><th>Test</th><th>Score</th><th>Progress</th></tr>'+l.map(function(x){return '<tr><td>'+esc(x.sub)+'</td><td>'+esc(x.test)+'</td><td>'+x.score+'</td><td>'+bar(x.score)+'</td></tr>'}).join("")+'</table></div></div>'}
$("rs").onchange=report;render();
