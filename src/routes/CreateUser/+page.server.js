// import
import axios from "axios";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const user = {
      fname: data.get("fname"),
      lname: data.get("lname"),
      username: data.get("username"),
      password: data.get("password"),
      email: data.get("email"),
      avatar: data.get("avatar"),
    };

    try {
      const response = await axios.post(
        "https://www.melivecode.com/api/users/create",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return { success: true, user: response.data };
    } catch (error) {
      console.log(error);
      return fail(500, { success: false, error: "Error creating user" });
    }
  },
};
