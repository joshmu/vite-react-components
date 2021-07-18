/// <reference types="vite/client" />

interface tab {
  label: React.ReactElement | string
  content: React.ReactElement | string
}

interface route {
    path: string,
    component: () => JSX.Element
}