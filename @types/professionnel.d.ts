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
  iduser: number;
  profile: HasOne<typeof User>;
  id_cat1: HasMany<typeof CategorieOne>;
  id_cat2: HasMany<typeof CategorieTwo>;
  id_cat3: HasMany<typeof CategorieThree>;
  id_priceRange: HasMany<typeof PriceRange>;
  id_abo: HasMany<typeof Abonnement>;
}
