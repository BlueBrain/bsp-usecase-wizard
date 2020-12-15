
export interface CollabItems {
  files: Array<string>;
  folders: Array<string>;
}

export interface Collab {
  encrypted: Boolean;
  head_commit_id: String;
  id: String;
  modifier_contact_email: String;
  modifier_email: String;
  modifier_name: String;
  mtime: BigInteger;
  mtime_relative: String;
  name: String;
  owner: String;
  owner_contact_email: String;
  owner_name: String;
  permission: String;
  root: String;
  size: BigInteger;
  size_formatted: String;
  type: String;
  version: BigInteger;
  virtual: Boolean;
}

export interface CollabDirectory {
  id: String;
  mtime: BigInteger;
  name: String;
  permission: String;
  type: String;
}

export interface UploadFromUrl {
  fileUrl: string;
  collabId: string;
  parentFolder: string;
  placeholder?: string;
  newText?: string;
}
