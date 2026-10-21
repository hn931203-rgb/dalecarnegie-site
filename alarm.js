// 문의알림: 전화·카톡·상담신청 버튼 클릭을 텔레그램으로 알림 (inquiry-alarm Worker 경유)
(function () {
  var ENDPOINT = "https://inquiry-alarm.hn931203.workers.dev/";
  var last = 0;

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

    var path = location.pathname + location.hash;
    try { path = decodeURIComponent(path); } catch (err) {}
    var body = JSON.stringify({
      btn: btn,
      title: document.title,
      path: path,
      ref: document.referrer,
    });
    try {
      var blob = new Blob([body], { type: "text/plain" });
      if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, blob)) return;
    } catch (err) {}
    try {
      fetch(ENDPOINT, { method: "POST", body: body, keepalive: true, mode: "no-cors" });
    } catch (err) {}
  }, true);
})();
