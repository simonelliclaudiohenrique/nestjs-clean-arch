import { Entity } from "../entities/entity";
import { RepositoryInterface } from "./repository-contracts";

export type SearchDirection = "asc" | "desc";
export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: 15;
  sort?: string | null;
  sortDir?: SearchDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page: number;
  protected _perPage: number;
  protected _sort: string;
  protected _sortDir: string;
  protected _filter: string;

  constructor(props: SearchProps) {
    this._page = props.page;
    this._perPage = props.perPage;
    this._sort = props.sort;
    this._sortDir = props.sortDir;
    this._filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    this._page = value;
  }

  get sor() {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort = value;
  }

  get sortDir() {
    return this._sortDir;
  }

  private set sortDir(value: string | null) {
    this._sortDir = value;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter = value;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(SearchInput): Promise<SearchOutput>;
}
