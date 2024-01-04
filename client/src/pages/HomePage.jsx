import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export function HomePage() {
  const [searchTrip, setSearchTrip] = useState("");
  const [content, setContent] = useState([]);
  const searchFromServer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchTrip}`
      );
      console.log(response);
      setContent(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchFromServer();
  }, [searchTrip]);

  return (
    <div>
      <h1 className="HomePage">เที่ยวไหนดี</h1>
      <h4 className="title">ค้นหาที่เที่ยว</h4>
      <input
        className="input"
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน ..."
        onChange={(event) => setSearchTrip(event.target.value)}
        value={searchTrip}
      />

      <div className="content-list">
        {content.map((trip, index) => {
          return (
            <div className="content-box" key={index}>
              <div className="content-preview">
                <img
                  src={trip.photos[0]}
                  alt={trip.title}
                  width="360"
                  height="240"
                />
              </div>
              <div className="content-detail">
                <h1 className="content-title">{trip.title}</h1>
                <div className="content-description">
                  {trip.description}
                  <a href={trip.url}>อ่านต่อ</a>
                </div>
                <div className="content-tag">
                  หมวด
                  <div className="other-previews">
                    <img src={trip.photos[1]} />
                    <img src={trip.photos[2]} />
                    <img src={trip.photos[3]} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
