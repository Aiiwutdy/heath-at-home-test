<script>
  import { goto } from "$app/navigation";
  import axios from "axios";
  import Swal from "sweetalert2";

  const user = {
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    avatar: "",
  };

  const onCreateUser = async () => {
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

      goto("/");
    } catch (error) {
      console.log(error);
    }
  };

  function showAlert() {
    Swal.fire({
      position: "top-enter",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }
</script>

<div class="container mx-auto px-4">
  <div class="bg-white p-8 rounded-md w-full justify-center flex">
    <div class="bg-white py-2 px-2 sm:max-w-md w-4/5">
      <div
        class="sm:text-3xl text-2xl font-semibold text-center text-sky-600 mb-12"
      >
        Create User
      </div>
      <!-- <form action="?/create" method="POST"> -->
      <div>
        <input
          type="text"
          name="fname"
          bind:value={user.fname}
          class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
          placeholder="First Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="lname"
          bind:value={user.lname}
          class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8"
          placeholder="Last Name"
        />
      </div>
      <div>
        <input
          type="text"
          name="username"
          bind:value={user.username}
          class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
          placeholder="Username"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          bind:value={user.password}
          class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
          placeholder="Password"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          bind:value={user.email}
          class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="text"
          name="avatar"
          bind:value={user.avatar}
          class="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
          placeholder="Avatar URL"
        />
      </div>

      <div class="flex justify-center my-3">
        <button
          type="button"
          class="rounded-full p-3 w-full sm:w-56 bg-gradient-to-r from-sky-600 to-teal-300 text-white text-lg font-semibold"
          on:click={onCreateUser}
        >
          Submit Account
        </button>
      </div>
      <!-- </form> -->
    </div>
  </div>
</div>
