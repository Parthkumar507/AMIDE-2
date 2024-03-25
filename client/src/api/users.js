import { BASE_URL } from "../config";

const register = async (user) => {
  try {
    const res = await fetch(BASE_URL + "api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.ok) {
      // Registration successful
      return { success: true, data };
    } else {
      // Registration failed
      return { success: false, error: data.error };
    }
    // return await res.json();
  } catch (err) {
    console.log(err);
    return { success: false, error: "An error occurred while registering" };

  }
};

const login = async (user) => {
  try {
    console.log('1111111')
    const res = await fetch(BASE_URL + "api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log('res is ',res)
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (params) => {
  try {
    const res = await fetch(BASE_URL + "api/users/" + params.id);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getGoogleUser = async (params) => {
  try {
    const res = await fetch(BASE_URL + "api/auth/google/callback");
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (user, data) => {
  try {
    const res = await fetch(BASE_URL + "api/users/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export { register, login, getUser, updateUser, getGoogleUser };
