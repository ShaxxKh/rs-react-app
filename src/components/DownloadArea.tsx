import { CSVLink } from 'react-csv';
import { RootState } from '@/app/store';
import {
  selectCountOfSelectedPeople,
  selectSelectedPeople,
  unselectAllPeople,
} from '../features/people/peopleSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DownloadArea() {
  const dispatch = useDispatch();
  const selectedItemsCount = useSelector((state: RootState) =>
    selectCountOfSelectedPeople(state)
  );
  const selectedItems = useSelector((state: RootState) =>
    selectSelectedPeople(state)
  );

  if (selectedItemsCount <= 0) {
    return null;
  }

  const handleUnselectAllClick = () => {
    dispatch(unselectAllPeople());
  };

  const formattedSelectedItems = () => {
    return Object.values(selectedItems).map(
      ({ data: { birth_year, hair_color, eye_color, ...rest } }) => ({
        ...rest,
        ['birth_year']: birth_year,
        ['hair_color']: hair_color,
        ['eye_color']: eye_color,
      })
    );
  };

  formattedSelectedItems();

  return (
    <div>
      <span>Items selected {selectedItemsCount}</span>
      <button onClick={handleUnselectAllClick}>Unselect All</button>
      <CSVLink
        data={formattedSelectedItems()}
        filename={'Star_Wars_Characters.csv'}
        target="_blank"
      >
        Download
      </CSVLink>
    </div>
  );
}
