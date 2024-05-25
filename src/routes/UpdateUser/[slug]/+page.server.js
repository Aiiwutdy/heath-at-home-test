import axios from "axios";

export async function load({ params }) {
  try {
    const response = await axios.get(
      `https://www.melivecode.com/api/users/${params.slug}`
    );

    if (response.data) {
      return {
        id: params.slug,
        ...response.data,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      user: [],
    };
  }
}
