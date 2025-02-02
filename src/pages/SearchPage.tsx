import React from 'react';
import Results from '../components/Results';
import { fetchPeople, Person } from '../api/users.api';
import Controls from '../components/Controls';
import CustomError from '../common/errors/CustomError';
import Spinner from '../components/Spinner/Spinner';

type AppState = {
  searchTerm: string;
  results: Person[];
  error: Error | null;
  loading: boolean;
};

class SearchPage extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      results: [],
      error: null,
      loading: false,
    };

    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.getPeopleAndUpdateResults = this.getPeopleAndUpdateResults.bind(this);
    this.handleErrorButtonClick = this.handleErrorButtonClick.bind(this);
  }

  async getPeopleAndUpdateResults(name?: string): Promise<void> {
    try {
      this.setState({ loading: true });
      const { results } = await fetchPeople(name);
      this.setState({ results, error: null, loading: false });
    } catch (error) {
      this.setState({ error: error as Error });
      throw error;
    }
  }

  async handleSearchClick(): Promise<void> {
    await this.getPeopleAndUpdateResults(this.state.searchTerm);
  }

  handleErrorButtonClick() {
    this.setState({ error: new CustomError('Error Button Clicked') });
  }

  setSearchTerm(searchTerm: string) {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
  }

  async componentDidMount(): Promise<void> {
    await this.getPeopleAndUpdateResults(this.state.searchTerm);
  }

  render() {
    return (
      <div className="search_page">
        <Controls
          searchTerm={this.state.searchTerm}
          handleSearchClick={this.handleSearchClick}
          setSearchTerm={this.setSearchTerm}
        />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Results results={this.state.results} error={this.state.error} />
        )}
        <button onClick={this.handleErrorButtonClick}>Error Button</button>
      </div>
    );
  }
}

export default SearchPage;
