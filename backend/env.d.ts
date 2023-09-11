declare namespace NodeJS {
  interface ProcessEnv {
    DB_NAME: string
    DB_USER: string
    DB_PASS: string
    DB_HOST: string
    SECRET: string
    PORT: string
    ORIGIN: string
  }
}
