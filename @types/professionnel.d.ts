export interface Professionnel {
  id: number;
  nom: string;
  siret: string;
  adresse: string;
  coordinates: number[];
  city: string;
  postal_code: number;
  website: string;
  acc_card: boolean;
  photos: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  // ** Clé étrangère
  iduser?: number;
  profile?: number;
  id_cat1: number;
  id_cat2?: number;
  id_cat3?: number;
  id_priceRange?: number;
  id_abo?: number;
}
