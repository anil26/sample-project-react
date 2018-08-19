const getListitems = () => {
  return fetch("https://demo7556614.mockable.io/get-list-items")
    .then(result => {
      return result.json();
    })
    .then(response => {
      console.log(response);
      return response;
    });
};

export { getListitems };
