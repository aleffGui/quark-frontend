import { User } from "./user";

export interface Task {
    id?: String;
    title: String;
    description: String;
    priority: String;
    responsible?: User;

}