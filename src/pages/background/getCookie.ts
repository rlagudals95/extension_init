export const getCookie = chrome?.cookies.getAll(
  {
    domain: "ohoolabs-solution.com",
  },
  function (cookies) {
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];

      if (cookie.name === "Authorization") {
        chrome.storage.local.set({ Authorization: cookie.value });
      }
    }
  }
);
