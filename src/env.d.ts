/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_42_CLIENTID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}