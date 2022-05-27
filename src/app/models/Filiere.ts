export interface Filiere {
  id?: number,
  code: string,
  intitule: string,
  intitule_en: string,
  faculteId: number,
  createdAt?: string,
  updatedAt?: string,
  typeHoraireId?: number | null
}
