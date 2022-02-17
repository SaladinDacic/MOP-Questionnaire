import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MopInterface } from "../../App";
import { v4 as uuid } from "uuid";
import "./AddEditMop.scss";
import { useNavigate } from "react-router-dom";
interface AddEditMopProps {
  addMop?: (newMop: MopInterface) => void;
  editMop?: (newMop: MopInterface, id: string) => void;
}
export const AddEditMop = ({ addMop, editMop }: AddEditMopProps) => {
  const initialMop: MopInterface = {
    id: uuid(),
    name: "Change me",
    data: {
      texts: [""],
      yesNos: [""],
      multipleChoises: [
        {
          task: "",
          choises: [""],
        },
      ],
      singleChoises: [
        {
          task: "",
          choises: [""],
        },
      ],
    },
  };
  const { id } = useParams();
  const redirect = useNavigate();
  const [mopData, setMopData] = useState<MopInterface>();

  useEffect(() => {
    if (id !== undefined) {
      let savedDataString = window.localStorage.getItem("mopList");
      if (savedDataString) {
        let foundMop = JSON.parse(savedDataString).find((obj: MopInterface) => {
          return obj["id"] === id;
        });
        setMopData(foundMop);
      }
    } else {
      setMopData(initialMop);
      console.log("došlo");
    }
  }, [id]);

  //Add rubrics
  const addNewTextsRubric = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            texts: [...typedMopData.data.texts, ""],
          },
        };
      }
    });
  };
  const removeTextsRubric = (
    evt: React.MouseEvent<HTMLButtonElement>,
    i: number
  ) => {
    evt.preventDefault();
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newTexts = typedMopData.data.texts.filter((str, idx) => {
        return idx !== i;
      });
      console.log(newTexts);
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            texts: [...newTexts],
          },
        };
      }
    });
  };
  const addNewYesNosRubric = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;

      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            yesNos: [...typedMopData.data.yesNos, ""],
          },
        };
      }
    });
  };
  const removeYesNosRubric = (
    evt: React.MouseEvent<HTMLButtonElement>,
    i: number
  ) => {
    evt.preventDefault();
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newYesNos = typedMopData.data.yesNos.filter((str, idx) => {
        return idx !== i;
      });
      console.log(newYesNos);
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            yesNos: [...newYesNos],
          },
        };
      }
    });
  };
  const addNewMultipleChoisesRubric = (
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;

      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            multipleChoises: [
              ...typedMopData.data.multipleChoises,
              { task: "", choises: [""] },
            ],
          },
        };
      }
    });
  };
  const removeMultipleChoisesRubric = (
    evt: React.MouseEvent<HTMLButtonElement>,
    i: number
  ) => {
    evt.preventDefault();
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newMultipleChoises = typedMopData.data.multipleChoises.filter(
        (obj, idx) => {
          return idx !== i;
        }
      );
      console.log(newMultipleChoises);
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            multipleChoises: [...newMultipleChoises],
          },
        };
      }
    });
  };
  const addNewSingleChoisesRubric = (
    evt: React.MouseEvent<HTMLButtonElement>
  ) => {
    evt.preventDefault();
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;

      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            singleChoises: [
              ...typedMopData.data.singleChoises,
              { task: "", choises: [""] },
            ],
          },
        };
      }
    });
  };
  const removeSingleChoisesRubric = (
    evt: React.MouseEvent<HTMLButtonElement>,
    i: number
  ) => {
    evt.preventDefault();
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newSingleChoises = typedMopData.data.singleChoises.filter(
        (obj, idx) => {
          return idx !== i;
        }
      );
      console.log(newSingleChoises);
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            singleChoises: [...newSingleChoises],
          },
        };
      }
    });
  };
  //Changes
  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          name: evt.target.value,
        };
      }
    });
  };
  const handleTextsChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newText = evt.target.value;
      var newTexts = typedMopData.data.texts;
      newTexts[i] = newText;
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: { ...typedMopData.data, texts: newTexts },
        };
      }
    });
  };
  const handleYesNosChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newYesNo = evt.target.value;
      var newYesNos = typedMopData.data.yesNos;
      newYesNos[i] = newYesNo;
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: { ...typedMopData.data, yesNos: newYesNos },
        };
      }
    });
  };
  const handleMultipleChoisesChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newMultipleChoiseText = evt.target.value;
      var newMultipleChoises = typedMopData.data.multipleChoises;
      newMultipleChoises[i].task = newMultipleChoiseText;
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            multipleChoises: newMultipleChoises,
          },
        };
      }
    });
  };
  const handleMultipleChoiseChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newChoiseText = evt.target.value;
      var newMultipleChoises = typedMopData.data.multipleChoises;
      newMultipleChoises[i].choises[j] = newChoiseText;
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            multipleChoises: newMultipleChoises,
          },
        };
      }
    });
  };
  const addMultipleChoisesChoise = (i: number) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      var newMultipleChoises = typedMopData.data.multipleChoises;
      newMultipleChoises[i].choises = [...newMultipleChoises[i].choises, ""];
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            multipleChoises: newMultipleChoises,
          },
        };
      }
    });
  };
  const handleSingleChoisesChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newSingleChoiseText = evt.target.value;
      var newSingleChoises = typedMopData.data.singleChoises;
      newSingleChoises[i].task = newSingleChoiseText;
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            singleChoises: newSingleChoises,
          },
        };
      }
    });
  };
  const handleSingleChoiseChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      let newChoiseText = evt.target.value;
      var newSingleChoises = typedMopData.data.singleChoises;
      newSingleChoises[i].choises[j] = newChoiseText;
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            singleChoises: newSingleChoises,
          },
        };
      }
    });
  };
  const addSingleChoisesChoise = (i: number) => {
    setMopData((oldMopData) => {
      let typedMopData = oldMopData as MopInterface;
      var newSingleChoises = typedMopData.data.singleChoises;
      newSingleChoises[i].choises = [...newSingleChoises[i].choises, ""];
      if (oldMopData && typedMopData) {
        return {
          ...oldMopData,
          data: {
            ...typedMopData.data,
            singleChoises: newSingleChoises,
          },
        };
      }
    });
  };

  return (
    <>
      {id ? (
        <div className="AddEditMop">
          <h3>
            <input
              onChange={handleNameChange}
              type="text"
              defaultValue={mopData && mopData.name}
            />
          </h3>
          {mopData && (
            <div key={mopData.id} className="EditMop__mop">
              <div>
                {mopData.data.texts.map((str, i) => {
                  return (
                    <div className="containers" key={i}>
                      <input
                        placeholder="Please input question"
                        required
                        onChange={(evt) => {
                          handleTextsChange(evt, i);
                        }}
                        type="text"
                        value={str}
                      />
                      <textarea cols={40} rows={4}></textarea>
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

                <button onClick={addNewTextsRubric} className="AddEditMop__btn">
                  Add One Text Rubric
                </button>
              </div>
              <hr />
              <div>
                {mopData.data.yesNos.map((str, i) => {
                  return (
                    <div className="containers" key={i}>
                      <input
                        placeholder="Please input question"
                        required
                        onChange={(evt) => {
                          handleYesNosChange(evt, i);
                        }}
                        type="text"
                        value={str}
                      />
                      <div>
                        <label htmlFor="yes">yes</label>
                        <input
                          placeholder="Please input question"
                          required
                          type="radio"
                          name="yes"
                        />
                      </div>
                      <div>
                        <label htmlFor="no">no</label>
                        <input
                          placeholder="Please input question"
                          required
                          type="radio"
                          name="no"
                        />
                      </div>
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
                <button
                  onClick={addNewYesNosRubric}
                  className="AddEditMop__btn"
                >
                  Add One Yes or No Rubric
                </button>
              </div>
              <hr />
              <div>
                {mopData.data.multipleChoises.map((mopData, i) => {
                  return (
                    <div className="containers" key={i}>
                      <input
                        placeholder="Please input question"
                        required
                        onChange={(evt) => {
                          handleMultipleChoisesChange(evt, i);
                        }}
                        type="text"
                        value={mopData.task}
                      />
                      <div>
                        {mopData.choises.map((str, j) => {
                          return (
                            <div key={j}>
                              <input
                                placeholder="Please input choise"
                                required
                                onChange={(evt) => {
                                  handleMultipleChoiseChange(evt, i, j);
                                }}
                                type="text"
                                value={str}
                              />
                              <input type="checkbox" name={`$str`} />
                            </div>
                          );
                        })}
                        <button
                          onClick={() => {
                            addMultipleChoisesChoise(i);
                          }}
                        >
                          Add Choise
                        </button>
                      </div>
                      <button
                        onClick={(evt) => {
                          removeMultipleChoisesRubric(evt, i);
                        }}
                      >
                        Remove this one
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={addNewMultipleChoisesRubric}
                  className="AddEditMop__btn"
                >
                  Add One Multiple Choise Rubric
                </button>
              </div>
              <hr />
              <div>
                {mopData.data.singleChoises.map((mopData, i) => {
                  return (
                    <div className="containers" key={i}>
                      <input
                        placeholder="Please input question"
                        required
                        onChange={(evt) => {
                          handleSingleChoisesChange(evt, i);
                        }}
                        type="text"
                        value={mopData.task}
                      />
                      <div>
                        {mopData.choises.map((str, j) => {
                          return (
                            <div key={j}>
                              <input
                                placeholder="Please input choise"
                                required
                                onChange={(evt) => {
                                  handleSingleChoiseChange(evt, i, j);
                                }}
                                type="text"
                                value={str}
                              />
                              <input type="radio" name={`$str`} />
                            </div>
                          );
                        })}
                        <button
                          onClick={() => {
                            addSingleChoisesChoise(i);
                          }}
                        >
                          Add Choise
                        </button>
                      </div>
                      <button
                        onClick={(evt) => {
                          removeSingleChoisesRubric(evt, i);
                        }}
                      >
                        Remove this one
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={addNewSingleChoisesRubric}
                  className="AddEditMop__btn"
                >
                  Add One Single Choise Rubric
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              mopData && editMop && editMop(mopData, id);
              redirect("/");
            }}
            className="AddEditMop__btn"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="AddEditMop">
          <h3>Insert Name</h3>
          <h3>
            <input
              onChange={handleNameChange}
              type="text"
              defaultValue={mopData && mopData.name}
            />
          </h3>
          {mopData && (
            <div key={mopData.id} className="EditMop__mop">
              <div>
                {mopData.data.texts.map((str, i) => {
                  return (
                    <div className="containers" key={i}>
                      <input
                        placeholder="Please input question"
                        required
                        onChange={(evt) => {
                          handleTextsChange(evt, i);
                        }}
                        type="text"
                        value={str}
                      />
                      <textarea cols={40} rows={4}></textarea>
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

                <button onClick={addNewTextsRubric} className="AddEditMop__btn">
                  Add One Text Rubric
                </button>
              </div>
              <hr />
              <div>
                {mopData.data.yesNos.map((str, i) => {
                  return (
                    <div className="containers" key={i}>
                      <input
                        placeholder="Please input question"
                        required
                        onChange={(evt) => {
                          handleYesNosChange(evt, i);
                        }}
                        type="text"
                        value={str}
                      />
                      <div>
                        <label htmlFor="yes">yes</label>
                        <input
                          placeholder="Please input question"
                          required
                          type="radio"
                          name="yes"
                        />
                      </div>
                      <div>
                        <label htmlFor="no">no</label>
                        <input
                          placeholder="Please input question"
                          required
                          type="radio"
                          name="no"
                        />
                      </div>
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
                <button
                  onClick={addNewYesNosRubric}
                  className="AddEditMop__btn"
                >
                  Add One Yes or No Rubric
                </button>
              </div>
              <hr />
              <div>
                {mopData.data.multipleChoises.map((mopData, i) => {
                  return (
                    <div className="containers" key={i}>
                      <input
                        placeholder="Please input question"
                        required
                        onChange={(evt) => {
                          handleMultipleChoisesChange(evt, i);
                        }}
                        type="text"
                        value={mopData.task}
                      />
                      <div>
                        {mopData.choises.map((str, j) => {
                          return (
                            <div key={j}>
                              <input
                                placeholder="Please input choise"
                                required
                                onChange={(evt) => {
                                  handleMultipleChoiseChange(evt, i, j);
                                }}
                                type="text"
                                value={str}
                              />
                              <input type="checkbox" name={`$str`} />
                            </div>
                          );
                        })}
                        <button
                          onClick={() => {
                            addMultipleChoisesChoise(i);
                          }}
                        >
                          Add Choise
                        </button>
                      </div>
                      <button
                        onClick={(evt) => {
                          removeMultipleChoisesRubric(evt, i);
                        }}
                      >
                        Remove this one
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={addNewMultipleChoisesRubric}
                  className="AddEditMop__btn"
                >
                  Add One Multiple Choise Rubric
                </button>
              </div>
              <hr />
              <div>
                {mopData.data.singleChoises.map((mopData, i) => {
                  return (
                    <div className="containers" key={i}>
                      <input
                        placeholder="Please input question"
                        required
                        onChange={(evt) => {
                          handleSingleChoisesChange(evt, i);
                        }}
                        type="text"
                        value={mopData.task}
                      />
                      <div>
                        {mopData.choises.map((str, j) => {
                          return (
                            <div key={j}>
                              <input
                                placeholder="Please input choise"
                                required
                                onChange={(evt) => {
                                  handleSingleChoiseChange(evt, i, j);
                                }}
                                type="text"
                                value={str}
                              />
                              <input type="radio" name={`$str`} />
                            </div>
                          );
                        })}
                        <button
                          onClick={() => {
                            addSingleChoisesChoise(i);
                          }}
                        >
                          Add Choise
                        </button>
                      </div>
                      <button
                        onClick={(evt) => {
                          removeSingleChoisesRubric(evt, i);
                        }}
                      >
                        Remove this one
                      </button>
                    </div>
                  );
                })}
                <button
                  onClick={addNewSingleChoisesRubric}
                  className="AddEditMop__btn"
                >
                  Add One Single Choise Rubric
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => {
              mopData && addMop && addMop(mopData);
              redirect("/");
            }}
            className="AddEditMop__btn"
          >
            Save This Questionnaire
          </button>
        </div>
      )}
    </>
  );
};
