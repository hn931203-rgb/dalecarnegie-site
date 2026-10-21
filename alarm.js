// 문의알림: 전화·카톡·상담신청 버튼 클릭을 텔레그램으로 알림 (inquiry-alarm Worker 경유)
(function () {
  var ENDPOINT = "https://inquiry-alarm.hn931203.workers.dev/";
  var KEY = "inquiry-alarm-landing";
  var last = 0;

  function here() {
    var p = location.pathname + location.hash;
    try { p = decodeURIComponent(p); } catch (err) {}
    return p;
  }

  // 첫 도착 정보(광고 검색어·유입경로)를 방문 동안 기억해둔다
  var landing = null;
  try { landing = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch (err) {}
  var q = new URLSearchParams(location.search);
  var kw = q.get("n_query") || q.get("n_keyword") || q.get("utm_term") || q.get("keyword") || "";
  var arrived = !landing || kw;
  if (arrived) {
    landing = {
      kw: kw,
      ad: q.get("n_media") || q.get("n_ad") ? "네이버광고" : q.get("gclid") ? "구글광고" : q.get("utm_source") || "",
      page: here(),
      ref: document.referrer,
    };
    try { sessionStorage.setItem(KEY, JSON.stringify(landing)); } catch (err) {}
  }

  function send(btn) {
    var body = JSON.stringify({
      btn: btn,
      title: document.title,
      path: here(),
      ref: landing.ref,
      kw: landing.kw,
      ad: landing.ad,
      landing: landing.page,
    });
    try {
      var blob = new Blob([body], { type: "text/plain" });
      if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, blob)) return;
    } catch (err) {}
    try {
      fetch(ENDPOINT, { method: "POST", body: body, keepalive: true, mode: "no-cors" });
    } catch (err) {}
  }

  // 새 손님이 들어오면 방문 알림 (같은 방문 중 페이지 이동은 제외)
  if (arrived && !navigator.webdriver) send("visit");

  function kind(href) {
    if (/^tel:/i.test(href)) return "tel";
    if (/^sms:/i.test(href)) return "sms";
    if (/(pf|open)\.kakao\.com|talk\.kakao/i.test(href)) return "kakao";
    if (/docs\.google\.com\/forms|forms\.gle/i.test(href)) return "form";
    return null;
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var btn = kind(a.getAttribute("href"));
    if (!btn) return;
    var now = Date.now();
    if (now - last < 3000) return; // 연속 클릭은 한 번만
    last = now;
    send(btn);
  }, true);
})();
