import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddEditMop, Landing, MopPreview } from "./Pages";
import { ListMops } from "./Components";
import { v4 as uuid } from "uuid";

export interface MopInterface {
  id: string;
  name: string;
  data: {
    multipleChoises: { task: string; choises: string[] }[];
    singleChoises: { task: string; choises: string[] }[];
    texts: string[];
    yesNos: string[];
  };
}
function App() {
  const initialMops: MopInterface[] = [
    {
      id: uuid(),
      name: "prvi MOP",
      data: {
        texts: ["imate li loših iskustava", "imate li loših iskustava2"],
        yesNos: ["jeste li Vip?", "jesi ti šta ti je?"],
        multipleChoises: [
          {
            task: "koje takmičari su vam se svidjeli",
            choises: ["prvi", "drugi", "treći"],
          },
          {
            task: "koje takmičari va se nisu svidjeli",
            choises: ["četvrti", "peti", "šesti"],
          },
        ],
        singleChoises: [
          {
            task: "koje takmičar je pobjedio u prvoj rundi",
            choises: ["prvi", "drugi", "treći"],
          },
          {
            task: "koje takmičar je pobjedio u prvoj rundi",
            choises: ["četvrti", "peti", "šesti"],
          },
        ],
      },
    },
    {
      id: uuid(),
      name: "drugi MOP",
      data: {
        texts: ["imate li loših iskustava3", "imate li loših iskustava4"],
        yesNos: ["jeste li Vip?", "jeste li dugogodišnji član?"],
        multipleChoises: [
          {
            task: "koje takmičari su vam se svidjeli",
            choises: ["prvi", "drugi", "treći"],
          },
          {
            task: "koje takmičari va se nisu svidjeli",
            choises: ["četvrti", "peti", "šesti"],
          },
        ],
        singleChoises: [
          {
            task: "koje takmičar je pobjedio u prvoj rundi",
            choises: ["prvi", "drugi", "treći"],
          },
          {
            task: "koje takmičar je pobjedio u prvoj rundi",
            choises: ["četvrti", "peti", "šesti"],
          },
        ],
      },
    },
  ];
  let savedState = window.localStorage.getItem("mopList");
  const [mopList, setMopList] = useState<MopInterface[]>(() => {
    savedState && console.log(JSON.parse(savedState)[0] == null);
    if (savedState && JSON.parse(savedState).length !== 0) {
      if (JSON.parse(savedState)[0] == null) return initialMops;
      return JSON.parse(savedState);
    } else {
      return initialMops;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("mopList", JSON.stringify(mopList));
  }, [mopList]);

  const addMop = (newMop: MopInterface) => {
    setMopList((oldMopList) => {
      if (oldMopList.length === 0) return [newMop];
      else return [...oldMopList, newMop];
    });
  };
  const editMop = (newMop: MopInterface, id: string) => {
    setMopList((oldMopList) => {
      let newMopList = oldMopList.map((obj: MopInterface) => {
        if (obj.id === id) return newMop;
        else return obj;
      });
      if (oldMopList.length === 0) return [newMop];
      else return [...newMopList];
    });
  };
  const deleteMop = (id: string) => {
    setMopList((oldMopList) => {
      let newMopList = oldMopList.filter((obj) => {
        return obj.id !== id;
      });
      return [...newMopList];
    });
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
        <Route path="/add" element={<AddEditMop addMop={addMop} />} />
        <Route path="/edit/:id" element={<AddEditMop editMop={editMop} />} />
        <Route path="/mop/:id" element={<MopPreview />} />
      </Routes>
    </div>
  );
}

export default App;
