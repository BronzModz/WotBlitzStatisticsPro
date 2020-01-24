import { SearchType } from './search-type';
import { RealmType } from 'src/app/model/realm-type';

export interface SearchDialogResult {
  searchType: SearchType;
  selectedId: number;
}
