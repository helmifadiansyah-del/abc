function factorial(n) {
  if (n < 0) {
    throw new Error('Input harus bilangan bulat non-negatif');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
// Jangan hapus kode di bawah ini!
export default factorial;
