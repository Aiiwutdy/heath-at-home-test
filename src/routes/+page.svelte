<script>
  import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";
  import axios from "axios";

  const dispatcher = createEventDispatcher();
  export let data;
  let searchText = "";
  let currentPage = 1;
  const itemsPerPage = 10;

  function handleSearch() {
    dispatcher("search", searchText);
  }

  function filterUsers(users, searchText) {
    if (!searchText) {
      return users;
    }
    const lowerSearchText = searchText.toLowerCase();
    return users.filter(
      (user) =>
        user.fname.toLowerCase().includes(lowerSearchText) ||
        user.lname.toLowerCase().includes(lowerSearchText) ||
        user.username.toLowerCase().includes(lowerSearchText)
    );
  }

  function nextPage() {
    if (currentPage * itemsPerPage < filteredUsers.length) {
      currentPage++;
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  async function deleteUser(id) {
    try {
      var raw = JSON.stringify({
        id: id,
      });
      // await axios.delete(`https://www.melivecode.com/api/users/delete`);
      await axios({
        method: "delete",
        url: "https://www.melivecode.com/api/users/delete",
        data: {
          id: id,
        },
      });
      location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  $: filteredUsers = filterUsers(data.users, searchText);
  $: startIndex = (currentPage - 1) * itemsPerPage;
  $: endIndex = startIndex + itemsPerPage;
  $: paginatedUsers = filteredUsers.slice(startIndex, endIndex);
</script>

<div class="container mx-auto px-4">
  <div class="bg-white p-8 rounded-md w-full">
    <div class="flex items-center justify-between pb-6">
      <div>
        <h2 class="text-gray-600 font-semibold">Users</h2>
        <span class="text-xs">All users detail</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex bg-gray-50 items-center p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            bind:value={searchText}
            on:input={handleSearch}
            class="bg-gray-50 outline-none ml-1 block"
            type="text"
            placeholder="search..."
          />
        </div>
        <div class="lg:ml-5 ml-3 space-x-8">
          <button
            class="bg-indigo-600 px-4 py-2 rounded text-white font-semibold tracking-wide cursor-pointer"
            on:click={() => goto("/CreateUser")}>Create</button
          >
        </div>
      </div>
    </div>
    <div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-indigo-500 text-left text-xs font-bold text-indigo-50 uppercase tracking-wider text-center"
                >
                  ID
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-indigo-500 text-left text-xs font-bold text-indigo-50 uppercase tracking-wider"
                >
                  First Name
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-indigo-500 text-left text-xs font-bold text-indigo-50 uppercase tracking-wider"
                >
                  Last Name
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-indigo-500 text-left text-xs font-bold text-indigo-50 uppercase tracking-wider"
                >
                  User Name
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-indigo-500 text-left text-xs font-bold text-indigo-50 uppercase tracking-wider"
                >
                  Avatar
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-indigo-500 text-left text-xs font-bold text-indigo-50 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {#each paginatedUsers as user, index}
                <tr>
                  <td
                    class="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {startIndex + index + 1}
                    </p>
                  </td>
                  <td
                    class="px-3 py-3 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">{user.fname}</p>
                  </td>
                  <td
                    class="px-3 py-3 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {user.lname}
                    </p></td
                  >
                  <td
                    class="px-3 py-3 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {user.username}
                    </p>
                  </td>
                  <td
                    class="px-3 py-3 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex-shrink-0 w-10 h-10 mx-auto">
                      <img
                        class="w-full h-full rounded-full"
                        src={user.avatar}
                        alt=""
                      />
                    </div>
                  </td>
                  <td
                    class="px-3 py-3 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex gap-2 justify-center">
                      <a href={`/UpdateUser/${user.id}`}>
                        <span>
                          <svg
                            class="h-8 w-8 text-green-500"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path
                              d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"
                            />
                            <path
                              d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"
                            />
                            <line x1="16" y1="5" x2="19" y2="8" /></svg
                          >
                        </span></a
                      >
                      <button on:click={() => deleteUser(user.id)}>
                        <span>
                          <svg
                            class="h-8 w-8 text-red-500"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                            <path
                              d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                            />
                            <path
                              d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                            /></svg
                          >
                        </span></button
                      >
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
          <div
            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
          >
            <span class="text-xs xs:text-sm text-gray-900">
              Showing {startIndex + 1} to {endIndex < filteredUsers.length
                ? endIndex
                : filteredUsers.length} of {filteredUsers.length} Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded"
                on:click={prevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              &nbsp; &nbsp;
              <button
                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded"
                on:click={nextPage}
                disabled={currentPage * itemsPerPage >= filteredUsers.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @import "bootstrap/dist/css/bootstrap.min.css";
</style>
