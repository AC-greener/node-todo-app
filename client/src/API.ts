import axios, { AxiosResponse } from "axios";

//set axios with credentials
axios.defaults.withCredentials = true;
// const baseUrl: string = "http://192.168.0.4:4000";
const baseUrl: string = "http://localhost:4000";
type loginType = {
  username: string;
  password: string;
};

export const uploadFile = async (
  file: {
    name: string;
    file: File;
  }
):Promise<AxiosResponse<any>> => {
  const res = await axios
    .post(baseUrl + "/upload", file)
    .then((response) => {
      console.log("File uploaded successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
    return res
};
export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/todos"
    );
    return todos;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const login = async (
  data: loginType
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const res: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/login",
      data
    );

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getRoot = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(baseUrl + "/");

    return todos;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/add-todo",
      todo
    );
    return saveTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "status"> = {
      status: true,
    };
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`
    );
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
};
