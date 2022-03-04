import React from "react";
import { useState } from "react";

type singleChoiceType = { task: string; choices: string[] };
interface SingleChoiceRubricProps {
  handleMainInput: (
    evt: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => void;
  handleSecondaryInput: (
    evt: React.ChangeEvent<HTMLInputElement>,
    rubricIdx: number,
    choiceIdx: number
  ) => void;
  handleAddButton: (i: number) => void;
  handleDeleteButton: (i: number, j: number) => void;
  rubricIdx: number;
  singleChoiseData: singleChoiceType;
}

export const SingleChoiceRubric = React.memo(
  ({
    handleMainInput,
    handleSecondaryInput,
    handleAddButton,
    handleDeleteButton,
    singleChoiseData,
    rubricIdx,
  }: SingleChoiceRubricProps) => {
    const [singleChoiceState] = useState(singleChoiseData);
    return (
      <div className="containers" key={rubricIdx}>
        <input
          placeholder="Please input question"
          required
          onChange={(evt) => {
            handleMainInput(evt, rubricIdx);
          }}
          type="text"
          value={singleChoiceState.task}
        />
        <div>
          {singleChoiceState.choices.map((str, j) => {
            return (
              <div key={j}>
                <input
                  placeholder="Please input choice"
                  required
                  onChange={(evt) => {
                    handleSecondaryInput(evt, rubricIdx, j);
                  }}
                  type="text"
                  value={str}
                />
                <button
                  onClick={(evt) => {
                    evt.preventDefault();
                    handleDeleteButton(rubricIdx, j);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
          <button
            onClick={(evt) => {
              evt.preventDefault();
              handleAddButton(rubricIdx);
            }}
          >
            Add Choice
          </button>
        </div>
      </div>
    );
  }
);
