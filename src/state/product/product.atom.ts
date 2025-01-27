import { atom } from 'recoil';

export interface IFavourite {
  id: string;
  name: string;
  imgurl: string;
  slugid: number;
  category: string;
}

export interface IFavouriteAtom {
  data: IFavourite[];
  total: number;
  loading: {
    visible: boolean;
    name: string;
  };
}
export const favouritesAtom = atom<IFavouriteAtom>({
  default: { data: [], total: 0, loading: { visible: false, name: '' } },
  key: 'favourites-atom',
});
