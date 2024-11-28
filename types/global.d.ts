declare namespace NodeJS {
  interface ProcessEnv extends AppTypes.AppEnv {}
}

declare namespace AppTypes {
  interface AppEnv {
    NEXT_PUBLIC_GITHUB_KEY: string;
  }
}
