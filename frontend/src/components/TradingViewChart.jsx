import React, { useEffect, useRef } from "react";

export default function TradingViewChart({ pair = "EUR/USD" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const symbolMap = {
      "EUR/USD": "FX:EURUSD",
      "USD/JPY": "FX:USDJPY",
      "GBP/USD": "FX:GBPUSD",
      "AUD/USD": "FX:AUDUSD",
      "USD/INR": "FX_IDC:USDINR",
    };

    const tvSymbol = symbolMap[pair] || "FX:EURUSD";

    if (!containerRef.current.id) {
      containerRef.current.id = `tradingview_${Date.now()}`;
    }

    const loadWidget = () => {
      if (!window.TradingView || !containerRef.current) return;

      containerRef.current.innerHTML = "";

      new window.TradingView.widget({
        autosize: true,
        symbol: tvSymbol,
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
    };

    if (window.TradingView) {
      loadWidget();
    } else {
      const existingScript = document.getElementById("tradingview-widget-script");

      if (existingScript) {
        existingScript.addEventListener("load", loadWidget);
      } else {
        const script = document.createElement("script");
        script.id = "tradingview-widget-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = loadWidget;
        document.body.appendChild(script);
      }
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
        height: "700px",
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