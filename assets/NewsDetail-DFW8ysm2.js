import{d,q as m,c as u,a as e,t as o,m as _,p,x as g,i as w,o as h,f as v}from"./vendor-DzbBucpy.js";import{_ as y}from"./home-io8MMJS0.js";const f={class:"news-detail"},x={class:"news-header"},N={class:"image-container"},D=["src","alt"],C={class:"news-content container"},j={class:"news-title"},k={class:"news-meta"},S={class:"news-date"},B={class:"news-category"},H={class:"news-body"},P=d({__name:"NewsDetail",setup(R){const c=g(),n={3:{title:"《异环》「奇点测试」定档11.28 超自然都市轻喜剧即将放送！",date:"2024-11-12",category:"announcement",image:"https://yh.wanmei.com/resources/jpg/20241112/114317313727441880.jpg",content:"由Hotta Studio自主研发，超自然都市开放世界RPG《异环》「奇点测试」将于11月28日开启！"},2:{title:"《异环》「奇点测试」招募开启 大都市新PV正在放送！",date:"2024-09-26",category:"announcement",image:"https://yh.wanmei.com/resources/jpg/20240925/114317272555415270.jpg",content:"超自然开放世界RPG《异环》首次测试即将开启，测试资格招募现已开放！"},1:{title:"《异环》全新角色「南离」预告片发布",date:"2024-07-18",category:"update",image:"https://yh.wanmei.com/images/cover240718/intelSlide1.jpg",content:"《异环》是Hotta Studio自主研发的超自然都市开放世界RPG。故事将从海特洛市启篇，作为首位「无证上岗」的「异象猎人」，你将成为经营不善、接取民间异象委托维持周转的古董店「伊波恩」的一员，与个性迥异、能力非凡的伙伴们一起探索各城市的大小谜团，历经有笑有泪的各式奇遇，演绎独属于你们的都市物语。"}},t=m(()=>n[c.params.id]||n[1]),i=s=>new Date(s).toLocaleDateString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit"}),l=s=>({update:"更新",event:"活动",announcement:"公告"})[s]||"新闻";return(s,a)=>{const r=w("router-link");return h(),u("div",f,[e("div",x,[e("div",N,[e("img",{src:t.value.image,alt:t.value.title,class:"news-image"},null,8,D)])]),e("div",C,[e("h1",j,o(t.value.title),1),e("div",k,[e("span",S,o(i(t.value.date)),1),e("span",B,o(l(t.value.category)),1)]),e("div",H,[e("p",null,o(t.value.content||t.value.excerpt),1)]),_(r,{to:"/news",class:"back-btn"},{default:p(()=>a[0]||(a[0]=[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"icon",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1),v(" 返回新闻列表 ")])),_:1})])])}}}),G=y(P,[["__scopeId","data-v-c51c006c"]]);export{G as default};
