// Generates static per-region CEO course pages under region/<slug>.html
// so search engines and AI crawlers (which don't execute the JS that
// region.html?r=<slug> relies on) see real title/meta/content per region.
const fs = require('fs');
const path = require('path');

const SCHEDULE = [
  {course:'CEO과정', region:'전북', slug:'jeonbuk', gisu:'49기', start:'08.13', end:'12.03', day:'목', dur:'16주', price:'3,800,000원'},
  {course:'HIP', region:'울산', slug:'ulsan', gisu:'-', start:'08.19', end:'09.09', day:'목', dur:'4주', price:'1,500,000원'},
  {course:'DYLP', region:'서울', slug:'seoul', gisu:'17기', start:'08.20', end:'08.21', day:'목금', dur:'2일', price:'800,000원'},
  {course:'CEO과정', region:'용인', slug:'yongin', gisu:'58기', start:'08.27', end:'11.19', day:'목', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'파주', slug:'paju', gisu:'27기', start:'09.02', end:'11.18', day:'수', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'포항', slug:'pohang', gisu:'28기', start:'09.03', end:'11.26', day:'목', dur:'12주', price:'1,980,000원'},
  {course:'CEO과정', region:'오산', slug:'osan', gisu:'65기', start:'09.03', end:'12.03', day:'목', dur:'12주', price:'2,750,000원'},
  {course:'LTM', region:'서울', slug:'seoul', gisu:'8기', start:'09.04', end:'09.18', day:'금', dur:'3주', price:'1,200,000원'},
  {course:'CEO과정', region:'화성·오산', slug:'hwaseong-osan', gisu:'42기', start:'09.07', end:'11.30', day:'월', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'대구', slug:'daegu', gisu:'88기', start:'09.07', end:'11.03', day:'월', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'서울', slug:'seoul', gisu:'103기', start:'09.08', end:'11.24', day:'화', dur:'12주', price:'4,000,000원'},
  {course:'CEO과정', region:'이천·여주·양평', slug:'icheon-yeoju-yangpyeong', gisu:'53기', start:'09.08', end:'12.01', day:'화', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'부산', slug:'busan', gisu:'78기', start:'09.08', end:'11.24', day:'화', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'고양', slug:'goyang', gisu:'55기', start:'09.14', end:'12.07', day:'화', dur:'12주', price:'2,900,000원'},
  {course:'TLA', region:'대구경북', slug:'daegu-gyeongbuk', gisu:'4기', start:'09.15', end:'10.20', day:'화', dur:'6주', price:'1,300,000원'},
  {course:'CEO과정', region:'의정부·양주·포천', slug:'uijeongbu-yangju-pocheon', gisu:'28기', start:'09.15', end:'12.01', day:'화', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'광주·하남', slug:'gwangju-hanam', gisu:'52기', start:'09.15', end:'12.01', day:'화', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'광명', slug:'gwangmyeong', gisu:'57기', start:'09.16', end:'12.02', day:'수', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'수원', slug:'suwon', gisu:'67기', start:'09.17', end:'12.10', day:'목', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'시흥', slug:'siheung', gisu:'65기', start:'09.17', end:'12.10', day:'수', dur:'12주', price:'2,900,000원'},
  {course:'CEO과정', region:'대전', slug:'daejeon', gisu:'53기', start:'10.01', end:'12.17', day:'목', dur:'12주', price:'2,900,000원'},
  {course:'차세대 경영자', region:'서울', slug:'seoul', gisu:'2기', start:'10.01', end:'12.17', day:'목', dur:'12주', price:'3,600,000원'},
  {course:'CEO과정', region:'강남', slug:'gangnam', gisu:'103기', start:'09.08', end:'11.24', day:'화', dur:'12주', price:'4,000,000원'}
];

const REGION_NAMES = {};
const REGION_ORDER = [];
SCHEDULE.forEach(row => {
  if (!(row.slug in REGION_NAMES)) {
    REGION_NAMES[row.slug] = row.region;
    REGION_ORDER.push(row.slug);
  }
});

const OUT_DIR = path.join(__dirname, 'region');
fs.mkdirSync(OUT_DIR, { recursive: true });

function page(slug) {
  const regionName = REGION_NAMES[slug];
  const rows = SCHEDULE.filter(r => r.slug === slug);
  const first = rows[0];

  const title = `${regionName} 카네기 CEO과정 ${first.gisu} | ${regionName} 사업가모임·대표모임 | 데일카네기코리아`;
  const desc = `${regionName} 사업가모임·${regionName} 대표모임으로도 이어지는 데일카네기 ${first.course} ${first.gisu} — ${first.day}요일반, ${first.dur} 과정, ${first.start} 개강 · ${first.end} 수료, 수강료 ${first.price}. 경영진교육·팀장리더십·리더십강의 상담 접수중. 상담문의 010-5551-6230`;
  const ogTitle = `${regionName} 카네기 CEO과정 | 데일카네기코리아`;
  const pTitle = `${regionName} 카네기 CEO과정 · ${regionName} 사업가모임`;
  const pIntro = `${regionName} 지역 대표·CEO·자영업자를 위한 데일카네기 리더십강의입니다. 스타트업, 제조업, 유통업, 건설업, 부동산업, 프랜차이즈, 무역업, 금융업, 증권가, 의료업(병원) 등 업종을 가리지 않고, 창업 1세대부터 2세 경영승계를 준비하는 후계자까지 함께하고 있습니다. 직원관리와 소통·대화법의 원칙을 익히는 것은 리더십 교육의 시작일 뿐입니다. 실제로 많은 분들이 ${regionName} 대표자모임·CEO모임·총동문회·경영자 골프회에서 만난 인맥을 통해 새로운 거래처와 사업 파트너를 발굴하며 비즈니스를 확장하고 계십니다.`;
  const alumniHtml = `수료는 끝이 아니라 시작입니다. ${regionName} 카네기 총동문회는 ${regionName} 사업가모임이자 ${regionName} 대표모임으로, 지역·업종을 넘나드는 비즈니스모임, 경영자 네트워크, 조찬모임, 골프모임으로 관계를 이어가실 수 있습니다. <a href="../network.html" style="color:var(--red); font-weight:700;">동문 네트워크 자세히 보기 →</a>`;

  const tableRows = rows.map(r =>
    `          <tr><td class="course">${r.course}</td><td class="gisu">${r.gisu}</td><td>${r.start}</td><td>${r.end}</td><td>${r.day}</td><td>${r.dur}</td><td>${r.price}</td><td><a href="../contact.html">신청 →</a></td></tr>`
  ).join('\n');

  const regionListHtml = REGION_ORDER.map(s =>
    `      <a href="${s}.html"${s === slug ? ' class="current"' : ''}>${REGION_NAMES[s]} CEO과정</a>`
  ).join('\n');

  const courseSchema = rows.map(r => ({
    "@type": "Course",
    "name": `${regionName} ${r.course}`,
    "description": `${regionName} 데일카네기 ${r.course} ${r.gisu} — ${r.day}요일반, ${r.dur}, ${r.start} 개강, 수강료 ${r.price}`,
    "provider": { "@type": "Organization", "name": "데일카네기코리아", "sameAs": "https://carnegie-ceo.co.kr/" },
    "areaServed": regionName
  }));

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="https://carnegie-ceo.co.kr/region/${slug}.html">
<meta property="og:type" content="website">
<meta property="og:title" content="${ogTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://carnegie-ceo.co.kr/region/${slug}.html">
<meta property="og:image" content="https://carnegie-ceo.co.kr/logo-standard.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23bd1622'/%3E%3Ctext x='50' y='70' font-family='Georgia,serif' font-size='56' font-weight='800' fill='white' text-anchor='middle'%3EDC%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500;600;700;900&family=Noto+Sans+KR:wght@400;500;600;700;900&display=swap" rel="stylesheet">
<script type="application/ld+json">
${JSON.stringify({ "@context": "https://schema.org", "@graph": courseSchema }, null, 2)}
</script>
<style>
  :root{
    --black:#111011; --black-2:#1c1a1b; --cream:#f6f1e7; --cream-2:#efe8d8; --white:#ffffff;
    --red:#bd1622; --red-dark:#8f0f19; --gray:#6b6660; --gray-light:#9a948b; --line: rgba(17,16,17,0.12);
    --serif: 'Noto Serif KR', serif; --sans: 'Noto Sans KR', sans-serif; --maxw: 1160px;
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  body{font-family: var(--sans); color: var(--black); background: var(--cream); -webkit-font-smoothing:antialiased; overflow-x:hidden; word-break:keep-all; overflow-wrap:break-word;}
  a{color:inherit; text-decoration:none;}
  .wrap{max-width:var(--maxw); margin:0 auto; padding:0 24px;}
  .eyebrow{font-size:13px; letter-spacing:.18em; font-weight:700; text-transform:uppercase; color:var(--red); display:inline-flex; align-items:center; gap:8px; margin-bottom:14px;}
  .eyebrow::before{content:''; width:20px; height:2px; background:var(--red); display:inline-block;}
  h1,h2,h3{font-family:var(--serif); font-weight:800; line-height:1.25;}
  .section{padding:80px 0;}
  .section-title{font-size:clamp(26px,4vw,38px); margin-bottom:14px;}
  .section-sub{color:var(--gray); font-size:15.5px; line-height:1.7; max-width:640px;}
  .btn{display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:16px 30px; font-weight:700; font-size:15px; border-radius:2px; cursor:pointer; border:1px solid transparent; letter-spacing:.02em;}
  .btn-red{background:var(--red); color:#fff;}
  .btn-red:hover{background:var(--red-dark);}

  header{position:fixed; top:0; left:0; right:0; z-index:100; background:rgba(17,16,17,.94); backdrop-filter:blur(6px); border-bottom:1px solid rgba(255,255,255,.08);}
  .nav{display:flex; align-items:center; justify-content:space-between; height:76px; max-width:var(--maxw); margin:0 auto; padding:0 24px;}
  .logo-img{height:44px; width:auto; filter:invert(1); mix-blend-mode:screen; display:block;}
  nav.menu{display:flex; align-items:center; gap:34px;}
  nav.menu a{color:#e9e5dc; font-size:14.5px; font-weight:500; opacity:.88;}
  nav.menu a:hover{opacity:1; color:var(--red);}
  .nav-right{display:flex; align-items:center; gap:16px;}
  .nav-tel{color:#fff; font-weight:700; font-size:14.5px;}
  .hamburger{display:none; flex-direction:column; gap:5px; cursor:pointer; background:none; border:none; padding:6px;}
  .hamburger span{width:22px; height:2px; background:#fff; display:block;}
  .mobile-menu{display:none; position:fixed; top:76px; left:0; right:0; bottom:0; background:var(--black); z-index:99; padding:36px 24px; flex-direction:column; gap:26px;}
  .mobile-menu.open{display:flex;}
  .mobile-menu a{color:#fff; font-size:20px; font-family:var(--serif); font-weight:700;}

  .page-hero{background:linear-gradient(180deg, var(--black) 0%, var(--black-2) 100%); color:#fff; padding:190px 0 64px;}
  .page-hero .eyebrow{color:var(--red);}
  .page-hero .eyebrow::before{background:var(--red);}
  .page-hero h1{font-size:clamp(30px,5vw,48px); color:#fff; max-width:760px;}
  .page-hero p{color:var(--gray-light); font-size:16.5px; margin-top:16px; max-width:640px; line-height:1.75;}
  .breadcrumb{font-size:13px; color:var(--gray-light); margin-bottom:18px;}
  .breadcrumb a{color:var(--gray-light);}
  .breadcrumb a:hover{color:#fff;}

  .table-scroll{overflow-x:auto; margin-top:36px; border:1px solid var(--line);}
  table.sched-table{width:100%; border-collapse:collapse; min-width:600px; background:var(--white);}
  table.sched-table th, table.sched-table td{padding:14px 18px; text-align:left; font-size:14px; border-bottom:1px solid var(--line); white-space:nowrap;}
  table.sched-table thead th{background:var(--black); color:#fff; font-weight:700; font-size:12.5px; letter-spacing:.05em;}
  table.sched-table td.course{font-weight:700;}
  table.sched-table td.gisu{color:var(--red); font-weight:700;}
  table.sched-table td.apply-cell a{color:var(--red); font-weight:700; border-bottom:1px solid var(--red);}
  .note-box{margin-top:22px; padding:16px 20px; border:1px dashed var(--gray-light); font-size:13px; color:var(--gray); background:var(--cream-2);}

  .why-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); margin-top:20px; border:1px solid var(--line);}
  .why-card{background:var(--white); padding:32px 26px;}
  .why-card h3{font-size:18px; margin-bottom:10px;}
  .why-card p{color:var(--gray); font-size:13.5px; line-height:1.7;}

  .region-list{display:flex; flex-wrap:wrap; gap:9px; margin-top:18px;}
  .region-list a{padding:8px 16px; border:1px solid var(--line); font-size:13px; font-weight:600; background:var(--white);}
  .region-list a:hover{background:var(--red); color:#fff; border-color:var(--red);}
  .region-list a.current{background:var(--black); color:#fff; border-color:var(--black);}

  .cta-strip{background:var(--red); color:#fff; padding:56px 0; text-align:center;}
  .cta-strip h2{color:#fff; font-size:clamp(22px,3vw,30px); margin-bottom:18px;}
  .cta-strip .btn{background:#fff; color:var(--red); font-weight:800;}

  footer{background:var(--black-2); color:var(--gray-light); padding:40px 0; border-top:1px solid rgba(255,255,255,.08); font-size:12px; text-align:center;}

  @media (max-width:920px){
    nav.menu{display:none;} .nav-tel{display:none;} .hamburger{display:flex;}
    .why-grid{grid-template-columns:1fr;}
  }
</style>
</head>
<body>

<header>
  <div class="nav">
    <img src="../logo-inline.jpg" alt="Dale Carnegie" class="logo-img">
    <nav class="menu">
      <a href="../about.html">소개</a>
      <a href="../programs.html">프로그램</a>
      <a href="../schedule.html">개강일정</a>
      <a href="../contact.html">상담신청</a>
    </nav>
    <div class="nav-right">
      <a class="nav-tel" href="tel:010-5551-6230">010-5551-6230</a>
      <a href="../contact.html" class="btn btn-red">상담신청</a>
      <button class="hamburger" onclick="this.closest('header').querySelector('.mobile-menu').classList.toggle('open')">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="mobile-menu">
      <a href="../about.html">소개</a>
      <a href="../programs.html">프로그램</a>
      <a href="../schedule.html">개강일정</a>
      <a href="../contact.html">상담신청</a>
    </div>
</header>

<section class="page-hero">
  <div class="wrap">
    <div class="breadcrumb"><a href="../index.html">홈</a> / <a href="../schedule.html">개강일정</a> / <span>${regionName}</span></div>
    <div class="eyebrow">DALE CARNEGIE KOREA</div>
    <h1>${pTitle}</h1>
    <p>${pIntro}</p>
  </div>
</section>

<section class="section" style="padding-bottom:40px;">
  <div class="wrap">
    <div class="eyebrow">개강 일정</div>
    <h2 class="section-title">${regionName} 개강 일정</h2>
    <div class="table-scroll">
      <table class="sched-table">
        <thead><tr><th>과정</th><th>기수</th><th>개강</th><th>종강</th><th>요일</th><th>기간</th><th>수강료</th><th></th></tr></thead>
        <tbody>
${tableRows}
        </tbody>
      </table>
    </div>
    <div class="note-box">※ 정확한 잔여 좌석 및 최신 일정은 전화(010-5551-6230) 또는 상담 신청으로 확인해 주세요.</div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="wrap">
    <div class="eyebrow">왜 데일카네기인가</div>
    <h2 class="section-title">${regionName} 경영자들이 데일카네기를 선택하는 이유</h2>
    <div class="why-grid">
      <div class="why-card"><h3>신뢰를 얻는 인간관계</h3><p>고객·동료·구성원과의 관계에서 신뢰를 얻는 대화와 태도의 원칙을 익힙니다.</p></div>
      <div class="why-card"><h3>마음을 움직이는 소통</h3><p>설득이 아닌 공감으로 상대의 마음을 움직이는 커뮤니케이션을 훈련합니다.</p></div>
      <div class="why-card"><h3>조직을 이끄는 리더십</h3><p>자기확신과 스트레스 관리에서 출발해 실행형 리더십을 완성합니다.</p></div>
    </div>
    <p class="section-sub" style="margin-top:22px;">${alumniHtml}</p>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <div class="wrap">
    <div class="eyebrow">다른 지역도 확인하기</div>
    <div class="region-list">
${regionListHtml}
    </div>
  </div>
</section>

<section class="cta-strip">
  <div class="wrap">
    <h2>${regionName} 지역, 지금 상담을 신청하세요</h2>
    <a href="tel:010-5551-6230" class="btn">010-5551-6230 전화 상담</a>
  </div>
</section>

<footer>
  <div class="wrap">데일카네기코리아는 바인그룹이 운영합니다. © 2026 데일카네기코리아. All rights reserved.</div>
</footer>

</body>
</html>
`;
}

REGION_ORDER.forEach(slug => {
  fs.writeFileSync(path.join(OUT_DIR, `${slug}.html`), page(slug), 'utf8');
});

console.log(`Generated ${REGION_ORDER.length} static region pages in region/`);
