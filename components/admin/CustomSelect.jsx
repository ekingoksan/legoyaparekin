import Select from 'react-select';

export default function CustomSelect({options, selectedOption, setSelectedOption, placeholder, isMulti}) {

  return (
    <div className="CustomSelect">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti = {isMulti}
        placeholder= {placeholder}
      />
    </div>
  );
}