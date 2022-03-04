interface TextRubricProps {
  handleInputText: (
    evt: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void;
  i: number;
  str: string;
}

export const TextRubric = ({ handleInputText, i, str }: TextRubricProps) => {
  return (
    <div className="containers" key={i}>
      <input
        placeholder="Please input question"
        required
        onChange={(evt) => {
          handleInputText(evt, i);
        }}
        type="text"
        value={str}
      />
    </div>
  );
};
