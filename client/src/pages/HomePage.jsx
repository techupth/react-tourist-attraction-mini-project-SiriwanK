import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export function HomePage() {
  const [searchTrip, setSearchTrip] = useState("");
  const [content, setContent] = useState([]);
  // const [tag, setTag] = useState([]);

  // const maxLength = 100;

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
      <hr width="80%" />

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
                  className="wnd-stretch rounded-corners"
                />
              </div>
              <div className="content-detail">
                <div className="content-title">{trip.title}</div>
                <div className="content-description">
                  {trip.description}
                  <br />
                  <a href={trip.url}> อ่านต่อ</a>
                </div>
                <div className="content-tag">
                  หมวด
                  {/* {item.tags.map((tag, i) => {
                    return (
                      <div key={i} className="in-tag">
                        {tag}
                      </div>
                    );
                  })} */}
                </div>

                <div className="other-previews">
                  <img
                    src={trip.photos[1]}
                    className="wnd-stretch rounded-corners2"
                    width="120"
                    height="120"
                  />
                  <img
                    src={trip.photos[2]}
                    className="wnd-stretch rounded-corners2"
                    width="120"
                    height="120"
                  />
                  <img
                    src={trip.photos[3]}
                    className="wnd-stretch rounded-corners2"
                    width="120"
                    height="120"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
