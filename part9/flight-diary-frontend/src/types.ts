
interface BaseEntry {
  date: string;
  weather: string;
  visibility: string;
}

export interface Entry extends BaseEntry {
  id: number;
}

export interface NewEntry extends BaseEntry {
  comment: string;
}