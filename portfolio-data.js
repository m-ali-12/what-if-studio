// portfolio-data.js — What If Studios
// ⚠️ IMPORTANT: Jab bhi admin mein changes karo, "Download portfolio-data.js"
// button click karo aur is file ko replace karke Vercel pe redeploy karo.

var portfolioData = [
  {id:1,cat:"Logo Design",title:"The Thi Agency",desc:"Modern minimalist brand identity for a creative agency.",img:"#",tags:["logo","minimal"]},
  {id:2,cat:"Logo Design",title:"Motorcycle Style",desc:"Bold typographic logo for a motorcycle lifestyle brand.",img:"#",tags:["logo","typography"]},
  {id:3,cat:"Logo Design",title:"Zalmpine Mark",desc:"Premium monogram for a high-end lifestyle brand.",img:"#",tags:["logo","premium"]},
  {id:4,cat:"Logo Design",title:"Clinic Center",desc:"Clean healthcare logo with professional appeal.",img:"#",tags:["logo","medical"]},
  {id:5,cat:"Logo Design",title:"bff Wordmark",desc:"Playful wordmark for a lifestyle startup.",img:"#",tags:["logo","wordmark"]},
  {id:6,cat:"Logo Design",title:"LAKKI Brand",desc:"Bold slab-serif wordmark for a retail brand.",img:"#",tags:["logo","retail"]},
  {id:7,cat:"Logo Design",title:"IMMY Symbol",desc:"Symbol + wordmark combo for a personal brand.",img:"#",tags:["logo","personal"]},
  {id:8,cat:"Logo Design",title:"Dalmune Geometric",desc:"Geometric mark for a premium brand identity.",img:"#",tags:["logo","geometric"]},
  {id:9,cat:"Social Media",title:"Branding Post Series",desc:"Vibrant social media posts for brand awareness.",img:"#",tags:["social","post"]},
  {id:10,cat:"Social Media",title:"Business Branding",desc:"Consistent branding visuals for social platforms.",img:"#",tags:["social","branding"]},
  {id:11,cat:"Social Media",title:"Event Post Design",desc:"Eye-catching event announcement post.",img:"#",tags:["social","event"]},
  {id:12,cat:"Social Media",title:"USA Flag Promo",desc:"Patriotic themed promotional social graphics.",img:"#",tags:["social","usa"]},
  {id:13,cat:"Social Media",title:"Limited Drop Post",desc:"Product drop announcement with urgency visuals.",img:"#",tags:["social","product"]},
  {id:14,cat:"Social Media",title:"Promotional Banner",desc:"Clean promotional banner for social advertising.",img:"#",tags:["social","ad"]},
  {id:15,cat:"Social Media",title:"Lifestyle Graphic",desc:"Engaging lifestyle content graphic.",img:"#",tags:["social","lifestyle"]},
  {id:16,cat:"Thumbnails",title:"YouTube Thumbnail A",desc:"High-CTR thumbnail for content creators.",img:"#",tags:["thumb","youtube"]},
  {id:17,cat:"Thumbnails",title:"Reel Cover Design",desc:"Eye-catching reel/story cover for Instagram.",img:"#",tags:["thumb","reel"]},
  {id:18,cat:"Thumbnails",title:"Design Reel Cover",desc:"Bold design-niche thumbnail with strong typography.",img:"#",tags:["thumb","design"]},
  {id:19,cat:"Thumbnails",title:"Advanced SEO Thumb",desc:"Clean professional thumbnail for an SEO tutorial.",img:"#",tags:["thumb","seo"]},
  {id:20,cat:"Thumbnails",title:"Website Design Thumb",desc:"Modern web design tutorial thumbnail.",img:"#",tags:["thumb","web"]},
  {id:21,cat:"Thumbnails",title:"Trend Alert Thumb",desc:"Trending topic alert thumbnail.",img:"#",tags:["thumb","trend"]},
  {id:22,cat:"Poster & Flyer",title:"Event Flyer",desc:"Print-ready event flyer with bold visuals.",img:"#",tags:["poster","event"]},
  {id:23,cat:"Poster & Flyer",title:"Promotions Poster",desc:"Commercial promotional poster for retail.",img:"#",tags:["poster","promo"]},
  {id:24,cat:"Poster & Flyer",title:"Motivational Poster",desc:"Clean motivational quote poster.",img:"#",tags:["poster","quote"]},
  {id:25,cat:"Poster & Flyer",title:"Food Promo Flyer",desc:"Delicious food promotional flyer.",img:"#",tags:["poster","food"]},
  {id:26,cat:"Brand Identity",title:"Full Brand Package",desc:"Logo + colors + typography + full brand guide.",img:"#",tags:["brand","identity"]},
  {id:27,cat:"Brand Identity",title:"Startup Brand Kit",desc:"Complete startup identity package.",img:"#",tags:["brand","startup"]},
  {id:28,cat:"Brand Identity",title:"Personal Brand",desc:"Cohesive personal brand for an influencer.",img:"#",tags:["brand","personal"]},
  {id:29,cat:"Reels & Video",title:"Short Form Edit",desc:"Dynamic short-form video for Instagram Reels.",img:"#",tags:["reel","video"]},
  {id:30,cat:"Reels & Video",title:"Product Showcase",desc:"Promotional product reel with motion graphics.",img:"#",tags:["reel","product"]},
  {id:31,cat:"Reels & Video",title:"Lifestyle Reel",desc:"Engaging lifestyle content reel.",img:"#",tags:["reel","lifestyle"]}
];

// ✅ AUTO-SYNC: localStorage se updated data load karo (admin panel se)
(function(){
  try {
    var saved = JSON.parse(localStorage.getItem('wis_portfolio') || 'null');
    if (saved && Array.isArray(saved) && saved.length > 0) {
      portfolioData = saved;
    }
  } catch(e) {}
})();