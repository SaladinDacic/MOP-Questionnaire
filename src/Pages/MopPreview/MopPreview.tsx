import { useState } from "react";
import { useParams } from "react-router-dom";
import { MopInterface } from "../../App";
import { v4 as uuid } from "uuid";
// import { useNavigate } from "react-router-dom";
import "./MopPreview.scss";

type multipleChoiceType = { task: string; choices: string[] };
type singleChoiceType = { task: string; choices: string[] };
export const MopPreview = ({
  mopList,
}: {
  mopList: { [id: string]: MopInterface };
}) => {
  const { id } = useParams();
  // const redirect = useNavigate();
  let typedId = id as string;
  const [mopData] = useState<MopInterface>(mopList[typedId]);

  return (
    <>
      {mopData && (
        <div key={uuid()} className="MopPreview">
          <h1>{mopData.name}</h1>
          <div className="MopPreview__containers">
            {mopData.data.texts.map((str: string, i: number) => {
              return (
                <div key={uuid()}>
                  <p>{str}</p>
                  <textarea cols={50} rows={5}></textarea>
                </div>
              );
            })}
          </div>
          <div className="MopPreview__containers">
            {mopData.data.yesNos.map((str: string, i: number) => {
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
            {mopData.data.multipleChoices.map(
              (mopData: multipleChoiceType, i: number) => {
                return (
                  <div key={uuid()}>
                    <p>{mopData.task}</p>
                    <div>
                      {mopData.choices.map((str, i) => {
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
              }
            )}
          </div>
          <div className="MopPreview__containers">
            {mopData.data.singleChoices.map(
              (mopData: singleChoiceType, i: number) => {
                return (
                  <div key={uuid()}>
                    <p>{mopData.task}</p>
                    <div>
                      {mopData.choices.map((str: string, i: number) => {
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
              }
            )}
          </div>
        </div>
      )}
    </>
  );
};
