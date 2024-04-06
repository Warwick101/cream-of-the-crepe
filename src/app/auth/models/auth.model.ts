export interface Roles {
    viewer?: boolean;
    admin?: boolean;
  }
  
  export interface LoginData {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Roles;
  }
  
  