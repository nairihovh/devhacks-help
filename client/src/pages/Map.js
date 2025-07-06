import { useEffect, useRef, useState } from "react";

const YANDEX_MAP_API_KEY = "57cb3aa2-8d02-4ed0-9b58-e6110859ab27";

const clinics = [
  { name: "💊 Դեղատուն 1", coords: [40.804385, 44.482646] },
  { name: "🏥 Կլինիկա 2", coords: [40.812115, 44.490321] },
  { name: "🩺 Առողջության Կենտրոն", coords: [40.798851, 44.492807] },
  { name: "🩺 Նոր մեդ", coords: [40.808628, 44.486626] },
  { name: "🩺 Վարդանանց բժշկական կենտրոն", coords: [40.810000, 44.493656] },
  { name: "🩺 Վարդանանց բժշկական կենտրոն", coords: [40.804528, 44.489485] },
  { name: "⚰️ Մորգ", coords: [40.807200, 44.475000] },
];

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mapInitializedRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);
  const [direction, setDirection] = useState(0);

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
          const map = new window.ymaps.Map(mapContainerRef.current, {
            center: [40.811432, 44.485283],
            zoom: 13,
            controls: [],
          });

          clinics.forEach((clinic) => {
            const placemark = new window.ymaps.Placemark(
              clinic.coords,
              { balloonContent: `${clinic.name}` },
              {
                iconLayout: 'default#image',
                iconImageHref: '/images/logo-mark.png',
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40],
              }
            );
            map.geoObjects.add(placemark);
          });
          mapInstanceRef.current = map;
          setMapReady(true);
        });
      }
    };

    const existingScript = document.querySelector(`script[src*="api-maps.yandex.ru"]`);

    if (!mapInitializedRef.current && window.ymaps && mapContainerRef.current) {
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
        mapInitializedRef.current = false;
      }
    };
  }, []);

  // Compass Logic
  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null) {
        setDirection(Math.round(event.alpha));
      }
    };

    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const flyToClinic = (coords) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(coords, 20, { duration: 300 });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>

      {/* Compass Block that scrolls with page */}
      <div className="w-full max-w-[700px] mx-auto flex items-center justify-between bg-black/50 p-4 rounded-xl shadow-lg mb-6">
        
        {/* Compass Left Side */}
        <div
          className="w-12 h-12 rounded-full border-4 border-yellow-300 flex items-center justify-center bg-black/70 text-white text-xl"
          style={{ transform: `rotate(${direction}deg)` }}
        >
          🧭
        </div>
        
        {/* Degrees Right Side */}
        <div className="text-white text-lg font-bold">
          {direction}°
        </div>
      </div>

      {/* Map */}
      <div className="w-full max-w-[700px] h-[400px] rounded-3xl shadow-2xl overflow-hidden border-[3px] border-white/20 mb-6">
        <div ref={mapContainerRef} className="w-full h-[500px]" />
      </div>

      {/* Clinics */}
      <div className="w-full max-w-[700px] space-y-4">
        {clinics.map((clinic, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-between shadow-md"
          >
            <div>
              <h3 className="text-lg font-semibold">{clinic.name}</h3>
              <p className="text-sm opacity-80">{clinic.address}</p>
            </div>
            <button
              onClick={() => {
                flyToClinic(clinic.coords);
                scrollToTop();
              }}
              className="bg-yellow-300 text-[#5C1F0C] font-bold px-4 py-2 rounded-xl hover:bg-yellow-400 transition"
              disabled={!mapReady}
            >
              Տեսնել
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Map;

