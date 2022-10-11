const stripe =
  typeof Stripe !== "undefined" ? Stripe('pk_test_JG4ljPjwbYXLxUGzresvx1Jp00HAZspst4') : null;

export default stripe;