import React, { useEffect, useRef } from "react";

export default function TradingViewChart({ pair = "EUR/USD" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const scriptId = "tradingview-widget-script";

    function createWidget() {
      if (!window.TradingView || !containerRef.current) return;

      containerRef.current.innerHTML = "";

      new window.TradingView.widget({
        autosize: true,
        symbol: "FX:" + pair.replace("/", ""),
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: false,
        withdateranges: true,
        hide_side_toolbar: false,
        details: false,
        hotlist: false,
        calendar: false,
        studies: ["RSI@tv-basicstudies", "MACD@tv-basicstudies"],
        container_id: containerRef.current.id,
      });
    }

    if (!containerRef.current.id) {
      containerRef.current.id = `tradingview_${pair.replace("/", "")}_${Date.now()}`;
    }

    if (window.TradingView) {
      createWidget();
      return;
    }

    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = createWidget;
      document.body.appendChild(script);
    } else {
      script.onload = createWidget;
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [pair]);

  return (
    <div
      style={{
        width: "100%",
        height: "650px",
        background: "#ffffff",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}