import { Document } from 'mongoose'

export interface ITodo extends Document {
    name: string
    description: string
    status: boolean
}
// user interface
export interface IUser extends Document {
    username: string
    password: string
}