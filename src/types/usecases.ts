
export interface Contributors {
  name: string;
  email: string;
}

export interface UsecaseItem {
  title: string;
  description: string;
  experience: Array< "all" | "power" | "experts" | "code" >;
  access: Array< "hpc" | "byor" >;
  maturity: Array< "experimental" | "beta" >; 
  disabled: boolean;
  implementation: "webapp" | "ipynb";
  contributors: Array<Contributors>;
  picture: {
    src: string;
  };    
  dataprotected: boolean;
  tutorial?: string;
  path?: string;
  url?: string;
  model?: boolean;
}

export interface UsecaseFileInterface {
  title: string;
  id: string;
  usecases: Array<UsecaseItem>;
}
