import { User } from "./user";

export interface Task {
    id?: String;
    title: String;
    description: String;
    priority: String;
    user?: User;
    deadline: any;

}