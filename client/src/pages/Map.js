import { useEffect, useRef } from "react";

const YANDEX_MAP_API_KEY = "57cb3aa2-8d02-4ed0-9b58-e6110859ab27";

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mapInitializedRef = useRef(false);

  useEffect(() => {
    const initMap = () => {
      if (mapInitializedRef.current) return;

      if (window.ymaps && mapContainerRef.current) {
        mapInitializedRef.current = true;

        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }

        window.ymaps.ready(() => {
          mapInstanceRef.current = new window.ymaps.Map(mapContainerRef.current, {
            center: [40.811432, 44.485283],
            zoom: 13,
            controls: [],
          });

          // Example: Pharmacy marker
          const placemark = new window.ymaps.Placemark(
            [40.804385, 44.482646],
            {
              balloonContent: "💊 Դեղատուն",
            },
            {
              preset: "islands#redIcon",
            }
          );

          mapInstanceRef.current.geoObjects.add(placemark);
        });
      }
    };

    const existingScript = document.querySelector(`script[src*="api-maps.yandex.ru"]`);

    if (window.ymaps) {
      initMap();
    } else if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAP_API_KEY}&lang=ru_RU`;
      script.type = "text/javascript";
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      const onLoadHandler = () => {
        initMap();
        existingScript.removeEventListener("load", onLoadHandler);
      };
      existingScript.addEventListener("load", onLoadHandler);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      mapInitializedRef.current = false;
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Քարտեզ</h1>

      <div className="w-full max-w-[700px] h-[400px] rounded-3xl shadow-2xl overflow-hidden border-[3px] border-white/20">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </>
  );
};

export default Map;
