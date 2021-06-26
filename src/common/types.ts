export type UserDTO = {
  name: string,
  login: string,
  password: string
}

export type UserToResponse = {
  id: string,
  name: string,
  login: string
}

export type BoardDTO = {
  title: string,
  columns: string
}