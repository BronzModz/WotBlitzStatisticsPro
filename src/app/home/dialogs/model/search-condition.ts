import { SearchType } from './search-type';
import { RealmType } from 'src/app/model/realm-type';

export interface SearchCondition {
  searchType: SearchType;
  realmType: RealmType;
}
