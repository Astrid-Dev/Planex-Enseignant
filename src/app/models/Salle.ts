export interface Salle {
  id?: number,
  code: string,
  intitule: string,
  intitule_en: string,
  capacite: number,
  capacite_barr: number,
  capacite_exam: number,
  faculteId: number,
  createdAt?: string,
  updatedAt?: string,
}
