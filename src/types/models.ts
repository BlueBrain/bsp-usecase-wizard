
export interface Model {
  id: string;
  uri: string;
  name: string;
  alias?: null;
  author?: (AuthorEntityOrOwnerEntity)[] | null;
  owner?: (AuthorEntityOrOwnerEntity)[] | null;
  project_id: string;
  organization: string;
  private: boolean;
  cell_type: string;
  model_scope: string;
  abstraction_level?: null;
  brain_region: string;
  species: string;
  description: string;
  date_created: string;
  images?: (ImagesEntity)[] | null;
  old_uuid?: null;
  instances?: (InstancesEntity)[] | null;
}

export interface AuthorEntityOrOwnerEntity {
  given_name: string;
  family_name: string;
  orcid?: null;
}

export interface ImagesEntity {
  caption: string;
  url: string;
}

export interface InstancesEntity {
  id: string;
  uri: string;
  version: string;
  description: string;
  parameters?: string | null;
  code_format?: string | null;
  source?: string | null;
  license?: null;
  hash?: null;
  timestamp: string;
  morphology?: string | null;
  model_id: string;
  alternatives?: (null)[] | null;
  e_model_id?: string | null;
  morphology_id?: string | null;
  script_id: string;
}

export interface ModelsJsonInfo {
  id: string;
  date: string;
  name: string;
  uri: string;
}

interface ModelJsonUcArray {
  // use case index
  [index:string] : Array<ModelsJsonInfo>;
}

export interface ModelsJson {
  // category index
  [index:string] : ModelJsonUcArray;
}
