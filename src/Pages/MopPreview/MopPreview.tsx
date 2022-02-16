import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MopInterface } from "../../App";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import "./MopPreview.scss";
export const MopPreview = () => {
  const { id } = useParams();
  const redirect = useNavigate();
  const [mopData, setMopData] = useState<MopInterface>();

  useEffect(() => {
    if (id !== undefined) {
      console.log(id);
      let savedDataString = window.localStorage.getItem("mopList");
      if (savedDataString) {
        let foundMop = JSON.parse(savedDataString).find(
          (mopData: MopInterface) => {
            return mopData["id"] === id;
          }
        );
        setMopData(foundMop);
      }
    }
  }, [id]);
  return (
    <>
      {mopData && (
        <div key={uuid()} className="MopPreview">
          <h1>{mopData.name}</h1>
          <div className="MopPreview__containers">
            {mopData.data.texts.map((str, i) => {
              return (
                <div key={uuid()}>
                  <p>{str}</p>
                  <textarea cols={50} rows={5}></textarea>
                </div>
              );
            })}
          </div>
          <div className="MopPreview__containers">
            {mopData.data.yesNos.map((str, i) => {
              return (
                <div key={uuid()}>
                  <p>{str}</p>
                  <div>
                    <label htmlFor="yes">yes</label>
                    <input type="radio" name="yes" />
                  </div>
                  <div>
                    <label htmlFor="no">no</label>
                    <input type="radio" name="no" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="MopPreview__containers">
            {mopData.data.multipleChoises.map((mopData, i) => {
              return (
                <div key={uuid()}>
                  <p>{mopData.task}</p>
                  <div>
                    {mopData.choises.map((str, i) => {
                      return (
                        <div key={uuid()}>
                          <label htmlFor={`$str`}>{str}</label>
                          <input type="checkbox" name={`$str`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="MopPreview__containers">
            {mopData.data.singleChoises.map((mopData, i) => {
              return (
                <div key={uuid()}>
                  <p>{mopData.task}</p>
                  <div>
                    {mopData.choises.map((str, i) => {
                      return (
                        <div key={uuid()}>
                          <label htmlFor={`$str`}>{str}</label>
                          <input type="radio" name={`$str`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
