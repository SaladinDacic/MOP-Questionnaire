import "./ListMops.scss";
import { MopInterface } from "../../App";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

type multipleChoiceType = { task: string; choices: string[] };
type singleChoiceType = { task: string; choices: string[] };
interface ListMopsProps {
  deleteMop: (id: string) => void;
  mopList: { [id: string]: MopInterface };
}
export const ListMops = ({ mopList, deleteMop }: ListMopsProps) => {
  const mopListIds = Object.keys(mopList);
  return (
    <div className="ListMops">
      {Object.values(mopList).map((obj: MopInterface, i: number) => {
        return (
          <div key={uuid()}>
            <Link
              to={`/mop/${mopListIds[i]}`}
              key={uuid()}
              className="ListMops__mop"
            >
              <h1>{obj.name}</h1>
              {obj.data.hasOwnProperty("texts") &&
                obj.data.texts.map((str: string, i: number) => {
                  return (
                    <div key={uuid()}>
                      <p>{str}</p>
                      <textarea cols={8} rows={2}></textarea>
                    </div>
                  );
                })}
              <p>.</p>
              {obj.data.hasOwnProperty("yesNos") &&
                obj.data.yesNos.map((str: string, i: number) => {
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
              <p>.</p>
              {obj.data.hasOwnProperty("multipleChoices") &&
                obj.data.multipleChoices.map(
                  (obj: multipleChoiceType, i: number) => {
                    return (
                      <div key={uuid()}>
                        <p>{obj.task}</p>
                        <div>
                          {obj.choices.map((str, i) => {
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
              <p>.</p>
              {obj.data.hasOwnProperty("singleChoices") &&
                obj.data.singleChoices.map(
                  (obj: singleChoiceType, i: number) => {
                    return (
                      <div key={uuid()}>
                        <p>{obj.task}</p>
                        <div>
                          {obj.choices.map((str, i) => {
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
            </Link>
            <div className="ListMops__buttons">
              <Link to={`/edit/${mopListIds[i]}`}>Edit this Mop</Link>
              <button
                onClick={() => {
                  deleteMop(mopListIds[i]);
                }}
              >
                Delete this Mop
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
