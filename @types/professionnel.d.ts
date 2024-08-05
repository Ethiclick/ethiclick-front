interface Coordinates {
  x: number,
  y: number
}
export interface Professionnel {
  id: number;
  nom: string;
  siret: string;
  adresse: string;
  coordinates: Coordinates;
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
  idcat1: number;
  idcat2?: number;
  idcat3?: number;
  idpriceRange?: number;
  idabo?: number;
}


