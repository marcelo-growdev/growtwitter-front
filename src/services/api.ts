import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json'
  }
});

export const login = async (email: string, password: string) => {
  try {
    const response = await client.post('/login', {
      email,
      password
    });

    if (response.status == 200) {
      sessionStorage.setItem('token', response.data.data.token);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: 'Usuário ou senha incorretos.' };
  }
};

export async function register(formData: FormData) {
  try {
    return await client.post('/users', formData);
  } catch (error) {
    return error?.response;
  }
}

export async function doGet(url: string) {
  try {
    const response = await client.get(url);

    return response?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
