
export interface Contributors {
  name: string;
  email: string;
}

export interface UsecaseItemBase {
  title: string;
  description: string;
  experience: Array<"all" | "power" | "experts" | "code">;
  access: Array<"hpc" | "byor" > | null;
  maturity: Array<"experimental" | "beta">;
  disabled: boolean;
  implementation: "webapp" | "ipynb";
  contributors: Array<Contributors>;
  picture: {
    src: string;
  };
  dataProtected: boolean;
  tutorial: string | null; // video tutorial
}

export interface UsecaseItemNotebook extends UsecaseItemBase {
  notebookPath: string; // notebook path after pulling
  notebookRepoUrl: string; // repo url
  chooseModel?: boolean;
}

export interface UsecaseItemWebapp extends UsecaseItemBase {
  externalUrl: string; // url to the webapp
  chooseModel?: boolean;
}

export type UsecaseItem = UsecaseItemNotebook | UsecaseItemWebapp;

export interface UsecaseGroup {
  title: string;
  items: Array<UsecaseItem>;
}

export interface UsecaseFileInterface {
  title: string;
  id: string;
  usecases: Array<UsecaseItem> | [];
  groups?: Array<UsecaseGroup>;
}
