import React, { useEffect } from "react";
import ansim_daegu from "./ansim_daegu.json";

const { kakao } = window;
const MapContainer = () => {
  useEffect(() => {
    const ansim = ansim_daegu;
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.8707298223024, 128.626546626841),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();

    let alt = 0;
    let lng = 0;
    //밖으로 뺄생각하지말고 안으로도 넣어보자
    ansim.map((place) => {
      geocoder.addressSearch(place.RELAX_ADD1, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          while (result) {
            alt = result[0].y;
            lng = result[0].x;
            const marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(alt, lng),
            });
            kakao.maps.event.addListener(marker, "click", () => {
              console.log(place);
            });
            break;
          }
        }
      });
    });
  }, []);

  //눌렀을 때 정보들을 모아보기
  //
  return (
    <div
      id="map"
      style={{
        width: "1000px",
        height: "600px",
      }}
    ></div>
  );
};

export default MapContainer;
