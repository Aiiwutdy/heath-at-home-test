import axios from "axios";

export async function load() {
  try {
    const response = await axios.get("https://www.melivecode.com/api/users");

    if (response.data) {
      return { users: response.data };
    }
  } catch (err) {
    console.log(err);
    return { users: [] };
  }
}
