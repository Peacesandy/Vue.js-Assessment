<template>
  <div class="flex">
    <nav class="w-64 h-screen bg-cowrywise text-white flex flex-col">
      <div class="py-4 px-6">
        <img src="\cowrywise.png" alt="Cowrywise Logo" class="w-[200px] h-auto" />
        <h1 class="text-1xl font-bold pt-12">Investment Funds</h1>
      </div>
      <ul class="flex-grow">
        <li class="py-2 px-6 hover:bg-gray-700">
          <a href="#">Dashboard</a>
        </li>
        <li class="py-2 px-6 hover:bg-gray-700">
          <a href="#">Users</a>
        </li>
        <li class="py-2 px-6 hover:bg-gray-700">
          <a href="#">Settings</a>
        </li>
      </ul>
      <div class="py-4 px-6">
        <button class="w-full bg-white hover:bg-white text-cowrywise font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </nav>
    <RouterView />
  </div>
</template>
