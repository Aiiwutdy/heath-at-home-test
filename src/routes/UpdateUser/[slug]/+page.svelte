<script>
  export let data;
  import { goto } from "$app/navigation";
  import axios from "axios";

  const user = {
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
  };

  const onUpdateUser = async () => {
    try {
      const response = await axios.put(
        "https://www.melivecode.com/api/users/update",
        data.user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      goto("/");
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div class="container mx-auto px-4">
  <div class="bg-white p-8 rounded-md w-full justify-center flex">
    <div class="bg-white py-2 px-2 sm:max-w-md w-4/5">
      <div
        class="sm:text-3xl text-2xl font-semibold text-center text-sky-600 mb-12"
      >
        Edit User
      </div>
      <form on:submit={onUpdateUser}>
        <div>
          <input
            type="text"
            name="fname"
            bind:value={data.user.fname}
            class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
            placeholder="First Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="lname"
            bind:value={data.user.lname}
            class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8"
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            bind:value={data.user.username}
            class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            bind:value={data.user.password}
            class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
            placeholder="Password"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            bind:value={data.user.email}
            class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="text"
            name="avatar"
            bind:value={data.user.avatar}
            class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
            placeholder="Avatar URL"
          />
        </div>

        <div class="flex justify-center my-3">
          <button
            type="submit"
            class="rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold"
          >
            Update Account
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
