// const forceUpdate = React.useCallback(() => updateState({}), []);
// const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
// const [, updateState] = React.useState<{}>();
import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MopInterface } from "../../App";

import "./AddEditMop.scss";
import { useNavigate } from "react-router-dom";
import {
  MultipleChoiceRubric,
  SingleChoiceRubric,
  TextRubric,
  YesNoRubric,
} from "../../Components";
import React from "react";
interface AddEditMopProps {
  addMop?: (newMop: MopInterface) => void;
  editMop?: (newMop: MopInterface, id: string) => void;
  mopList: { [id: string]: MopInterface };
}
type multipleChoiceType = { task: string; choices: string[] };
type singleChoiceType = { task: string; choices: string[] };

export const AddEditMop = React.memo(
  ({ addMop, editMop, mopList }: AddEditMopProps) => {
    const initialMop: MopInterface = {
      name: "Change me",
      data: {},
    };
    const redirect = useNavigate();
    const { id } = useParams();
    const typedId = id as string;
    const [mopData, setMopData] = useState<MopInterface>(
      mopList[typedId] || initialMop
    );
    const [selectedRubric, setSelectedRubric] = useState("Texts");

    //Handle rubric changes
    const handleOnChangeRubrics = (
      evt: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSelectedRubric(evt.target.value);
    };
    const handleAddRubric = (evt: React.MouseEvent<HTMLButtonElement>) => {
      eval(`addNew${selectedRubric}Rubric`)(evt);
    };
    //Add rubrics
    const addNewTextsRubric = (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      //1. copy old state
      let oldStateData = mopData.data;
      //2. Edit it
      let newStateData = { ...oldStateData };
      if (newStateData.texts) {
        newStateData.texts.push("");
      } else {
        newStateData.texts = [""];
      }
      let newState = { ...mopData, data: newStateData };
      //3. set New State
      setMopData({ ...newState });
    };
    const addNewYesNosRubric = (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      //1. copy old state
      let oldStateData = mopData.data;
      //2. Edit it
      let newStateData = { ...oldStateData };
      if (newStateData.yesNos) {
        newStateData.yesNos.push("");
      } else {
        newStateData.yesNos = [""];
      }
      let newState = { ...mopData, data: newStateData };
      //3. set New State
      setMopData({ ...newState });
    };
    const addNewMultipleChoicesRubric = (
      evt: React.MouseEvent<HTMLButtonElement>
    ) => {
      evt.preventDefault();
      //1. copy old state
      let oldStateData = mopData.data;
      //2. Edit it
      let newStateData = { ...oldStateData };
      if (newStateData.multipleChoices) {
        newStateData.multipleChoices.push({ task: "", choices: ["", ""] });
      } else {
        newStateData.multipleChoices = [{ task: "", choices: ["", ""] }];
      }
      let newState = { ...mopData, data: newStateData };
      //3. set New State
      setMopData({ ...newState });
    };
    const addNewSingleChoicesRubric = (
      evt: React.MouseEvent<HTMLButtonElement>
    ) => {
      evt.preventDefault();
      //1. copy old state
      let oldStateData = mopData.data;
      //2. Edit it
      let newStateData = { ...oldStateData };
      if (newStateData.singleChoices) {
        newStateData.singleChoices.push({ task: "", choices: ["", ""] });
      } else {
        newStateData.singleChoices = [{ task: "", choices: ["", ""] }];
      }
      let newState = { ...mopData, data: newStateData };
      //3. set New State
      setMopData({ ...newState });
    };
    //Remove rubrics
    const removeTextsRubric = (
      evt: React.MouseEvent<HTMLButtonElement>,
      idx: number
    ) => {
      evt.preventDefault();
      //1. copy old state
      let oldStateDataTexts = mopData.data.texts;
      //2. Edit it
      let newStateDataTexts = [
        ...oldStateDataTexts.slice(0, idx),
        ...oldStateDataTexts.slice(idx + 1, oldStateDataTexts.length),
      ];
      console.log(newStateDataTexts);
      let newState = {
        ...mopData,
        data: { ...mopData.data, texts: newStateDataTexts },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const removeYesNosRubric = (
      evt: React.MouseEvent<HTMLButtonElement>,
      idx: number
    ) => {
      evt.preventDefault();
      //1. copy old state
      let oldStateDataYesNos = mopData.data.yesNos;
      //2. Edit it
      let newStateDataYesNos = [
        ...oldStateDataYesNos.slice(0, idx),
        ...oldStateDataYesNos.slice(idx + 1, oldStateDataYesNos.length),
      ];
      let newState = {
        ...mopData,
        data: { ...mopData.data, yesNos: newStateDataYesNos },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const removeMultipleChoicesRubric = (
      evt: React.MouseEvent<HTMLButtonElement>,
      idx: number
    ) => {
      evt.preventDefault();
      //1. copy old state
      let oldStateDataMultipleChoices = mopData.data.multipleChoices;
      //2. Edit it
      let newStateDataMultipleChoices = [
        ...oldStateDataMultipleChoices.slice(0, idx),
        ...oldStateDataMultipleChoices.slice(
          idx + 1,
          oldStateDataMultipleChoices.length
        ),
      ];
      let newState = {
        ...mopData,
        data: { ...mopData.data, multipleChoices: newStateDataMultipleChoices },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const removeSingleChoicesRubric = (
      evt: React.MouseEvent<HTMLButtonElement>,
      idx: number
    ) => {
      evt.preventDefault();
      //1. copy old state
      let oldStateDataSingleChoices = mopData.data.singleChoices;
      //2. Edit it
      let newStateDataSingleChoices = [
        ...oldStateDataSingleChoices.slice(0, idx),
        ...oldStateDataSingleChoices.slice(
          idx + 1,
          oldStateDataSingleChoices.length
        ),
      ];
      let newState = {
        ...mopData,
        data: { ...mopData.data, singleChoices: newStateDataSingleChoices },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    //Changes
    const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      // setMopData((oldMopData) => {
      //   let typedMopData = oldMopData as MopInterface;
      //   if (oldMopData && typedMopData) {
      //     return {
      //       ...oldMopData,
      //       name: evt.target.value,
      //     };
      //   }
      // });
    };
    const handleTextsChange = (
      evt: React.ChangeEvent<HTMLInputElement>,
      idx: number
    ) => {
      //1. copy old state
      let oldStateDataTexts = mopData.data.texts;
      //2. Edit it
      let newStateDataTexts = oldStateDataTexts;
      newStateDataTexts[idx] = evt.target.value;
      let newState = {
        ...mopData,
        data: { ...mopData.data, texts: newStateDataTexts },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const handleYesNosChange = (
      evt: React.ChangeEvent<HTMLInputElement>,
      idx: number
    ) => {
      //1. copy old state
      let oldStateDataYesNos = mopData.data.yesNos;
      //2. Edit it
      let newStateDataYesNos = oldStateDataYesNos;
      newStateDataYesNos[idx] = evt.target.value;
      let newState = {
        ...mopData,
        data: { ...mopData.data, yesNos: newStateDataYesNos },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const handleMultipleChoicesChange = (
      evt: React.ChangeEvent<HTMLInputElement>,
      idx: number
    ) => {
      //1. copy old state
      let oldStateDataMultipleChoices = mopData.data.multipleChoices;
      //2. Edit it
      let newStateDataMultipleChoices = oldStateDataMultipleChoices;
      newStateDataMultipleChoices[idx].task = evt.target.value;
      let newState = {
        ...mopData,
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const handleSingleChoicesChange = (
      evt: React.ChangeEvent<HTMLInputElement>,
      idx: number
    ) => {
      //1. copy old state
      let oldStateDataSingleChoices = mopData.data.singleChoices;
      //2. Edit it
      let newStateDataSingleChoices = oldStateDataSingleChoices;
      newStateDataSingleChoices[idx].task = evt.target.value;
      let newState = {
        ...mopData,
      };
      //3. set New State
      setMopData({ ...newState });
    };
    //sub category changes
    const addMultipleChoicesChoice = (idx: number) => {
      //1. copy old state
      let oldStateDataMultipleChoices = mopData.data.multipleChoices;
      //2. Edit it
      let newStateDataMultipleChoices = oldStateDataMultipleChoices;
      newStateDataMultipleChoices[idx].choices.push("");
      let newState = {
        ...mopData,
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const addSingleChoicesChoice = (idx: number) => {
      //1. copy old state
      let oldStateDataSingleChoices = mopData.data.singleChoices;
      //2. Edit it
      let newStateDataSingleChoices = oldStateDataSingleChoices;
      newStateDataSingleChoices[idx].choices.push("");
      let newState = {
        ...mopData,
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const handleMultipleChoiceChange = (
      evt: React.ChangeEvent<HTMLInputElement>,
      rubricIdx: number,
      choiceIdx: number
    ) => {
      //1. copy old state
      let oldStateDataMultipleChoices = mopData.data.multipleChoices;
      //2. Edit it
      let newStateDataMultipleChoices = oldStateDataMultipleChoices;
      newStateDataMultipleChoices[rubricIdx].choices[choiceIdx] =
        evt.target.value;
      let newState = {
        ...mopData,
        data: { ...mopData.data, multipleChoices: newStateDataMultipleChoices },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const handleSingleChoiceChange = (
      evt: React.ChangeEvent<HTMLInputElement>,
      rubricIdx: number,
      choiceIdx: number
    ) => {
      //1. copy old state
      let oldStateDataSingleChoices = mopData.data.singleChoices;
      //2. Edit it
      let newStateDataSingleChoices = oldStateDataSingleChoices;
      newStateDataSingleChoices[rubricIdx].choices[choiceIdx] =
        evt.target.value;
      let newState = {
        ...mopData,
        data: { ...mopData.data, singleChoices: newStateDataSingleChoices },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const deleteMultipleChoiceChange = (
      rubricIdx: number,
      choiceIdx: number
    ) => {
      //1. copy old state
      let oldStateDataMultipleChoices = mopData.data.multipleChoices;
      //2. Edit it
      let newStateDataMultipleChoices = oldStateDataMultipleChoices;
      newStateDataMultipleChoices[rubricIdx].choices = [
        ...newStateDataMultipleChoices[rubricIdx].choices.slice(0, choiceIdx),
        ...newStateDataMultipleChoices[rubricIdx].choices.slice(
          choiceIdx + 1,
          newStateDataMultipleChoices[rubricIdx].choices.length
        ),
      ];
      let newState = {
        ...mopData,
        // data: { ...mopData.data, multipleChoices: newStateDataMultipleChoices },
      };
      //3. set New State
      setMopData({ ...newState });
    };
    const deleteSingleChoiceChange = (rubricIdx: number, choiceIdx: number) => {
      //1. copy old state
      let oldStateDataSingleChoices = mopData.data.singleChoices;
      //2. Edit it
      let newStateDataSingleChoices = oldStateDataSingleChoices;
      newStateDataSingleChoices[rubricIdx].choices = [
        ...newStateDataSingleChoices[rubricIdx].choices.slice(0, choiceIdx),
        ...newStateDataSingleChoices[rubricIdx].choices.slice(
          choiceIdx + 1,
          newStateDataSingleChoices[rubricIdx].choices.length
        ),
      ];
      let newState = {
        ...mopData,
        // data: { ...mopData.data, singleChoices: newStateDataSingleChoices },
      };
      //3. set New State
      setMopData({ ...newState });
    };

    const iterateData = mopData.data;
    return (
      <>
        <form className="AddEditMop">
          <h3>Insert Name</h3>
          <h3>
            <input
              onChange={handleNameChange}
              type="text"
              defaultValue={"change"}
            />
          </h3>

          <div key={0} className="EditMop__mop">
            {iterateData.hasOwnProperty("texts") ? (
              <div key={1}>
                <h3>Text rubrics</h3>
                {iterateData.texts.map((str: string, i: number) => {
                  return (
                    <div key={i}>
                      <TextRubric
                        handleInputText={handleTextsChange}
                        i={i}
                        str={str}
                      />
                      <button
                        onClick={(evt) => {
                          removeTextsRubric(evt, i);
                        }}
                      >
                        Remove this one
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <hr />

            {iterateData.hasOwnProperty("yesNos") ? (
              <div key={2}>
                <h3>YesNo rubrics</h3>
                {iterateData.yesNos.map((str: string, i: number) => {
                  return (
                    <div key={i}>
                      <YesNoRubric
                        handleYesNosChange={handleYesNosChange}
                        i={i}
                        str={str}
                      />
                      <button
                        onClick={(evt) => {
                          removeYesNosRubric(evt, i);
                        }}
                      >
                        Remove this one
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <hr />

            {iterateData.hasOwnProperty("multipleChoices") ? (
              <div key={3}>
                <h3>Multiple Choice Rubrics</h3>
                {iterateData.multipleChoices.map(
                  (mopData: multipleChoiceType, i: number) => {
                    return (
                      <div key={i}>
                        <MultipleChoiceRubric
                          handleMainInput={handleMultipleChoicesChange}
                          handleSecondaryInput={handleMultipleChoiceChange}
                          multipleChoiseData={mopData}
                          handleAddButton={addMultipleChoicesChoice}
                          handleDeleteButton={deleteMultipleChoiceChange}
                          rubricIdx={i}
                        />
                        <button
                          onClick={(evt) => {
                            removeMultipleChoicesRubric(evt, i);
                          }}
                        >
                          Remove this one
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            <hr />
            {iterateData.hasOwnProperty("singleChoices") ? (
              <div key={4}>
                <h3>Single Choice Rubrics</h3>
                {iterateData.singleChoices.map(
                  (mopData: singleChoiceType, i: number) => {
                    return (
                      <div key={i}>
                        {id ? (
                          <SingleChoiceRubric
                            handleMainInput={handleSingleChoicesChange}
                            handleSecondaryInput={handleSingleChoiceChange}
                            singleChoiseData={mopData}
                            handleAddButton={addSingleChoicesChoice}
                            handleDeleteButton={deleteSingleChoiceChange}
                            rubricIdx={i}
                          />
                        ) : (
                          <SingleChoiceRubric
                            handleMainInput={handleSingleChoicesChange}
                            handleSecondaryInput={handleSingleChoiceChange}
                            singleChoiseData={mopData}
                            handleAddButton={addSingleChoicesChoice}
                            handleDeleteButton={deleteSingleChoiceChange}
                            rubricIdx={i}
                          />
                        )}
                        <button
                          onClick={(evt) => {
                            removeSingleChoicesRubric(evt, i);
                          }}
                        >
                          Remove this one
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            ) : null}

            <select onChange={handleOnChangeRubrics} value={selectedRubric}>
              <option value={"Texts"}>Add One Text Rubric</option>
              <option value={"YesNos"}>Add One Yes or No Rubric</option>
              <option value={"MultipleChoices"}>
                Add One Multiple Choice Rubric
              </option>
              <option value={"SingleChoices"}>
                Add One Single Choice Rubric
              </option>
            </select>
            <button onClick={handleAddRubric} className="AddEditMop__btn">
              Add {selectedRubric} Rubric
            </button>
          </div>

          <button
            onClick={() => {
              mopData && addMop && addMop(mopData);
              let typedId = id as string;
              mopData && editMop && editMop(mopData, typedId);
              redirect("/");
            }}
            className="AddEditMop__btn"
          >
            Save This Questionnaire
          </button>
        </form>
      </>
    );
  }
);
