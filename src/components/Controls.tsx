import React from 'react';

interface ControlsProps {
  handleSearchClick: () => void;
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
}

export default function Controls(props: ControlsProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={props.searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <button onClick={props.handleSearchClick}>Search</button>
    </div>
  );
}
