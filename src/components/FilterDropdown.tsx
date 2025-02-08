import styled from 'styled-components';

interface FilterDropdownProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  seletedOption: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  onChange,
  options,
  seletedOption,
}) => {
  return (
    <FilterContainer>
      <Select onChange={onChange} value={seletedOption}>
        <Option value="">{value}</Option>
        {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  width: 90vw;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
  margin-right: 6px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Select = styled.select`
  width: 200px;
  padding: 12px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6"%3E%3Cpath fill="none" stroke="%23333" stroke-width="2" stroke-opacity="0.5" d="M1 1l4 4 4-4"%3E%3C/path%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px 6px;

  &:hover {
    border-color: #5f0080;
  }

  &:focus {
    outline: none;
    border-color: #5f0080;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Option = styled.option`
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
    color: #5f0080;
  }

  &:checked {
    color: #5f0080;
  }
`;

export default FilterDropdown;
