interface YesNoRubricProps {
  handleYesNosChange: (
    evt: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void;
  i: number;
  str: string;
}
export const YesNoRubric = ({
  handleYesNosChange,
  i,
  str,
}: YesNoRubricProps) => {
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
    </div>
  );
};
