import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AddEditMop, Landing, MopPreview } from "./Pages";
import { ListMops } from "./Components";
import { v4 as uuid } from "uuid";

export interface MopInterface {
  name: string;
  data:
    | {
        multipleChoices: { task: string; choices: string[] }[];
        singleChoices: { task: string; choices: string[] }[];
        texts: string[];
        yesNos: string[];
      }
    | any;
}
function App() {
  const initialMops: { [id: string]: MopInterface } | any = {};
  initialMops[uuid()] = {
    name: "prvi MOP",
    data: {
      texts: ["imate li loših iskustava", "imate li loših iskustava2"],
      yesNos: ["jeste li Vip?", "jesi ti šta ti je?"],
      multipleChoices: [
        {
          task: "koje takmičari su vam se svidjeli",
          choices: ["prvi", "drugi", "treći"],
        },
        {
          task: "koje takmičari va se nisu svidjeli",
          choices: ["četvrti", "peti", "šesti"],
        },
      ],
      singleChoices: [
        {
          task: "koje takmičar je pobjedio u prvoj rundi",
          choices: ["prvi", "drugi", "treći"],
        },
        {
          task: "koje takmičar je pobjedio u prvoj rundi",
          choices: ["četvrti", "peti", "šesti"],
        },
      ],
    },
  };
  initialMops[uuid()] = {
    name: "drugi MOP",
    data: {
      texts: ["imate li loših iskustava3", "imate li loših iskustava4"],
      yesNos: ["jeste li Vip?", "jeste li dugogodišnji član?"],
      multipleChoices: [
        {
          task: "koje takmičari su vam se svidjeli",
          choices: ["prvi", "drugi", "treći"],
        },
        {
          task: "koje takmičari va se nisu svidjeli",
          choices: ["četvrti", "peti", "šesti"],
        },
      ],
      singleChoices: [
        {
          task: "koje takmičar je pobjedio u prvoj rundi",
          choices: ["prvi", "drugi", "treći"],
        },
        {
          task: "koje takmičar je pobjedio u prvoj rundi",
          choices: ["četvrti", "peti", "šesti"],
        },
      ],
    },
  };

  const [mopList, setMopList] = useState<{ [id: string]: MopInterface }>(
    () => initialMops
  );

  const addMop = (newMop: MopInterface) => {
    // take old state
    let oldMopList = mopList || {};
    // modify  state
    let id = uuid();
    let newState = { ...oldMopList };
    newState[id] = newMop;
    // set new State
    setMopList(newState);
  };
  const editMop = (newMop: MopInterface, id: string) => {
    // take old state
    let oldMopList = mopList || {};
    // modify  state
    let newState = { ...oldMopList };
    newState[id] = newMop;
    // set new State
    setMopList(newState);
  };
  const deleteMop = (id: string) => {
    // take old state
    let oldMopList = mopList || {};
    // modify  state
    let newState = { ...oldMopList };
    delete newState[id];
    // set new State
    setMopList(newState);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={
            <Landing
              listMops={<ListMops deleteMop={deleteMop} mopList={mopList} />}
            />
          }
        />
        <Route
          path="/add"
          element={<AddEditMop mopList={mopList} addMop={addMop} />}
        />
        <Route
          path="/edit/:id"
          element={<AddEditMop mopList={mopList} editMop={editMop} />}
        />
        <Route path="/mop/:id" element={<MopPreview mopList={mopList} />} />
      </Routes>
    </div>
  );
}

export default App;
