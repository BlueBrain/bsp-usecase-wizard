
export interface CollabItems {
  files: Array<string>;
  folders: Array<string>;
}

export interface Collab {
  encrypted: boolean;
  head_commit_id: string;
  id: string;
  modifier_contact_email: string;
  modifier_email: string;
  modifier_name: string;
  mtime: number;
  mtime_relative: string;
  name: string;
  owner: string;
  owner_contact_email: string;
  owner_name: string;
  permission: string;
  root: string;
  size: number;
  size_formatted: string;
  type: string;
  version: number;
  virtual: boolean;
}

export interface CollabDirectory {
  id: string;
  mtime: number;
  name: string;
  permission: string;
  type: string;
}

export interface UploadFromUrl {
  fileUrl: string;
  fileName?: string;
  collabId: string;
  parentFolder: string;
  placeholder?: string;
  newText?: string;
}

export interface UploadContent {
  uploadLink: string;
  parentFolder: string;
  fileContent: Blob;
  fileName: string;
}

export interface UploadString {
  collabId: string;
  fileName: string;
  text: string;
  parentFolder: string;
}

export interface CollabSelectionDataObj {
  loading: boolean;
  collabs: Array<Collab>;
  filteredCollabsNames: Array<string>;
  collabSelectedName: string;
  searchText: string;
  parentFolder: string;
}
