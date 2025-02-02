import React from 'react';

interface ControlsProps {
  handleSearchClick: () => void;
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
}

class Controls extends React.Component<ControlsProps> {
  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchTerm(event.target.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Search..."
        />
        <button onClick={this.props.handleSearchClick}>Search</button>
      </div>
    );
  }
}

export default Controls;
