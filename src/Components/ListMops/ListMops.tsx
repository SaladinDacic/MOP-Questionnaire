import "./ListMops.scss";
import { MopInterface } from "../../App";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

interface ListMopsProps {
  deleteMop: (id: string) => void;
  mopList: MopInterface[];
}
export const ListMops = ({ mopList, deleteMop }: ListMopsProps) => {
  return (
    <div className="ListMops">
      {mopList.map((obj: MopInterface) => (
        <div>
          <Link to={`/mop/${obj.id}`} key={uuid()} className="ListMops__mop">
            <h1>{obj.name}</h1>
            {obj.data.texts.map((str, i) => {
              return (
                <div key={uuid()}>
                  <p>{str}</p>
                  <textarea cols={8} rows={2}></textarea>
                </div>
              );
            })}
            <p>.</p>
            {obj.data.yesNos.map((str, i) => {
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
            {obj.data.multipleChoises.map((obj, i) => {
              return (
                <div key={uuid()}>
                  <p>{obj.task}</p>
                  <div>
                    {obj.choises.map((str, i) => {
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
            <p>.</p>
            {obj.data.singleChoises.map((obj, i) => {
              return (
                <div key={uuid()}>
                  <p>{obj.task}</p>
                  <div>
                    {obj.choises.map((str, i) => {
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
          </Link>
          <div className="ListMops__buttons">
            <Link to={`/edit/${obj.id}`}>Edit this Mop</Link>
            <button
              onClick={() => {
                deleteMop(obj.id);
              }}
            >
              Delete this Mop
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
