// Function to convert an ISO date to a formatted date string
export const DateConverter = (dateIso) => {
  const date = new Date(dateIso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2); // Use the last 2 digits of the year

  return day + "/" + month + "/" + year;
}

// Function to calculate the total cost of products in the cart
export const TotalCost = (data) => {
  let sum = 0;
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      sum += data[i].quantity * data[i]?.product?.price;
    }
  }

  return sum;
}

// Function to calculate the average rating for a set of ratings
export const Avgrating = (data) => {
  let sum = 0;
  if (data && data?.length > 0) {
    for (let i = 0; i < data.length; i++) {
      sum += data[i].value;
    }
    sum = sum / data?.length;
  }

  return sum;
}
