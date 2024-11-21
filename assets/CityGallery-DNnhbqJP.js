import{d as v,r as u,c as o,a as e,n as _,F as c,g as m,o as n,t as g,h as y}from"./vendor-DzbBucpy.js";import{_ as w}from"./home-io8MMJS0.js";const f={class:"city-gallery"},k={class:"gallery-content"},T={class:"container"},C={class:"gallery-slider"},S={class:"gallery-image"},x=["src","alt"],I={class:"gallery-title"},j=["src","alt"],b={class:"gallery-text"},E={class:"slider-dots"},N=["onClick"],B=v({__name:"CityGallery",setup(L){const a=[{name:"海特洛市",image:"https://yh.wanmei.com/images/cover240718/NTE_features1.jpg",titleImage:"https://yh.wanmei.com/images/cover240718/citySlide1Tit.png",description:"这座充满未来感的城市中，科技与人文交织，创造出独特的都市魅力。霓虹灯光与现代建筑相映成辉，勾勒出一幅令人向往的都市画卷。"},{name:"新城区",image:"https://yh.wanmei.com/images/cover240718/NTE_features2.jpg",titleImage:"https://yh.wanmei.com/images/cover240718/citySlide2Tit.png",description:"繁华的新城区是城市发展的缩影，高耸入云的摩天大楼与充满活力的街区相得益彰。这里是梦想与机遇的交汇点，每个角落都蕴含着无限可能。"},{name:"商业街区",image:"https://yh.wanmei.com/images/cover240718/NTE_features3.jpg",titleImage:"https://yh.wanmei.com/images/cover240718/citySlide3Tit.png",description:"灯火通明的商业街区是城市的活力中心，各式店铺与餐厅汇聚于此。街道上霓虹闪烁，人来人往，展现着都市的繁华与热闹。"},{name:"中央广场",image:"https://yh.wanmei.com/images/cover240718/NTE_features4.jpg",titleImage:"https://yh.wanmei.com/images/cover240718/citySlide4Tit.png",description:"城市的心脏地带，宏伟的建筑群环绕着开阔的广场。这里是市民休闲娱乐的首选之地，也是举办重要活动的核心场所。"},{name:"科技园区",image:"https://yh.wanmei.com/images/cover240718/NTE_features5.jpg",titleImage:"https://yh.wanmei.com/images/cover240718/citySlide5Tit.png",description:"未来科技的发源地，林立的研究设施与实验室构成了这片充满创新气息的园区。这里孕育着改变世界的新技术，是城市发展的重要引擎。"}],t=u(0),d=()=>{t.value>=a.length-1?t.value=0:t.value++},p=()=>{t.value<=0?t.value=a.length-1:t.value--},h=r=>{t.value=r};return(r,l)=>(n(),o("div",f,[e("section",k,[e("div",T,[e("div",C,[e("div",{class:"gallery-slides",style:_({transform:`translateX(-${t.value*100}%)`})},[(n(),o(c,null,m(a,(s,i)=>e("article",{class:"gallery-item",key:i},[e("div",S,[e("img",{src:s.image,alt:s.name},null,8,x),e("div",I,[e("img",{src:s.titleImage,alt:s.name+"标题",class:"title-image"},null,8,j)])]),e("div",b,[e("h2",null,g(s.name),1),e("p",null,g(s.description),1)])])),64))],4),e("button",{class:"slider-btn prev",onClick:p},l[0]||(l[0]=[e("svg",{class:"arrow-icon",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M15 18L9 12L15 6",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)])),e("button",{class:"slider-btn next",onClick:d},l[1]||(l[1]=[e("svg",{class:"arrow-icon",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M9 6L15 12L9 18",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"})],-1)])),e("div",E,[(n(),o(c,null,m(a,(s,i)=>e("button",{key:i,class:y(["dot",{active:t.value===i}]),onClick:z=>h(i)},null,10,N)),64))])])])])]))}}),M=w(B,[["__scopeId","data-v-e50fbc11"]]);export{M as default};
